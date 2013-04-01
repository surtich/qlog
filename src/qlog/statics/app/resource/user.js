iris.resource(
	function(self){

		self.signup = function (p_email, p_pwd, f_ok) {
			return self.post("/signup", { 'e':p_email, 'p' : p_pwd}, f_ok);
		};

		self.signin = function (p_email, p_pwd, f_ok) {
			return self.post("/signin", { 'e':p_email, 'p' : p_pwd}, f_ok);
		};

		self.getAll = function (f_ok) {
			var users = [];

			var i,I=Math.floor(Math.random() * 50);
			for(i=1; i< I; i++){
				var user = {
					uid	: 1827635418276354 * i,
					email	: "long.length.email.address@email.server.com",
					admin	: (Math.random() > 0.8),
					created : (new Date()).getTime()
				};

				users.push(user);
			}

			f_ok (users);
		};
	},
	iris.path.resource.user);
