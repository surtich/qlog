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

      function _signUpUser(p_email, p_password) {
        user.signup(p_email, p_password, function(data) {
          _signInUser(p_email, p_password);
        });
      }

      function _signInUser(p_email, p_password) {
        user.signin(p_email, p_password, function(){
          _createApp(testApp.name, testApp.callback);
        });
      }

      function _createApp(p_name, p_callback){
        start();
        app.create(p_name, p_callback, function(data){
          console.log(data);
          ok(data.appID);
          //_getApps();
        }, function(){
          ok(false);
        });
      }

      function _getApps(){
        app.getAll(function(data){
          console.log(data);
          ok(data);
        });
      }

      expect(1);
      _signUpUser(testUser.email, testUser.pwd, _signInUser);
    }
  );

}(jQuery));