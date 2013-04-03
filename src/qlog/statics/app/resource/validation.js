iris.resource(
	function(self){

		var emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
		var urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

		self.isEmail = function(txt){
			return txt.match(emailPattern);
		};

		self.isUrl = function(txt){
			return txt.match(urlPattern);
		}
	},
	iris.path.resource.validation);
