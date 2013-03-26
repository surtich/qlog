var commons = require('../lib/commons.js')
,   async   = commons.async
,   mongodb = commons.mongodb
,   express = commons.express
,   hero 	= commons.hero
;

var qlog = {};

module.exports = hero.worker(
	function (self){

		var dbLog 	  = self.db('log', self.config.db.log);
		var dbSession = self.db('session', self.config.db.log);
		var mq 		  = self.mq('log', self.config.mq.log);

		function _checkAdminUser(next){
			var defUsr = hero.getProcParam('defusr');
			var defPwd = hero.getProcParam('defpwd');

			if ( defUsr && defPwd ) {
				self.user.createAdmin( defUsr, defPwd, next );
			}
			else {
				self.user.checkAdminUser( next );
			}
		}

		function _user (p_collection){
			var _userCol = p_collection;

			function _createAdmin(p_user, p_pwd, f_callback){
				_createUser(p_user, p_pwd, true, f_callback);
			}

			function _createUser(p_user, p_pwd, p_admin, f_callback){
				_userCol.insert(
					{ usr   : p_user
					, pwd   : p_pwd
					, admin : p_admin
					, created : new Date()
					}
				,	
					f_callback
				);
			}

			function _checkAdminUser(f_callback) {
				_userCol.findOne (
					{ admin : true }
				,
					f_callback
				);
			}

			function _getByUsrAndPwd(p_usr, p_pwd, f_callback) {
				_userCol.findOne(
					{ usr : p_usr, pwd : p_pwd }
				,
					f_callback
				);
			}

			function _getUsers(p_from, p_limit, f_callback) {
				var from  = p_from || 0;
				var limit = p_limit || 25;
				_userCol
					.find(
						{}
					)
					.skip(from)
					.limit(limit)
					.toArray(f_callback)
				;
			}

			this.createAdmin 	 = _createAdmin;
			this.createUser 	 = function (p_usr, p_pwd, f_callback) { _createUser(p_usr, p_pwd, false, f_callback) };
			this.checkAdminUser  = _checkAdminUser;
			this.getByUsrAndPwd  = _getByUsrAndPwd;
			this.getUsers 		 = _getUsers;
			this.remove = function (f_callback){ _userCol.remove(f_callback) };
		}


		function _log(p_collection){
			var _logCol = p_collection;

			function _save(p_appId, p_msg, p_time, p_tags, f_callback){
				_logCol.insert(
					{
					  appId : p_appId 
					, msg 	: p_msg 
					, time 	: p_time
					, tags 	: p_tags
					, created: new Date()
					}
				, 
					f_callback
				)
			}

			function _get(p_appId, p_date, p_tags, p_from, p_limit, f_callback){
				var dateFilter = p_date | new Date();
				var from = p_from | 0;
				var limit = p_limit | 25;
				_logCol
					.find(
						{ appId : p_appId 
						, created : {"$gte": dateFilter }
						, tags : $in( p_tags.split(',')  )
						}
					,
						f_callback
					)
					.sort( { 'created' : 'asc' })
					.skip(from)
					.limit(limit)
				;
			}

			this.save= _save;
			this.get = _get;
			this.remove = function (f_callback){ _logCol.remove(f_callback) };

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
				]
				, f_callback
			);
		}

		self.user = null;
		self.log = null;

		self.ready = function (next){
			hero.app.configure (
				function() {
					hero.app.use( express.bodyParser() );
					hero.app.use( hero.app.router );
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
				require("./paths.js").paths
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
					 	 					self.user = new _user( new mongodb.Collection(client, 'user') );
											self.log = new _log( new mongodb.Collection(client, 'log') );
								 	 		done(null);
					 	 				}
								 	 }
								);
							}
						,
							function (done){
								_checkAdminUser(
									function (err, data){
										if ( !data ) {
											hero.error('On the first time you have the following parameters "qlog/main -defusr=admin -defpwd=[YOUR_PASSWORD]"');
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




