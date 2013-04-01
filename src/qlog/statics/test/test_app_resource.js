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

  module('Module App Services', {
    setup: function() {
    },
    teardown: function () {
    }
  });

  asyncTest("create app"
	,
		function() {
      var user = iris.resource( iris.path.resource.user );
      var app = iris.resource( iris.path.resource.app );

      var testUser = {
        email : "test_email@domain.com"
      , pwd   : "test_password"
      }

      var testApp = {
        name      : 'test_app'
      , callback  : 'http://www.testsite.com'
      }

      expect(4);
      user.signup(
        testUser.email
      , testUser.pwd
      , 
        function () {
          user.signin(
            testUser.email
          , testUser.pwd
          , 
            function (p_user) {
              start();
              app.create(
                testApp.name
              , testApp.callback
              , function(param1, param2, param3, param4){
                console.log(param1, param2, param3, param5);
                ok(param1);
                ok(param2);
                ok(param3);
                ok(param4);
              }
              , function(){

              });
            }
          );
        }
      );
    }
  );
}(jQuery));