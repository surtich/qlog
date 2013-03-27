iris.resource(
	function(self){

		self.setting("path", iris.servicepaths.apps);

		// GET /api/userconf/kinds
		self.getAll = function (success, error) {
			// return self.get("/api/kinds", function(ret){
			//	success(ret);
			// }, error);

			var apps = [];

			for(var i=1; i< 256; i++){
				var app = {
					appId : i,
					uid : 18276354 * i,
					name : 'my app ' + i,
					clientId : String(35298374598753057 * i).substring(0,16),
					secretKey : String(476521674523426731 * i).substring(0,16)+String(65298374598753057 * i).substring(0,16),
					callback : "http://mydomain.com/callback",
					created : new Date()
				};

				apps.push(app);
			}

			success(apps);

		};

		self.save = function (app, success, error) {
			success();
		};

		self.resetSecretKey = function(success, error) {
			success({secretKey : '0987654321changed1234567890'});
		};

	},

iris.path.service_apps);
