iris.resource(
	function(self){
		var _user = null;

		iris.on(iris.RESOURCE_ERROR, resourceError);

		self.signup = function (p_email, p_pwd, f_ok) {
			return self.post("/signup", { 'e':p_email, 'p' : p_pwd}, f_ok);
		};

		self.signin = function (p_email, p_pwd, f_ok, f_ko) {
			return self.post(
				"/signin",
				{ 'e':p_email, 'p' : p_pwd},
				function(user){
					_user = user;
					f_ok(user);
				},
				f_ko
			);
		};

		self.getAll = function (f_ok) {
			return self.get('/user', f_ok);
		};

		self.getMe = function (f_ok) {
			return self.get('/user/me', f_ok);
		};

		self.isSignedin = function () {
			return (_user !== null);
		};

		function resourceError(p_params){
			iris.log('resourceError', p_params);
		}
	},
	iris.path.resource.user);
