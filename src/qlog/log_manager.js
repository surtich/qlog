var commons  = require('../lib/commons.js')
, 	ObjectID = commons.ObjectID
;

function _log(p_collection){
	var _logCol = p_collection;

	function _create(p_appId, p_msg, p_time, p_tags, f_callback){
		_logCol.insert(
			{
			  appId 	: p_appId
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

module.exports = _log;