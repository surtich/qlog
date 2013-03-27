iris.resource( 
	function(self){
	    self.signup = function (params, f_ok) {
	      return self.post("/signup", params, f_ok);
	    };
	
		self.signin = function (p_email, p_pwd, f_ok) {
	      return self.post("/signin", { 'e':p_email, 'p' : p_pwd}, f_ok);
	    };

	}
, 	iris.path.resource.user
);
