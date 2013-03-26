var commons = require("../lib/commons.js")
,	async	= commons.async
,	assert	= commons.assert
,	hero	= commons.hero
,	qlog	= require("../qlog/qlog.js")
;

var testUser = {
	usr : 'user'
,	pwd : '123456'
,	admin : false
}

var adminUser = {
	usr : 'admin'
,	pwd : 'admin'
,	admin : true
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

		describe('#User tests'
	  	, 	function(){

	    		it('create user'
	    		, 	function(done){

						async.series(
							[
								function(next){
									qlog.user.createUser( testUser.usr, testUser.pwd, next );
								}
							,
								function(next){
									qlog.user.getUsers(
										null, null
									,
										function (err, data){
											assert.equal(data.length, 1);
											assert.equal(testUser.usr, data[0].usr);
											assert.equal(testUser.pwd, data[0].pwd);
											assert.equal(testUser.admin, data[0].admin);
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



				it('get user correctly for login using usr+pwd credentials'
	    		, 	function(done){

						async.series(
							[
								function(next){
									qlog.user.createUser( testUser.usr, testUser.pwd, next );
								}
							,
								function(next){
									qlog.user.getByUsrAndPwd(
										testUser.usr, testUser.pwd
									,
										function (err, data){
											assert.equal(testUser.usr, data.usr);
											assert.equal(testUser.pwd, data.pwd);
											assert.equal(testUser.admin, data.admin);
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



				it('get user fails for incorrect login using usr+pwd credentials'
	    		, 	function(done){

						async.series(
							[
								function(next){
									qlog.user.createUser( testUser.usr, testUser.pwd, next );
								}
							,
								function(next){
									qlog.user.getByUsrAndPwd(
										'userIncorrect', 'pwdIncorrect'
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
							qlog.user.createUser( testUser.usr+'_'+_usersC, testUser.pwd, next );
						}

						async.series(
							_createUsers()
							.concat(
								function(next){
									qlog.user.getUsers(
										10, 20
									,
										function (err, data){
											console.log( data.length, data );
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

	}

);
