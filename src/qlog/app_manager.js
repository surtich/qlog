var commons  = require('../lib/commons.js')
, 	hero 	 = commons.hero
, 	async    = commons.async
, 	ObjectID = commons.ObjectID
,   crypto   = commons.crypto
,	rabbitM  = require('./rabbit_manager.js')
;

function _app(p_collection){
	var _appCol = p_collection;
	_appCol.ensureIndex({'uid' : 1});
	
	var rabbit = new rabbitM(hero.config().rabbitAdmin);

	var _CLIENT_ID_LENGTH 	= 16
	,	_SCECRET_KEY_LENGTH = 32
	;

	var _CLIENT_CONFIG_PERMISSION = 
		_CLIENT_READ_PERMISSION = '^$'
	,	_CLIENT_WRITE_PERMISSION = '^'
	;

	var _VIRTUAL_HOST = '/'
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
		var clientId	= _createToken( _CLIENT_ID_LENGTH )
		, 	secretKey	= _createToken( _SCECRET_KEY_LENGTH )
		;

		async.series(
		{
			createUser : function(done){
				rabbit.createUser(
					clientId
				, 	secretKey
				, 	''
				, function(error, request, data){
					done(error, request.statusCode);
				});
			}
		,
			setPermissions: function(done){
				rabbit.setPermissions(
					clientId
				, 	_VIRTUAL_HOST
				, 	_CLIENT_CONFIG_PERMISSION
				, 	_CLIENT_WRITE_PERMISSION + clientId
				, 	_CLIENT_READ_PERMISSION
				, function(error, request, data){
					done(error, request.statusCode);
				});
			}
		,
			createExchange: function(done){
				rabbit.createExchange(
					_VIRTUAL_HOST
				,	clientId
				, 	{
						"type" 			: "direct"
					,	"auto_delete" 	: false
					,	"durable" 		: true
					,	"internal" 		: false
					,	"arguments" 	: []
				}
				, function(error, request, data){
					done(error, request.statusCode);
				});
			}
		,
			bind: function(done){
				rabbit.bind(
					_VIRTUAL_HOST
				, 	clientId
				, 	hero.config().mq.log.queue
				, 	{
						routing_key : "*"
					,	arguments : []
					}
				, function(error, request, data){
					done(error, request.statusCode);
				});
			}
		,
			insert: function(done){
				_appCol.insert(
					{
					 	uid			: p_uid
					, 	name  		: p_name
					, 	clientId	: clientId
					, 	secretKey	: secretKey
					, 	callback 	: p_callback
					,	created		: (new Date()).getTime()
					}
				,
					done
				);
			}
		}
		, function (error, result){
			if( !error ) {
				f_callback(null, result.insert);
			} else {
				f_callback({error: 'Unable to create Rabbit User'}, null);
			}

		});
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

	function _getAppByClientId(p_appId, f_callback){
		_appCol
			.findOne(
				{ clientId : p_appId
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
		_appCol.findOne({
			_id: new ObjectID( String(p_appId) )
		}
		, function(err, data){
			var clientId = data.clientId;

			async.parallel(
				[
				function(done){
					rabbit.deleteUser(
						clientId
					, function(err, request, data){
						done(err, data);
					});
				}
			,
				function(done) {
					rabbit.deleteExchange(
						_VIRTUAL_HOST
					, 	clientId
					, function(err, request, data){
						done(err, data);
					});
				}
			,	
				function(done) {
				_appCol
					.remove(
						{ _id: new ObjectID( String(p_appId) ) }
					, 	
						true
					, 
						done);
				} 
			]
			, function(err, result){
				f_callback(err, result);
			}

			);
		});
	}

	this.create = _create;
	this.update = _update;
	this.refreshSecretKey = _refreshSecretKey;
	this.getByUser 	= _getAppsByUser;
	this.getById 	= _getAppById;
	this.getByClientId 	= _getAppByClientId;
	this.get 		= _get;
	this.erase 		= _delete;
	this.remove = function (f_callback){ _appCol.remove(f_callback) };
}

module.exports = _app;