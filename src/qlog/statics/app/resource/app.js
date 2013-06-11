iris.resource(
	function(self){

		iris.on(iris.RESOURCE_ERROR, resourceError);
		function resourceError(p_params){
			iris.log('resourceError', p_params);
		}


	},
	iris.path.resource.app, iris.path.resource._app);
