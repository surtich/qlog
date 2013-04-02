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
          ok(data.appId);
        }, function(){
          ok(false);
        });
      }

      expect(1);
      _signUpUser(testUser.email, testUser.pwd, _signInUser);
    }
  );

  asyncTest("Get all apps and GetById"
  ,
    function() {
      var user = iris.resource( iris.path.resource.user );
      var app = iris.resource( iris.path.resource.app );

      var testUser = {
        email : "test_email@domain.com"
      , pwd   : "test_password"
      }

      function _signInUser(p_email, p_password) {
        user.signin(p_email, p_password, function(){
          _getApps();
        });
      }

      function _getApps(){
        app.getAll(function(data){
          ok(data.length > 0);
          _getAppById(data[0]._id);
        });
      }

      function _getAppById(p_appId){
        app.getById(p_appId, function(data){
          start();
          ok(data);
        });
      }

      expect(2);
      _signInUser(testUser.email, testUser.pwd);
    }
  );

  asyncTest("Update app"
  ,
    function() {
      var user = iris.resource( iris.path.resource.user );
      var app = iris.resource( iris.path.resource.app );

      var testUser = {
        email : "test_email@domain.com"
      , pwd   : "test_password"
      }

      var testAppUpdate = {
        name      : 'test_app_update'
      , callback  : 'http://www.testupdate.com'
      }

      function _signInUser(p_email, p_password) {
        user.signin(p_email, p_password, function(){
          _getApps();
        });
      }

      function _getApps(){
        app.getAll(function(data){
          ok(data.length > 0);
          _getAppById(data[0]._id);
        });
      }

      function _getAppById(p_appId){
        app.getById(p_appId, function(data){
          ok(data);
          _updateApp(p_appId, testAppUpdate.name, testAppUpdate.callback);
        });
      }

      function _updateApp(p_appId, p_name, p_callback){
        app.save(p_appId, p_name, p_callback, function(){
          ok(true);
          app.getById(p_appId, function(data){
            start();
            ok(data.name == p_name);
            ok(data.callback = p_callback);
          });
        });
      }

      expect(5);
      _signInUser(testUser.email, testUser.pwd);
    }
  );

  asyncTest("Reset secret Key"
  ,
    function() {
      var user = iris.resource( iris.path.resource.user );
      var app = iris.resource( iris.path.resource.app );

      var testUser = {
        email : "test_email@domain.com"
      , pwd   : "test_password"
      }

      function _signInUser(p_email, p_password) {
        user.signin(p_email, p_password, function(){
          _getApps();
        });
      }

      function _getApps(){
        app.getAll(function(data){
          ok(data.length > 0);
          _getAppById(data[0]._id);
        });
      }

      function _getAppById(p_appId){
        app.getById(p_appId, function(data){
          ok(data);
          _updateSecretKey(p_appId);
        });
      }

      function _updateSecretKey(p_appId){
        app.resetSecretKey(p_appId, function(data){
          ok(data.secretKey);
          app.getById(p_appId, function(app){
            start();
            ok(data.secretKey == app.secretKey);
          });
        });
      }

      expect(4);
      _signInUser(testUser.email, testUser.pwd);
    }
  );

}(jQuery));