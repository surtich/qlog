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
			return self.get('/app/' + p_appId, f_ok, f_error);
		};

		self.save = function(p_appId, p_name, p_callback, f_ok, f_error) {
			return self.post('/app/' + p_appId, {n: p_name, cb: p_callback}, f_ok, f_error);
		};

		self.resetSecretKey = function(p_appId, f_ok, f_error) {
			return self.post('/app/' + p_appId + '/resetkey', {}, f_ok, f_error);
		};

		self.remove = function(p_appId, f_ok, f_error) {
			return self.del('/app/' + p_appId, {}, f_ok, f_error);
		};

	},
	iris.path.resource.app);
