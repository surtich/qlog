iris.resource(
	function(self){

		iris.on(iris.RESOURCE_ERROR, resourceError);
		function resourceError(p_params){
			iris.log('resourceError', p_params);
		}

		self.create = function( p_name, p_callback, f_ok, f_error) {
			return self.put('/app', {n : p_name, cb : p_callback}, f_ok);
		};

		self.getAll = function(f_ok, f_error){
			return self.get('/app', f_ok, f_error);
		};

		self.getById = function(p_appId, f_ok, f_error){
			return self.get('/app/'+p_appId, f_ok, f_error);
		};

		/*
		// GET /api/userconf/kinds
		self.getAll = function (success, error) {
			// return self.get("/api/kinds", function(ret){
			//	success(ret);
			// }, error);

			var apps = [];

			var i,I=Math.floor(Math.random() * 300);
			for(i=1; i< I; i++){
				var app = {
					appId : i,
					uid : 18276354 * i,
					name : 'my app ' + i,
					clientId : String(35298374598753057 * i).substring(0,16),
					secretKey : String(476521674523426731 * i).substring(0,16)+String(65298374598753057 * i).substring(0,16),
					callback : "http://mydomain.com/callback",
					created : new Date().getTime()
				};

				apps.push(app);
			}

			success(apps);

		};

		self.save = function (params, success, error) {
			success();
		};

		self.resetSecretKey = function(params, success, error) {
			success({secretKey : '0987654321changed1234567890'});
		};
		*/

	},
	iris.path.resource.app);
