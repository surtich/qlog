iris.screen(function(self) {
	self.create = function() {
		self.tmpl(iris.path.welcome_tmpl);

		self.screens('screens',
			[
				[ 'signin', iris.path.screens.signin.js],
				[ 'app', iris.path.screens.app.js],
				[ 'user', iris.path.screens.user.js]
			]
			);

		self.ui("header", iris.path.ui.header.js);
		self.ui("sidebar", iris.path.ui.sidebar.js);

		self.on("SCREEN_CHANGE", screenChange);

		self.on(iris.RESOURCE_ERROR, resourceError);

		if ( !document.location.hash ) {
			iris.navigate('#/signin');
		}

		iris.resource(iris.path.resource.user).getMe(getMeOk);
	};

	function screenChange(screenPath){
	}

	function resourceError(p_params){
		if(p_params.request.status == 401){
			iris.navigate('#/signin');
		}
	}

	function getMeOk(user){
		if(user._id === undefined || user._id === null){
			iris.navigate('#/signin');
		}
		iris.notify(iris.evts.signin.ok, user);
	}

}, iris.path.welcome);