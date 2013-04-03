iris.resource(
	function(self){
		
		var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

		self.isEmail = function(txt){
			return txt.match(emailPattern);
		};
	},
	iris.path.resource.validation);
