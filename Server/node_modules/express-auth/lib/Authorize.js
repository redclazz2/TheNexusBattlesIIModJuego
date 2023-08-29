/**
 * Created by suparngupta on 1/11/14.
 */


var crypto = require('crypto'),
    Session = require('./Session');

function Authorize(req, res, options){
    Object.defineProperty(this, 'req', {value: req});
    Object.defineProperty(this, 'res', {value: res});
    Object.defineProperty(this, 'store', {value: options.store});
    Object.defineProperty(this, 'header', {value: options.header});
    Object.defineProperty(this, 'secret', {value: options.secret});
    Object.defineProperty(this, 'userIdField', {value: options.userIdField});
    Object.defineProperty(this, 'userIdRequired', {value: options.userIdRequired});
}

Authorize.prototype.createSession = function(){
    var userId;
    var callback;
    if(arguments.length === 2){
        userId = arguments[0];
        callback = arguments[1];
    }
    else{
        callback = arguments[0];
    }
    if(!userId && this.userIdRequired){
        callback(new ReferenceError('User Id required'));
        return;
    }
    var sha256 = crypto.createHash('sha256');
    var sessionId = this.store.getId();
    sha256.update(!this.userIdRequired ? sessionId + new Date().toString() : userId + sessionId + new Date().toString());
    var token = sha256.digest('hex');
    var sha1 = crypto.createHash('sha1');
    sha1.update(this.secret + sessionId + token);
    var signature = sha1.digest('hex');
    var session = new Session({
        _id: sessionId,
        token: token,
        signature: signature,
        createdAt: new Date()
    });
    if(this.userIdRequired){
        session[this.userIdField] = userId;
    }
    var self = this;
    this.store.set(session, function(err){
        if(!callback && err){
            throw new TypeError('Unable to create session');
        }

        self.session = session;
        if(self.userIdRequired){
            self.session.value = session.id + ':' + session[self.userIdField] + ':' + session.token + ':' + session.signature;
        }
        else{
            self.session.value = session.id + ':' + session.token + ':' + session.signature;
        }
        self.res.set(self.header, self.session.value);
        if(callback) callback(err, session);
    });
};

Authorize.prototype.destroySession = function(callback){
    var self = this;
    if(!self.session || !self.session.id){
        if(callback) callback(new ReferenceError('No session found'));
        else throw new ReferenceError('No session found');
    }
    else{
        self.store.destroy(self.session.id, function(err, deleted){
            self.res.set(self.header, '');
            if(!callback && err){
                throw new TypeError('Unable to destroy session');
            }
            if(callback) callback(err, deleted);
        });
    }
};

Authorize.prototype.get = function(callback){
    var self = this;
    var value = self.req.get(self.header);
    if(!value){
        if(!callback) throw new TypeError('Authorization header has unknown syntax');
        else callback(new TypeError('Authorization header has unknown syntax'));
        return;
    }
    var tokens = value.split(':');
    var sessionId = tokens[0];
    if ((self.userIdRequired && tokens.length !== 4) || (!self.userIdRequired && tokens.length !== 3)) {
        if(!callback) throw new TypeError('Authorization header has unknown syntax');
        else callback(new TypeError('Authorization header has unknown syntax'));
        return;
    }

    self.store.get(sessionId, function(err, result){
        if(err){
            console.log(err);
            throw new Error('Error in Session DB');

        }
        else if(!result){
            if(!callback) throw new ReferenceError('No authorization token found');
            else callback(new ReferenceError('No authorization token found'));
            return;
        }

        else if(value !== result._id + ':' +
            (self.userIdRequired ? result[self.userIdField] + ':' : '') +
            result.token + ':' + result.signature){
            if(!callback) throw new ReferenceError('Token Tampered');
            else callback(new ReferenceError('Token Tampered'));
            return;
        }
        self.session = new Session(result);
        if(self.userIdRequired){
            self.session.value = result.id + ':' + result[self.userIdField] + ':' + result.token + ':' + result.signature;
        }
        else{
            self.session.value = result.id + ':' + result.token + ':' + result.signature;
        }
        self.res.set(self.header, self.session.value);
        if(callback) callback(err, self.session);
    });
};
module.exports = Authorize;