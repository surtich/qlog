iris.screen(function(self) {
	self.create = function() {
		self.tmpl(iris.path.welcome_tmpl);

		self.screens('screens',
			[
				[ 'app', iris.path.screens.app.js]
			]
			);

		self.ui("header", iris.path.ui.header.js);
		self.ui("sidebar", iris.path.ui.sidebar.js);

		self.on("SCREEN_CHANGE", screenChange);

		if ( !document.location.hash ) {
			iris.navigate('#/app');
		}

		function screenChange(screenPath){
			// unicorn.setup();
		}
	};

}, iris.path.welcome);