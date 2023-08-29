/**
 * Created by suparngupta on 1/11/14.
 */

/**
 * This module creates a store for the express application
 * to manage the sessions using headers instead of cookies.
 * This is helpful in cases where the client is not a web browser
 * or OAuth like functionality is required.
 * To every request, a header is attached whose name can be configured.
 * The client is required to add this header to the request.
 * Upon receiving the req, the header is checked for the value.
 * If the given header value is not present in the database, next(err) is called.
 * Other wise if everything is ok, next() is called.
 * A custom err object can also be defined. By default the application uses the
 * Error Object with message "Unauthorized".
 * To Delete a session, a function req.authorize.destroy() can be called.
 * The current session information is stored in the object req.authorize object.
 */

var Authorize = require('./lib/Authorize'),
    AuthStore = require('./lib/AuthStore');

var defaultConfig = {
    secret: '',
    header: 'authorization',
    exclude: [],
    error: new Error('Unauthorized'),
    userIdField: 'userId',
    userIdRequired: true,
    store: {
        db: 'test',
        host: 'localhost',
        port: '27017',
        username: '',
        password: '',
        collection: 'session',
        w: 1,
        expiration: 7200
    }
};

exports.setup = function (options, callback) {
    var storeOptions = options.store;
    if(storeOptions){
        for(var y in storeOptions){
            if(storeOptions.hasOwnProperty(y)){
                defaultConfig.store[y] = storeOptions[y];
            }
        }
    }
    options.store = defaultConfig.store;
    for(var x in defaultConfig){
        if(defaultConfig.hasOwnProperty(x) && !options[x]){
            options[x] = defaultConfig[x];
        }
    }

    var authStore = new AuthStore(options.store, callback);

    function middleware(req, res, next) {

        req.authorize = new Authorize(req, res, {
            header: options.header,
            secret: options.secret,
            store: authStore,
            userIdField: options.userIdField,
            userIdRequired: options.userIdRequired
        });

        if (options.exclude.indexOf(req.path) !== -1) {
            next();
            return;
        }

        req.authorize.get(function(err, session){
            if(err || !session) next(options.error);
            else next();
        });
    }
    return middleware;
};