iris.ui(function(self) {

	self.create = function() {
		self.tmpl(iris.path.ui_sidebar_tmpl);

		self.on("SCREEN_CHANGE", screenChange);
	};

	function screenChange(screenPath){
		$(self.get('liApps')).removeClass('active');
		$(self.get('liUsers')).removeClass('active');

		switch(screenPath){
			case iris.path.apps:
				$(self.get('liApps')).addClass('active');
				break;
		}
	}

}, iris.path.ui_sidebar);