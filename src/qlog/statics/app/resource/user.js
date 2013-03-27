iris.resource( 
	function(self){

	    self.create = function (params, f_ok) {
	      return self.post("signup", params, f_ok);
	    };

	}
, 	iris.path.resource.user.js
);