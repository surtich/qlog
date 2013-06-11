iris.resource(
	function(self){
		var _user = null;

		iris.on(iris.RESOURCE_ERROR, resourceError);


		self.signin = function (p_email, p_pwd, f_ok, f_ko) {
			return self.super.signin(p_email, p_pwd,
				function(user){
					_user = user;
					f_ok(user);
				},
				f_ko
			);
		};

		function resourceError(p_params){
			iris.log('resourceError', p_params);
		}
	},
	iris.path.resource.user, iris.path.resource._user);
