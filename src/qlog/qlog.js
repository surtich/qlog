var commons = require('../../lib/commons.js')
,   async   = commons.async
,   mongodb = commons.mongodb
,   hero 	= commons.hero
,	uuid	= commons.uuid
;

module.exports = hero.worker(
	function (self){

		var _REDIS_PREFIX 		= 'QLOG:'
		,	_LABEL_COOKIE_ADMIN = 'QLAID'
		,	_LABEL_COOKIE_USER  = 'QLUID'
		;

		var _dbSessions = self.db( 'session', self.config.db.session );

		function _getCookies(p_cookies){
			var regex  	= /(([^= ]*)=([^;]*))/g
			,	matches = []
			,	cookies = {}
			;
			if ( p_cookies ) {
				matches = regex.exec( p_cookies );
				while (matches) {
					cookies[matches[2]] = matches[3];
					matches = regex.exec( p_cookies );
				}
			}
		  	return cookies;
		}

		function _getUserSession(p_cookie, f_callback){
			_dbSessions.get( p_cookie, f_callback);
		}

		function _getUserByEmailAndPwd(p_email, p_pwd, f_callback){
			_userCollection.findOne( 
				{ email : p_email, pwd : p_pwd }
			, 
				function (err, p_json){
					f_callback( err, p_json );		
				}
			);
		}

		function _checkUserCookie(p_req, f_callback){
			_getUserSession( _REDIS_PREFIX+_LABEL_COOKIE_USER+':'+_getCookies(p_req.headers.cookie), f_callback );
		}
		
		function _checkAdminCookie(p_req, f_callback){
			_getUserSession( _REDIS_PREFIX+_LABEL_COOKIE_ADMIN+':'+_getCookies(p_req.headers.cookie), f_callback );
		}

		function _removeCookies(p_req, f_callback){
			async.parallel (
				[
					function (f_next){
						_dbSessions.del( _LABEL_COOKIE_USER+':'+_getCookies(p_req.headers.cookie), f_next);	
					}
				,
					function (f_next){
						_dbSessions.del( _LABEL_COOKIE_ADMIN+':'+_getCookies(p_req.headers.cookie), f_next);	
					}
				]
				,
				function (err){
					f_callback(err);
				}
			);
		}

		function _createUserSession(p_uid, p_admin, f_callback){
			var cookieAdmin = ''
			,	cookieUser  = ''
			;
			async.parallel(
				[
					function (f_next){
						if (p_admin) {
							cookieAdmin = _LABEL_COOKIE_ADMIN+'='+uuid.v4();
							_dbSessions.set( cookieAdmin, p_uid, f_next);
						}
						else {
							f_next();
						}
					}
				,
					function (f_next) {
						cookieUser = _LABEL_COOKIE_USER+'='+uuid.v4();
						_dbSessions.set(cookieUser , p_uid, f_next);
					}
				]
			, 
				function (err){
					f_callback( 
						err
						, 
						{ 'Set-Cookie' : cookieUser 
						, 'Set-Cookie' : cookieAdmin
						}
					);

				}
			);
		}

		function _singin(p_req, p_res, f_callback){
			var email = _getParameter(p_req, 'e')
			,	pwd   = _getParameter(p_req, 'p')
			;
			_getUserByEmailAndPwd(
				email, pwd
				, function (err, data){
					if ( data.uid ) {
						_createUserSession( data.uid, data.admin, f_callback );
					}
				}
			);
		}

		function _singout(p_req, p_res, f_callback){
			_removeCookies(p_req, p_res, f_callback)
		}

	}
);




