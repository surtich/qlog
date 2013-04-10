var commons = require('../lib/commons.js')
,   hero = commons.hero
,   mongodb  = commons.mongodb
,   async = commons.async
,   log = require('./log_manager.js')
;

module.exports = hero.worker (function(self) {

    self.qlog_q = self.mq('log', self.config.mq.log);
    self.dbLog  = self.db('log', self.config.db.log);
    self.logMan = null;

    self.ready = function(callback){
        async.series (
            [
                function (done) {
                    self.dbLog.setup(
                        function(err, client){
                            console.log('Consumer Setup', !!err, !!client )
                            if(err) {
                                hero.error( err );
                                done(err);
                            }
                            if ( client ) {
                                console.log('Got Mongo Client')
                                self.logMan = new log(new mongodb.Collection(client, 'log'));
                                done();
                            }
                        }
                    );
                }
            ,
                function (done) {
                    console.log('Subscribing to queue')
                    self.qlog_q.on(function(message, header, deliveryInfo){
                        self.logMan.create(deliveryInfo.exchange, message.msg, message.date || (new Date()).getTime(), message.tags || '');
                    });
                    done();
                }
            ]
        ,
            callback
        );
    };
});