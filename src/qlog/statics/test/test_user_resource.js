/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  	/*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  	*/

	module(
		'Module User Services'
	, 	{
		  	setup : function() {

		  	}
		,
		  	teardown : function () {

		  	}
		}
	);

	var testUser = {
		email : "test_email@domain.com"
	,	pwd   : "test_password"
	} 

	function _signUp(f_callback){
		iris
			.resource( iris.path.resource.user )
			.signup(
				testUser.email
			,	testUser.pwd
			, 
				f_callback
			)
		;
	}

	function _userLogin(p_email, p_pwd, f_callback){
		iris
			.resource( iris.path.resource.user )
			.signin(
				p_email
			,	p_pwd
			, 
				function ( p_user ) {
					ok( p_user._id );
					ok( p_user.email===p_email );
					ok( !p_user.hasOwnProperty('pwd') );
					if ( f_callback ) {
						f_callback( p_user );
					}
					else {
						start();
					}
				}
			)
		;
	}

	asyncTest("signup and signin"
	, 
		function() {

			expect(3);

			_signUp( 
				function (){
    				_userLogin( testUser.email, testUser.pwd );
				}
			);

    	}
    );

    asyncTest("get me"
	, 
		function() {

			expect(4);

			_signUp( 
				function (){
    				_userLogin( 
    					testUser.email
    				, 	testUser.pwd
    				, 
    					function (){
    						iris
    							.resource( iris.path.resource.user )
    							.getMe(
    								function (p_user){
										ok(p_user.email === testUser.email );
										start();
    								}
    							)
    						;
    					} 
    				);
				}
			);

    	}
    );

	asyncTest("get users"
	, 
		function() {

			expect(1);

			_signUp( 
				function (){
    				_signUp(
    					function (){
    						_signUp(
    							function (){
	    							iris
	    								.resource( iris.path.resource.user )
	    								.getAll(
	    									function (p_users){
												ok( p_users.length >= 3 );
												start();
	    									}
	    								)
	    							;
    							}
    						)
    					}
    				);
				}
			);

    	}
    );


}(jQuery));