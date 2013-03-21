var commons = require('../../lib/commons.js')
,   async   = commons.async
,   mongodb = commons.mongodb
,   hero 	= commons.hero
;

module.exports = hero.worker (
	function (self){

		var dbSession = self.db('session', self.config.db.session);
		var dbLog	  = self.db('log', self.config.db.log);
		var mqLog 	  = self.mq('log', self.config.mq.log);

		var logCollection;

		function save(p_user, p_desc, p_sender, f_callback) {
			traceCollection.insert( 
				{ user : p_user
				, desc : p_desc
				, sender : p_sender
				, created : new Date()
				}
			, 
				f_callback 
			);
		}

		function getByUser(p_user, f_callback) {
			traceCollection.findOne( {user : p_user}, f_callback );
		}

		function findBySender(p_sender, f_callback) {
			traceCollection.find(
				{ sender : p_sender }
			, 	{ limit : 50 }
			).toArray(
				f_callback
			);
		}

		function startsDatabase(next){
			async.serie (
				[
					function (){

					}
				,
					function (){
						dbLog.setup(
							function (err, p_client){
								logCollection = new mongodb.Collection(p_client, 'trace');
								callback(null);
							}
						);
					}
				]
				,
				next;
			);
		}

		self.ready = function (next){
			async.series (
				[
					function ( callback ){
						startsDatabase(callback);
					}
				,
					function ( callback ){
						mqLog.on (
							function (json) {
								save(json.user, json.desc, json.sender, function (){ } );
							}
						);
						callback();
					}
				]
				, next
			);
		}

		self.on  	  	  = mqMonitor.on;
		self.resetDB  	  = dbMonitor.reset;
		self.save 		  = save;
		self.getByUser 	  = getByUser;
		self.findBySender = findBySender;

	}
);
