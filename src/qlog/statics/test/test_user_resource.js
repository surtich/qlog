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

	module('Module User Services', {
	  	setup: function() {

	  	},
	  	teardown: function () {
	      
	  	}
	});

	function _userLogin(p_email, p_pwd){
		iris.resource( iris.path.resource.user ).signin(
			p_email
		,	p_pwd
		, 
			function (p_user) {
				ok( p_user.uid );
				ok( p_user.email===p_email );
				ok( !p_user.pwd );
				start();
			}
		);
	}


	asyncTest("signup and signin"
	, 
		function() {
			var testUser = {
				email : "test_email@domain.com"
			,	pwd   : "test_password"
			} 

			expect(3);
			iris.resource( iris.path.resource.user ).signup(
				testUser.email
			,	testUser.pwd
			, 
				function () {
    				_userLogin( testUser.email, testUser.pwd );
				}
			);

    	}
    );


}(jQuery));