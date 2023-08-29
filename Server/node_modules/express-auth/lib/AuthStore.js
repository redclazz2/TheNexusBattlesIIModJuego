/**
 * Created by suparngupta on 1/11/14.
 */

var mongo = require('mongodb');

function AuthStore(options, callback){
    var self = this;

    var MongoClient = mongo.MongoClient;
    var ObjectID = mongo.ObjectID;

    MongoClient.connect('mongodb://' + options.host + ':' +
        options.port + '/' + options.db + '?w=' + options.w,
        function (err, db) {
            if (err) {
                console.error('Unable to connect to session store');
                console.log(err);
                throw new Error('Unable to connect to session store');
            }
            console.log('Connected to session DB');
            self.db = db;
            db.authenticate(options.username, options.password, function (err, data) {
                if(err || !data){
                    console.log('session db authentication failed');
                    throw new Error('session db authentication failed')
                }
                self.collection = self.db.collection(options.collection);
                self.collection.ensureIndex({'createdAt': 1}, {expireAfterSeconds: options.expiration},
                    function(err, data){
                        if(err){
                            console.log('session db indexing failed');
                            throw new Error('session db indexing failed')
                        }
                        if(callback) callback();
                    });

            });

        });

    self.getCollection = function () {
        return self.collection;
    };

    self.get = function (sid, callback) {
        self.collection.findOne({_id: ObjectID(sid)}, callback);
    };

    self.set = function (session, callback) {
        self.collection.save(session, {safe: true}, function(err, data){
            if(callback) callback(err, data);
        });
    };

    self.destroy = function(sid, callback){
        self.collection.findAndRemove({_id: ObjectID(sid)}, function(err, data){
            if(callback) callback(err, data);
        });
    };

    self.drop = function(callback){
        if(callback) self.collection.drop();
        else self.collection.drop();
    };

    self.count = function(callback){
        if (callback) self.collection.count(callback);
        else self.collection.count();
    };

    self.clear = function(callback){
        if(callback) self.collection.remove({}, callback);
        else self.collection.remove({});
    };

    self.getId = function(){
        return ObjectID();
    }
}

module.exports = AuthStore;