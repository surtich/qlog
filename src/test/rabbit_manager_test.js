var commons = require('../lib/commons.js')
	rbtm = require('../qlog/rabbit_manager.js')
, 	rabbitMan = new rbtm({
		host: 'localhost'
	,	port: '15672'
	,	user: 'guest'
	,	password: 'guest'
})
,	assert = commons.assert
;

describe('Rabbit Manager', function(){
	describe('Basic Functionality', function(){
		var vhost = 'testVhost';
		var user = { 
			name: 'testUser'
		,	pass: 'testUser'
		,	tags: ''
		};

		var exchange = {
			name : 'testExc'
		,	params: {
				"type":"direct"
			,	"auto_delete":true
			,	"durable":false
			,	"internal":false
			,	"arguments":[]
			}
		};

		var queue = {
			name : 'testQue'
		,	params: {
				"auto_delete":true
			,	"durable":false
			,	"arguments":[]
			}
		};

		var permissions = {
			config : '^$'
		,	write : '^' + exchange.name
		,	read: '^$'
		};

		var binding = {
			routing_key : "*"
		,	arguments : []
		}

		before(function(){

		});

		beforeEach(function(){
			
		});

		it('Get Vhosts', function(done){
			rabbitMan.getVhosts(function(error, response, body){
				assert.equal(response.statusCode, 200, 'Expected response 200, got ' + response.statusCode);
				assert.equal(typeof body, 'object', 'Expected Array');
				done();
			});
		});

		it('Create Vhost', function(done){
			rabbitMan.createVhost(vhost,function(error, response, body){
				assert.equal(response.statusCode, 204, 'Expected response 204, got ' + response.statusCode);
				done();
			});
		});

		it('Get Vhost by Name', function(done){
			rabbitMan.getVhostByName(vhost, function(error, response, body){
				assert.equal(response.statusCode, 200, 'Expected response 200, got ' + response.statusCode);
				assert.equal(typeof body, 'object', 'Expected Object');
				assert.equal(body.name, vhost, 'Vhost name does not match' + body.name + ' : ' + vhost);
				done();
			});
		});

		it('Get Users', function(done){
			rabbitMan.getUsers(function(error, response, body){
				assert.equal(response.statusCode, 200, 'Expected response 200, got ' + response.statusCode);
				assert.equal(typeof body, 'object', 'Expected Array');
				done();
			});
		});

		it('Create User', function(done){
			rabbitMan.createUser(user.name, user.pass, user.tags ,function(error, response, body){
				assert.equal(response.statusCode, 204, 'Expected response 204, got ' + response.statusCode);
				done();
			});
		});

		it('Get User by Name', function(done){
			rabbitMan.getUserByName(user.name, function(error, response, body){
				assert.equal(response.statusCode, 200, 'Expected response 200, got ' + response.statusCode);
				assert.equal(typeof body, 'object', 'Expected Object');
				assert.equal(body.name, user.name, 'Vhost name does not match' + body.name + ' : ' + user.name);
				done();
			});
		});

		it('Set Permissions', function(done){
			rabbitMan.setPermissions(user.name, vhost, permissions.config, permissions.write, permissions.read, function(error, response, body){
				assert.equal(response.statusCode, 204, 'Expected response 200, got ' + response.statusCode);
				rabbitMan.setPermissions('guest', vhost, '.*', '.*', '.*', function(error, response, body){
					assert.equal(response.statusCode, 204, 'Expected response 200, got ' + response.statusCode);
					done();
				});
			});

		});

		it('Get Permissions', function(done){
			rabbitMan.getPermissions(user.name, vhost, function(error, response, body){
				assert.equal(response.statusCode, 200, 'Expected response 200, got ' + response.statusCode);
				assert.equal(body.user, user.name, 'User name does not match' + body.user + ' : ' + user.name);
				assert.equal(body.vhost, vhost, 'Vhost name does not match' + body.vhost + ' : ' + vhost);
				assert.equal(body.configure, permissions.config, 'Config permissions does not match' + body.configure + ' : ' + permissions.config);
				assert.equal(body.write, permissions.write, 'Write permissions does not match' + body.write + ' : ' + permissions.write);
				assert.equal(body.read, permissions.read, 'Read permissions does not match' + body.read + ' : ' + permissions.read);
				done();
			});
		});

		it('Get Exchanges', function(done){
			rabbitMan.getExchanges(function(error, response, body){
				assert.equal(response.statusCode, 200, 'Expected response 200, got ' + response.statusCode);
				assert.equal(typeof body, 'object', 'Expected Array');
				done();
			});
		});

		it('Create Exchange', function(done){
			rabbitMan.createExchange(vhost, exchange.name, exchange.params, function(error, response, body){
				assert.equal(response.statusCode, 204, 'Expected response 204, got ' + response.statusCode);
				done();
			});
		});

		it('Get Exchanges By Vhost', function(done){
			rabbitMan.getExchangesByVhost(vhost, function(error, response, body){
				assert.equal(response.statusCode, 200, 'Expected response 200, got ' + response.statusCode);
				assert.equal(typeof body, 'object', 'Expected Array');
				done();
			});
		});

		it('Get Exchange', function(done){
			rabbitMan.getExchange(vhost, exchange.name, function(error, response, body){
				assert.equal(response.statusCode, 200, 'Expected response 200, got ' + response.statusCode);
				assert.equal(typeof body, 'object', 'Expected Object');
				assert.equal(body.name, exchange.name, 'Vhost name does not match' + body.name + ' : ' + exchange.name);
				done();
			});
		});

		it('Get Queues', function(done){
			rabbitMan.getQueues(function(error, response, body){
				assert.equal(response.statusCode, 200, 'Expected response 200, got ' + response.statusCode);
				assert.equal(typeof body, 'object', 'Expected Array');
				done();
			});
		});

		it('Create Queue', function(done){
			rabbitMan.createQueue(vhost, queue.name, queue.params, function(error, response, body){
				assert.equal(response.statusCode, 204, 'Expected response 204, got ' + response.statusCode);
				done();
			});
		});

		it('Get Queues By Vhost', function(done){
			rabbitMan.getQueuesByVhost(vhost, function(error, response, body){
				assert.equal(response.statusCode, 200, 'Expected response 200, got ' + response.statusCode);
				assert.equal(typeof body, 'object', 'Expected Array');
				done();
			});
		});

		it('Get Queue', function(done){
			rabbitMan.getQueue(vhost, queue.name, function(error, response, body){
				assert.equal(response.statusCode, 200, 'Expected response 200, got ' + response.statusCode);
				assert.equal(typeof body, 'object', 'Expected Object');
				assert.equal(body.name, queue.name, 'Vhost name does not match' + body.name + ' : ' + queue.name);
				done();
			});
		});

		it('Bind Exchange to Queue', function(done){
			rabbitMan.bind(vhost, exchange.name, queue.name, binding, function(error, response, body){
				assert.equal(response.statusCode, 201, 'Expected response 201, got ' + response.statusCode);
				done();
			})
		});

		/*it('Publish Message', function(done){
			rabbitMan.publish(vhost, exchange.name, null, function(error, response, body){
				assert.equal(response.statusCode, 200, 'Expected response 200, got ' + response.statusCode);
				assert.equal(typeof body, 'object', 'Expected Object');
				assert.equal(body.routed, true, 'Message did not route');
				done();
			})
		});*/

		it('Revoke Permissions', function(done){
			rabbitMan.revokePermissions(user.name, vhost, function(error, response, body){
				assert.equal(response.statusCode, 204, 'Expected response 204, got ' + response.statusCode);
				done();
			});
		});

		it('Create Credential', function(done){
			rabbitMan.createCredential(user.name, user.password, vhost, 'localhost', function(error, data){
				var url = 'amqp://' + user.name + ':' + user.password + '@localhost/' + vhost;
				assert.equal(data.url, url, 'Expected url ' + url + ', got ' + data.url);
				done();
			});
		});

		it('Delete Exchange', function(done){
			rabbitMan.deleteExchange(vhost, exchange.name, function(error, response, body){
				assert.equal(response.statusCode, 204, 'Expected response 204, got ' + response.statusCode);
				done();
			});
		});

		it('Delete Queue', function(done){
			rabbitMan.deleteQueue(vhost, queue.name, function(error, response, body){
				assert.equal(response.statusCode, 204, 'Expected response 204, got ' + response.statusCode);
				done();
			});
		});

		it('Delete Vhost', function(done){
			rabbitMan.deleteVhost(vhost,function(error, response, body){
				assert.equal(response.statusCode, 204, 'Expected response 204, got ' + response.statusCode);
				done();
			});
		});

		it('Delete User', function(done){
			rabbitMan.deleteUser(user.name,function(error, response, body){
				assert.equal(response.statusCode, 204, 'Expected response 204, got ' + response.statusCode);
				done();
			});
		});
	});

});