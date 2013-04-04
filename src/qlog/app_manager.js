var commons  = require('../lib/commons.js')
, 	ObjectID = commons.ObjectID
,   crypto   = commons.crypto
;

function _app(p_collection){
	var _appCol = p_collection;
	_appCol.ensureIndex({'uid' : 1});

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

	function _create(p_uid, p_name, p_callback, f_callback){
		_appCol.insert(
			{
			 	uid			: p_uid
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
			{ _id : new ObjectID(String(p_appId)) }
		,
			{
				$set : updateData
			}
		,
			f_callback
		);
	}

	function _refreshSecretKey(p_appId, f_callback){
		_appCol.findAndModify(
			{ _id : new ObjectID(String(p_appId)) }
		,
			[]
		,
			{	
				$set : {
			 		secretKey	: _createToken( _SCECRET_KEY_LENGTH )
			 	}
			}
		,
			{'new' : true}
		,
			f_callback
		);
	}

	function _getAppsByUser(p_uid, f_callback){
		_appCol
			.find(
				{ uid : String(p_uid)
				}
			)
			.sort( { 'created' : 1 })
			.toArray( f_callback )
		;
	}

	function _getAppById(p_appId, f_callback){
		_appCol
			.findOne(
				{ _id : new ObjectID(String(p_appId))
				}
			,
			f_callback);
	}

	function _get(p_filter, f_callback){
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

	function _delete(p_appId, f_callback){
		_appCol
			.remove(
				{ _id: new ObjectID( String(p_appId) ) }
			, 	
				true
			, 
				f_callback);
	}

	this.create = _create;
	this.update = _update;
	this.refreshSecretKey = _refreshSecretKey;
	this.getByUser 	= _getAppsByUser;
	this.getById 	= _getAppById;
	this.get 		= _get;
	this.erase 		= _delete;
	this.remove = function (f_callback){ _appCol.remove(f_callback) };
}

module.exports = _app;