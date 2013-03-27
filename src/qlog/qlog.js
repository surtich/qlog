var commons  = require('../lib/commons.js')
,   async    = commons.async
,   mongodb  = commons.mongodb
,   express  = commons.express
,   hero 	 = commons.hero
, 	ObjectID = commons.ObjectID
,   crypto   = commons.crypto
;

var qlog = {};

module.exports = hero.worker(
	function (self){

		var dbLog 	  = self.db('log', self.config.db.log);
		var dbSession = self.db('session', self.config.db.log);
		var mq 		  = self.mq('log', self.config.mq.log);

		var _CLIENT_ID_LENGTH 	= 16
		,	_SCECRET_KEY_LENGTH = 32
		;

		function _createToken(len){
			var tkn = crypto
				.randomBytes(Math.ceil(len * 3 / 4))
			    .toString('base64')
			    .slice(0, len)
			    .replace(/\//g, '-')
			    .replace(/\+/g, '_')
			;
			return tkn;
		}


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

		function _user (p_collection){
			var _userCol = p_collection;

			function _createAdmin(p_email, p_pwd, f_callback){
				_userCol.remove( { admin : true } );

				_userCol.insert(
					{
					 	uid 	: new ObjectID()
					,	email   : p_email
					, 	pwd   	: p_pwd
					,	admin 	: true
					, 	created : (new Date()).getTime()
					}
				,	
					f_callback
				);

			}

			function _createUser(p_email, p_pwd, f_callback){
				_userCol.insert(
					{
					 	uid 	: new ObjectID()
					,	email   : p_email
					, 	pwd   	: p_pwd
					, 	created : (new Date()).getTime()
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

			function _getByEmailAndPwd(p_email, p_pwd, f_callback) {
				_userCol.findOne(
					{ email : p_email, pwd : p_pwd }
				,
					f_callback
				);
			}

			function _getUsers(p_filter, f_callback) {
				p_filter = p_filter || {};
				var from  = p_filter.from || 0;
				var limit = p_filter.limit || 25;
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
			this.signup 	 	 = _createUser;
			this.checkAdminUser  = _checkAdminUser;
			this.getByEmailAndPwd= _getByEmailAndPwd;
			this.getUsers 		 = _getUsers;
			this.remove = function (f_callback){ _userCol.remove(f_callback) };
		}


		function _log(p_collection){
			var _logCol = p_collection;

			function _create(p_appId, p_msg, p_time, p_tags, f_callback){
				_logCol.insert(
					{
					  logId 	: new ObjectID()
					, appId 	: p_appId
					, msg 		: p_msg 
					, time 		: p_time
					, tags 		: p_tags
					, created 	: (new Date()).getTime()
					}
				, 
					f_callback
				)
			}

			function _get(p_appId, p_filter, f_callback){;
				p_filter = p_filter || {};
				var filter = { 
					appId : new ObjectID(String(p_appId))
				}
				
				var from 	= p_filter.from || 0;
				var limit 	= p_filter.limit || 25;

				if ( p_filter.date ) {
				 	filter.created = { $lte : p_filter.date };
				}

				if ( p_filter.tags ) {
					filter.tags = { $in : p_filter.tags };
				}

				_logCol
					.find(
						filter
					)
					.sort( { 'created' : 'asc' })
					.skip(from)
					.limit(limit)
					.toArray(f_callback)
				;
			}

			this.create 	= _create;
			this.getByApp 	= _get;
			this.remove 	= function (f_callback){ _logCol.remove(f_callback) };

		}

		function _app(p_collection){
			var _appCol = p_collection;

			function _create(p_uid, p_name, p_callback, f_callback){
				_appCol.insert(
					{
					 	appId 		: new ObjectID()
					,	uid			: p_uid
					, 	name  		: p_name
					, 	clientId	: _createToken( _CLIENT_ID_LENGTH )
					, 	secretKey	: _createToken( _SCECRET_KEY_LENGTH )
					, 	callback 	: p_callback
					,	created		: (new Date()).getTime()
					}
				,
					f_callback
				);
			}

			function _update(p_appId, p_name, p_callback, f_callback){				
				var updateData = { };
				if ( p_name ) {
					updateData.name = p_name;
				}
				if ( p_callback ){
					updateData.callback = p_callback;	
				}

				_appCol.update(
					{ appId : new ObjectID(String(p_appId)) }
				,
					{
						$set : updateData
					}
				,
					f_callback
				);
			}

			function _refreshSecretKey(p_appId, f_callback){
				_appCol.update(
					{ appId : new ObjectID(String(p_appId)) }
				,
					{	
						$set : {
					 		secretKey	: _createToken( _SCECRET_KEY_LENGTH )
					 	}
					}
				,
					f_callback
				);
			}

			function _getAppsByUser(p_uid, f_callback){
				_appCol
					.find(
						{ uid : new ObjectID(String(p_uid))
						}
					)
					.sort( { 'created' : 'asc' })
					.toArray( f_callback )
				;
			}

			function _get(p_date, p_filter, f_callback){
				p_filter = p_filter || {};
				var filter = {};

				var from  = p_filter.from || 0;
				var limit = p_filter.limit || 25;

				if(p_filter.date) {
					filter.created = { $lte : p_filter.date }
				}

				_appCol
					.find(
						filter
					,
						f_callback
					)
					.sort( { 'created' : 'asc' })
					.skip(from)
					.limit(limit)
				;
			}

			this.create = _create;
			this.update = _update;
			this.refreshSecretKey = _refreshSecretKey;
			this.getByUser 	= _getAppsByUser;
			this.get 		= _get;
			this.remove = function (f_callback){ _appCol.remove(f_callback) };
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
					 	 					self.user 	= new _user( new mongodb.Collection(client, 'user') );
											self.log 	= new _log( new mongodb.Collection(client, 'log') );
											self.app 	= new _app( new mongodb.Collection(client, 'app') );
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
											hero.error('On the first time you have the following parameters "qlog/main --admin_email=admin@domain.com --admin_pwd=[YOUR_ADMIN_PASSWORD]"');
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




