var commons = require("../lib/commons.js")
,	async	= commons.async
,	assert	= commons.assert
,	hero	= commons.hero
,	qlog	= require("../qlog/qlog.js")
;

var testUser = {
	email : 'user_email@domain.com'
,	pwd : '123456'
}

var testApp = {
	"name"  	: "Test app"
, 	"callback" 	: "http://test.app.com/callback"
}

var testLog = {
	"msg"	: "Test log message"
,	"tags"	: ["tag1","tag2"]
}


var appName = 'test'

var logMsg  = 'this message is a test'
var logTags = 'test,qlog'

describe('QLog testing'
, 	function(){

		before(
			function (done){
				qlog.ready(
					function (){
						hero.app.listen( hero.port() );
						qlog.resetLogDatabase( done );
					}
				);
			}
		);

	  	beforeEach( 
		  	function(done){
		  		qlog.resetLogDatabase( done );
			}
	  	);

		after(
			function (done){
				qlog.resetLogDatabase( done );
			}
		);

		describe('#User test 1'
	  	, 	function(){

	    		it('create user'
	    		, 	function(done){

						async.series(
							[
								function(next){
									qlog.user.signup( testUser.email, testUser.pwd, next );
								}
							,
								function(next){
									qlog.user.getUsers(
										{}
									,
										function (err, data){
											assert.equal(data.length, 1);
											assert.equal(testUser.email, data[0].email);
											assert.equal(null, data[0].pwd);
											assert.notEqual(null, data[0]._id);
											next();
										} 
									);
								}
							]
							,
							function(err, results){
								done();
							}
						);
	    			}
	    		);
			}		
		);

		describe('#User test 2'
	  	, 	function(){
				it('get user correctly for login using email+pwd credentials'
	    		, 	function(done){

						async.series(
							[
								function(next){
									qlog.user.signup( testUser.email, testUser.pwd, next );
								}
							,
								function(next){
									qlog.user.getByEmailAndPwd(
										testUser.email, testUser.pwd
									,
										function (err, data){											
											assert.equal(testUser.email, data.email);
											assert.equal(null, data.pwd);
											next();
										} 
									);
								}
							]
							,
							function(err, results){
								done();
							}
						);
	    			}
	    		);
			}		
		);


		describe('#User test 3'
	  	, 	function(){
				it('get user fails for incorrect login using email+pwd credentials'
	    		, 	function(done){

						async.series(
							[
								function(next){
									qlog.user.signup( testUser.email, testUser.pwd, next );
								}
							,
								function(next){
									qlog.user.getByEmailAndPwd(
										'emailIncorrect', 'pwdIncorrect'
									,
										function (err, data){
											assert.equal(null, data);
											next();
										} 
									);
								}
							]
							,
							function(err, results){
								done();
							}
						);
	    			}
	    		);
			}		
		);


		describe('#User test 4'
	  	, 	function(){
				it('get paginated users'
	    		, 	function(done){

						var _users = [];
						var _usersC = 0;
						function _createUsers(){
							for (var f=0, F=50; f<F; f++ ) {
								_users[_users.length] = _createUser;
							}
							return _users;
						}

						function _createUser(next){
							_usersC++;
							qlog.user.signup( testUser.email+'_'+_usersC, testUser.pwd, next );
						}

						async.series(
							_createUsers()
								.concat(
									function(next){
										qlog.user.getUsers(
											{ from : 10, limit : 20 }
										,
											function (err, data){
												assert.equal(20, data.length);
												next();
											} 
										);
									}
								)
							,
							function(err, results){
								done();
							}
						);
	    			}
	    		);
	    	}
	    );



		describe('#App test 1'
	  	, 	function(){

	    		it('create app'
	    		, 	function(done){
	    				var userId = null;
						async.series(
							[
								function(next){
									qlog.user.signup( testUser.email, testUser.pwd, next );
								}
							,
								function(next){
									qlog.user.getByEmailAndPwd( 
										testUser.email
									, 	testUser.pwd
									, 
										function (err, data){
											userId = data._id;
											next();
										}
									);
								}
							,
								function(next){
									qlog.app.create(
										userId
									,	testApp.name
									,	testApp.callback
									,
										function (err, data){
											next();
										} 
									);
								}
							,
								function(next){
									qlog.app.getByUser(
										userId
									,
										function (err, data){
											assert.equal(data.length, 1);
											assert.equal(testApp.name, data[0].name);
											assert.equal(testApp.callback, data[0].callback);
											assert.equal(16, data[0].clientId.length);
											assert.equal(32, data[0].secretKey.length);
											assert.notEqual(null, data[0]._id);
											next();
										} 
									);
								}

							]
							,
							function(err, results){
								done();
							}
						);
	    			}
	    		);
			}		
		);


		describe('#User App 2'
	  	, 	function(){
	    		it('update app'
	    		, 	function(done){

						var userId = null;
						var appId  = null;

						async.series(
							[
								function(next){
									qlog.user.signup( testUser.email, testUser.pwd, next );
								}
							,
								function(next){
									qlog.user.getByEmailAndPwd( 
										testUser.email
									, 	testUser.pwd
									, 
										function (err, data){
											userId = data._id;
											next();
										}
									);
								}
							,
								function(next){
									qlog.app.create(
										userId
									,	testApp.name
									,	testApp.callback
									,
										function (err, data){
											appId = data[0]._id;
											next();
										} 
									);
								}
							,
								function(next){
									qlog.app.update(
										appId
									,	testApp.name+'_updated'
									,	testApp.callback+'_updated'
									,
										function (){
											next();
										} 
									);
								}
							,
								function(next){
									qlog.app.getByUser(
										userId
									,
										function (err, data){
											assert.equal(data.length, 1);
											assert.equal(testApp.name+'_updated', data[0].name);
											assert.equal(testApp.callback+'_updated', data[0].callback);
											assert.equal(16, data[0].clientId.length);
											assert.equal(32, data[0].secretKey.length);
											assert.notEqual(null, data[0]._id);
											next();
										} 
									);
								}

							]
							,
							function(err, results){
								done();
							}
						);
	    			}
	    		);
			}		
		);


		describe('#User App 3'
	  	, 	function(){
	    		it('refresh app secret token'
	    		, 	function(done){

						var userId = null;
						var appId  = null;
						var secretKey = null;

						async.series(
							[
								function(next){
									qlog.user.signup( testUser.email, testUser.pwd, next );
								}
							,
								function(next){
									qlog.user.getByEmailAndPwd( 
										testUser.email
									, 	testUser.pwd
									, 
										function (err, data){
											userId = data._id;
											next();
										}
									);
								}
							,
								function(next){
									qlog.app.create(
										userId
									,	testApp.name
									,	testApp.callback
									,
										function (err, data){
											appId = data[0]._id;
											secretKey = data[0].secretKey;
											next();
										} 
									);
								}
							,
								function(next){
									qlog.app.refreshSecretKey(
										appId
									,
										function (){
											next();
										} 
									);
								}
							,
								function(next){
									qlog.app.getByUser(
										userId
									,
										function (err, data){
											assert.equal(data.length, 1);
											assert.equal(32, data[0].secretKey.length);
											assert.notEqual(secretKey, data[0].secretKey);
											next();
										} 
									);
								}

							]
							,
							function(err, results){
								done();
							}
						);
	    			}
	    		);


	    	}

	    );



		describe('#Log tests'
	  	, 	function(){

	    		it('log app'
	    		, 	function(done){
	    				
	    				var userId = null;
	    				var appId = null;

						async.series(
							[
								function(next){
									qlog.user.signup( 
										testUser.email
									, 	testUser.pwd
									, 
										function (err, data){
											userId = data[0]._id
											next();
										}
									);
								}
							,
								function(next){
									qlog.app.create(
										userId
									,	testApp.name
									,	testApp.callback
									,
										function (err, data){
											appId = data[0]._id;
											next();
										} 
									);
								}
							,
								function(next){
									qlog.log.create(
										appId
									,	testLog.msg
									, 	new Date().getTime()
									, 	testLog.tags
									,
										function (err, data){
											next();
										} 
									);
								}
							,
								function(next){
									qlog.log.getByApp(
										appId
									, 	{}
									,
										function (err, data){								
											assert.equal(data.length, 1);
											assert.equal(testLog.msg, data[0].msg);
											assert.deepEqual(testLog.tags, data[0].tags);
											assert.notEqual(null, data[0]._id);
											next();
										} 
									);
								}

							]
							,
							function(err, results){
								done();
							}
						);
	    			}
	    		);



	    	}

	    );







	}

);
