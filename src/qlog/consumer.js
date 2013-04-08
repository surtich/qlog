var commons = require('../lib/commons.hs')
,   hero = commons.hero
,   mongodb  = commons.mongodb
,   log = require('./log_manager.js')
;

module.exports = hero.worker (function(self) {

    var qlog_q = self.mq(self.config.mq.log);
    var logMan = new log(new mongodb.Collection(client, 'log'));

    self.ready = function(callback){
        qlog_q.on(function(message, header, deliveryInfo){
            logMan.create(deliveryInfo.exchange, message.msg, message.date || (new Date()).getTime(), message.tags || '');
        });
        callback();
    };
});