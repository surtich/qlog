var commons = require('../lib/commons.js')
,	request = commons.request
,	querystring = commons.querystring
;

function _rabbit(p_config) {
	p_config = p_config || {};
	var auth = {
		user : p_config.user || 'guest'
	,	password : p_config.pwd || 'guest'
	};

	var baseUrl = 'http://' + (auth.user + ':' + auth.password + '@') +(p_config.host || 'localhost') + ':' + (p_config.port || '15672');

	function _getVhosts(f_callback){
		var options = {
			url  : baseUrl + '/api/vhosts/'
		,	json : {}
		};

		request.get(options, f_callback);
	}

	function _getVhost(p_name, f_callback){
		var options = {
			url  : baseUrl + '/api/vhosts/' + querystring.escape(p_name)
		,	json : {}
		};

		request.get(options, f_callback);
	}

	function _createVhost(p_name, f_callback) {
		var options = {
			url  : baseUrl + '/api/vhosts/' + querystring.escape(p_name)
		,	json : {}
		};

		request.put(options, f_callback);
	}

	function _deleteVhost(p_name, f_callback){
		var options = {
			url  : baseUrl + '/api/vhosts/' + querystring.escape(p_name)
		,	json : {}
		};

		request.del(options, f_callback);
	}

	function _getUsers(f_callback){
		var options = {
			url  : baseUrl + '/api/users/'
		,	json : {}
		};

		request.get(options, f_callback);
	}

	function _getUser(p_user, f_callback){
		var options = {
			url  : baseUrl + '/api/users/' + p_user
		,	json : {}
		};

		
		request.get(options, f_callback);
	}

	function _createUser(p_user, p_password, p_tags, f_callback) {
		var options = {
			url  : baseUrl + '/api/users/' + p_user
		,	json : {
				password : p_password
			,	tags : p_tags
			}
		};

		request.put(options, f_callback);
	}

	function _deleteUser(p_user, f_callback){
		var options = {
			url  : baseUrl + '/api/users/' + p_user
		,	json : {}
		};

		request.del(options, f_callback);
	}

	function _getPermissions(p_user, p_vhost, f_callback){
		var options = {
			url  : baseUrl + '/api/permissions/' + querystring.escape(p_vhost) + '/' + p_user
		,	json : {}
		};

		request.get(options, f_callback);
	}

	function _setPermissions(p_user, p_vhost, p_config, p_write, p_read, f_callback){
		var options = {
			url  : baseUrl + '/api/permissions/' + querystring.escape(p_vhost) + '/' + p_user
		,	json : {
				configure : p_config
			,	write : p_write
			,	read: p_read
		}
		};

		request.put(options, f_callback);

	}

	function _revokePermissions(p_user, p_vhost, f_callback){
		var options = {
			url  : baseUrl + '/api/permissions/' + querystring.escape(p_vhost) + '/' + p_user
		,	json : {}
		};

		request.del(options, f_callback);
	}

	function _getExchanges(f_callback){
		var options = {
			url  : baseUrl + '/api/exchanges/'
		,	json : {}
		};

		request.get(options, f_callback);
	}

	function _getExchangesByVhost(p_vhost, f_callback){
		var options = {
			url  : baseUrl + '/api/exchanges/' + querystring.escape(p_vhost)
		,	json : {}
		};

		request.get(options, f_callback);
	}

	function _getExchange(p_vhost, p_exchange, f_callback){
		var options = {
			url  : baseUrl + '/api/exchanges/' + querystring.escape(p_vhost) + '/' + p_exchange
		,	json : {}
		};

		request.get(options, f_callback);
	}

	function _createExchange(p_vhost, p_exchange, p_params, f_callback){
		var options = {
			url  : baseUrl + '/api/exchanges/' + querystring.escape(p_vhost) + '/' + p_exchange
		,	json : p_params || { type: 'direct'}
		};

		request.put(options, f_callback);
	}

	function _deleteExchange(p_vhost, p_exchange, f_callback){
		var options = {
			url  : baseUrl + '/api/exchanges/' + querystring.escape(p_vhost) + '/' + p_exchange
		,	json : {}
		};

		request.del(options, f_callback);
	}

	/*function _publish(p_vhost, p_exchange, p_params, f_callback){
		var options = {
			url  : baseUrl + '/api/exchanges/' + querystring.escape(p_vhost) + '/' + p_exchange + '/publish/'
		,	json : p_params || {properties: {}, routing_key: '*', payload:'dummy', payload_encoding:'string'}
		};

		request.post(options, f_callback);
	}*/

	function _getQueues(f_callback){
		var options = {
			url  : baseUrl + '/api/queues/'
		,	json : {}
		};

		request.get(options, f_callback);
	}

	function _getQueuesByVhost(p_vhost, f_callback){
		var options = {
			url  : baseUrl + '/api/queues/' + querystring.escape(p_vhost)
		,	json : {}
		};

		request.get(options, f_callback);
	}

	function _getQueue(p_vhost, p_queue, f_callback){
		var options = {
			url  : baseUrl + '/api/queues/' + querystring.escape(p_vhost) + '/' + p_queue
		,	json : {}
		};

		request.get(options, f_callback);
	}

	function _createQueue(p_vhost, p_queue, p_params, f_callback){
		var options = {
			url  : baseUrl + '/api/queues/' + querystring.escape(p_vhost) + '/' + p_queue
		,	json : p_params || {}
		};

		request.put(options, f_callback);
	}

	function _deleteQueue(p_vhost, p_queue, f_callback){
		var options = {
			url  : baseUrl + '/api/queues/' + querystring.escape(p_vhost) + '/' + p_queue
		,	json : {}
		};

		request.del(options, f_callback);
	}

	/*function _getMessage(p_vhost, p_queue, f_callback){
		var options = {
			url  : baseUrl + '/api/queues/' + querystring.escape(p_vhost) + '/' + p_queue + '/get'
		,	json : {count: 1, requeue: false, encoding: 'auto'}
		};

		request.post(options, f_callback);
	}*/

	function _bind(p_vhost, p_exchange, p_destination, p_params, f_callback) {
		var options = {
			url  : baseUrl + '/api/bindings/' + querystring.escape(p_vhost) + '/e/' + p_exchange + '/q/' + p_destination
		,	json : p_params || { type: 'topic'}
		};

		request.post(options, f_callback);
	}


	function _createCredential(p_user, p_password, p_vhost, p_url, f_callback){
		p_vhost = (p_vhost === '/' ? '' : '/' + querystring.escape(p_vhost));
		var url = 'amqp://' + p_user + ':' + p_password + '@' + p_url + p_vhost;
		f_callback(null, {url : url, exchange : p_user});

		/*_createUser(p_user, p_password, '', function(error, response, data){
			if(! error && response.statusCode === 204){
				_setPermissions(p_user, p_vhost, '^$', '^' + p_user, '^$', function(error, response, data){
					if(! error && response.statusCode === 204){
						var url = 'amqp://' + p_user + ':' + p_password + '@' + p_url + '/' + querystring.escape(p_vhost);
						f_callback(null, {url : url, exchange : p_user});
					} else {
						f_callback(error || data, null);
					}
				});
			} else {
				f_callback(error || data, null);
			}
		});*/
	}

	this.getVhosts = _getVhosts;
	this.getVhostByName = _getVhost;
	this.createVhost = _createVhost;
	this.deleteVhost = _deleteVhost;
	this.getUsers = _getUsers;
	this.getUserByName = _getUser;
	this.createUser = _createUser;
	this.deleteUser = _deleteUser;
	this.getPermissions = _getPermissions;
	this.setPermissions = _setPermissions;
	this.revokePermissions = _revokePermissions;
	this.getExchanges = _getExchanges;
	this.getExchangesByVhost = _getExchangesByVhost;
	this.getExchange = _getExchange;
	this.createExchange = _createExchange;
	this.deleteExchange = _deleteExchange;
	//this.publish = _publish;
	this.getQueues = _getQueues;
	this.getQueuesByVhost = _getQueuesByVhost;
	this.getQueue = _getQueue;
	this.createQueue = _createQueue;
	this.deleteQueue = _deleteQueue;
	//this.getMessage = _getMessage;
	this.bind = _bind;

	this.createCredential = _createCredential;
}

module.exports = _rabbit;