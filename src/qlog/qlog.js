var commons  = require('../lib/commons.js')
,   async    = commons.async
,   pastry   = commons.pastry
,   mongodb  = commons.mongodb
,   express  = commons.express
,   hero 	 = commons.hero
, 	ObjectID = commons.ObjectID
,   crypto   = commons.crypto
,	_rabbit  = require('./rabbit_manager.js')
,	_user  	 = require('./user_manager.js')
,	_log  	 = require('./log_manager.js')
,	_app  	 = require('./app_manager.js')
,	_consumer = require('./consumer.js')
,	path = require('path')
;

module.exports = hero.worker(
	function (self){

		var dbLog 	  = self.db('log', self.config.db.log);
		var dbSession = self.db('session', self.config.db.log);
		var mq 		  = self.mq('log', self.config.mq.log);

		function _checkAdminUser(next){
			var adminEmail 	= hero.getProcParam('admin_email');
			var adminPwd 	= hero.getProcParam('admin_pwd');

			if ( adminEmail && adminPwd ) {
				self.user.createAdmin( adminEmail, adminPwd, next );
			}
			else {
				self.user.checkAdminUser( next );
			}
		}

		self.resetLogDatabase = function (f_callback){
			async.parallel(
				[
					function (done){
						self.user.remove( done );
					}
				,
					function (done){
						self.log.remove( done );
					}
				,
					function (done){
						self.app.remove( done );
					}
				]
				, f_callback
			);
		}

		self.user = null;
		self.log = null;
		self.app = null;
		self.rabbitMan = null;

		self.ready = function (next){
			hero.app.configure (
				function() {
					hero.app.use( express.bodyParser() );
					hero.app.use( pastry.parseCookies() );
					hero.app.use( hero.app.router );
					hero.app.use( express.static(__dirname + '/statics') );
					hero.app.use(
						express.errorHandler(
							{	dumpExceptions 	: true
							,	showStack 		: true
							}
						)
					);
				}
			);

			hero.init(
				require('../iodocs/public/data/apiconfig.json')
			,
				path.join(__dirname , "/../..")
			,
				function (){
					async.series(
						[
							function (done){
								dbLog.setup(
					 	 			function(err, client){
					 	 				if(err) {
					 	 					hero.error( err );
					 	 				}
					 	 				if ( client ) {
					 	 					self.user 		= new _user( new mongodb.Collection(client, 'user') );
											self.log 		= new _log( new mongodb.Collection(client, 'log') );
											self.app 		= new _app( new mongodb.Collection(client, 'app') );
											self.rabbitMan 	= new _rabbit(hero.config().rabbitAdmin);
											self.rabbitMan.createQueue(
												'/'
											, 	hero.config().mq.log.queue
											, 	{
													"auto_delete":false
												,	"durable":true
												,	"arguments":[]
												}
											, function(error, request, data) {
								 	 			if( !error ) {
								 	 				done(null);
								 	 			}
								 	 			else {
								 	 				done(error);
								 	 			}
											});
					 	 				}
								 	 }
								);
							}
						,
							function (done) {
								_consumer.ready(function(err){
									if(!err){
										console.log('Qlog Drainer Process ready');
										done();
									} else {
										hero.error("Qlog Drainer Process could not be launched.")
										process.exit(1);
									}
								});
							}
						,
							function (done){
								_checkAdminUser(
									function (err, data){
										if ( !data ) {
											hero.error('On the first time you have the following parameters "node qlog/main --admin_email=admin@domain.com --admin_pwd=[YOUR_ADMIN_PASSWORD]"');
											process.exit(1);
										}
										else {
											done();
										}
									}
								);
							}
						]
						, next
					);
				}
			);

		}

	}
);




