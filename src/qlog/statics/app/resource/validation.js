iris.resource(
	function(self){

		var emailPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)@[a-z0-9-]+(\.[a-z0-9-]+)(\.[a-z]{2,3})$/;
		var urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

		self.isEmail = function(txt){
			return txt.match(emailPattern);
		};

		self.isUrl = function(txt){
			return txt.match(urlPattern);
		}
	},
	iris.path.resource.validation);
