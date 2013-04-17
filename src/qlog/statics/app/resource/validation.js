iris.resource(
	function(self){

		var emailPattern = /^([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+$/;
		var urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

		self.isEmail = function(txt){
			return txt.match(emailPattern);
		};

		self.isUrl = function(txt){
			return txt.match(urlPattern);
		}
	},
	iris.path.resource.validation);
