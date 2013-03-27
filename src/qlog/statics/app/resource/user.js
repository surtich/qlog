iris.resource( 
	function(self){

	    self.signup = function (p_email, p_pwd, f_ok) {
	      return self.post("/signup", { 'e':p_email, 'p' : p_pwd}, f_ok);
	    };
	
		self.signin = function (p_email, p_pwd, f_ok) {
	      return self.post("/signin", { 'e':p_email, 'p' : p_pwd}, f_ok);
	    };

	}
, 	iris.path.resource.user
);
