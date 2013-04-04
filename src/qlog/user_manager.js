var commons  = require('../lib/commons.js')
, 	ObjectID = commons.ObjectID
;

function _user (p_collection){
			var _userCol = p_collection;

			function _createAdmin(p_email, p_pwd, f_callback){
				_userCol.remove( { admin : true } );

				_userCol.insert(
					{
					 	email   : p_email
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
					 	email   : p_email
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
					{ pwd:0 }
				,
					f_callback
				);
			}

			function _getUserById(p_id, f_callback) {
				_userCol
					.findOne(
						{ _id : ObjectID(String(p_id)) }
					, 	{ pwd:0 }
					,	f_callback
					)
				;
			}

			function _getUsers(p_filter, f_callback) {
				p_filter = p_filter || {};
				var from  = p_filter.from || 0;
				var limit = p_filter.limit || 25;

				_userCol
					.find(
						{}
					, 	{ pwd : 0 }
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
			this.getUserById 	 = _getUserById;
			this.remove = function (f_callback){ _userCol.remove(f_callback) };
		}

module.exports = _user;