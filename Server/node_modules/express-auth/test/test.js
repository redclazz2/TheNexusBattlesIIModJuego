/**
 * Created by suparngupta on 1/11/14.
 */

var expect = require('expect.js'),
    expressAuth = require('./../express-auth'),
    _ = require('underscore');

var config = {
    secret: 'someone',
    header: 'custom-header',
    exclude: ['/login'],
    error: new Error('Custom error object'),
    store: {
        db: 'quix',
        host: 'localhost',
        port: '27017',
        username: 'quix',
        password: 'quix@123',
        collection: 'session',
        w: 1,
        expiration: 7200
    }
};
describe('Tests for express auth', function () {
    describe('create session', function () {


        it('should not check for session- login path', function (done) {
            var req = {
                get: function (header) {
                    return '';
                },
                path: '/login'
            };
            var res = {
                header: '',
                set: function (header, value) {
                    expect(header).to.be(config.header);
                    expect(!value).to.be(false);
                    res.header = value;
                }
            };
            var middleware = expressAuth.setup(config, function (err) {
                expect(!err).to.be.ok();
                middleware(req, res, function (err) {
                    expect(!err).to.be.ok();
                    req.authorize.createSession('1234', function (err, session) {
                        expect(!err).to.be.ok();
                        expect(!session).not.to.be.ok();
                        expect(!session._id).not.to.be.ok();
                        expect(session.id).to.be(session._id);
                        expect(_.isEqual(req.authorize.session, session)).to.be.ok();
                        expect(res.header).to.be(session.id + ':' + session.token + ':' + session.signature);
                        done();
                    })

                });

            });


        });
        it('should check for session', function (done) {
            var req = {
                get: function (header) {
                    return '';
                },
                path: '/login'
            };
            var res = {
                header: '',
                set: function (header, value) {
                    expect(header).to.be(config.header);
                    expect(!value).to.be(false);
                    res.header = value;
                    req.get = function(header){
                        return value;
                    }
                }
            };
            var middleware = expressAuth.setup(config, function (err) {
                expect(!err).to.be.ok();
                middleware(req, res, function (err) {
                    expect(!err).to.be.ok();
                    req.authorize.createSession('1234', function (err, session) {
                        req.path = '';
                        middleware(req, res, function(err){
                            expect(!err).to.be.ok();
                            done();
                        });
                    })

                });

            });


        });

        it('should check for session timeouts- 3secs', function (done) {
            done();
            return;
            this.timeout(80000);
            var req = {
                get: function (header) {
                    return '';
                },
                path: '/login'
            };
            var res = {
                header: '',
                set: function (header, value) {
                    expect(header).to.be(config.header);
                    expect(!value).to.be(false);
                    res.header = value;
                    req.get = function(header){
                        return value;
                    }
                }
            };
            config.store.expiration = 3;
            var middleware = expressAuth.setup(config, function (err) {
                expect(!err).to.be.ok();
                middleware(req, res, function (err) {
                    expect(!err).to.be.ok();
                    req.authorize.createSession('1234', function (err, session) {
                        req.path = '';
                        middleware(req, res, function(err){
                            expect(!err).to.be.ok();
                            setTimeout(function(){

                                middleware(req, res, function(err){
                                    config.store.expiration = 7200;
                                    expect(!err).to.be(false);
                                    done();
                                });
                            }, 60000);

                        });
                    })

                });

            });


        });

        it('should destroy a session', function (done) {
            var req = {
                get: function (header) {
                    return '';
                },
                path: '/login'
            };
            var res = {
                header: '',
                set: function (header, value) {
                    expect(header).to.be(config.header);
                    res.header = value;
                    req.get = function(header){
                        return value;
                    }
                }
            };

            var middleware = expressAuth.setup(config, function (err) {
                expect(!err).to.be.ok();
                middleware(req, res, function (err) {
                    expect(!err).to.be.ok();
                    req.authorize.createSession('1234', function (err, session) {
                        req.path = '';
                        middleware(req, res, function(err){
                            expect(!err).to.be.ok();
                            req.authorize.destroySession(function(err, session){
                                console.log(err);
                                expect(!err).to.be.ok();
                                done();
                            });
                        });
                    })
                });
            });
        });
    });
});