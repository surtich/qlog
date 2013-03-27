iris.screen(function(self) {
	self.create = function() {
		self.tmpl(iris.path.welcome_tmpl);

		self.screens('screens',
			[
				[ 'apps', iris.path.apps]
			]
			);

		self.ui("header", iris.path.ui_header);
		self.ui("sidebar", iris.path.ui_sidebar);

		self.on("SCREEN_CHANGE", screenChange);

		if ( !document.location.hash ) {
			iris.navigate('#/apps');
		}

		function screenChange(screenPath){
			// unicorn.setup();
		}
	};

}, iris.path.welcome);