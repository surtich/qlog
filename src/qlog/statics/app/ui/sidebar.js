iris.ui(function(self) {

	self.create = function() {
		self.tmpl(iris.path.ui.sidebar.html);

		self.on("SCREEN_CHANGE", screenChange);
	};

	function screenChange(screenPath){
		$(self.get('liApp')).removeClass('active');
		$(self.get('liUser')).removeClass('active');

		switch(screenPath){
			case iris.path.screens.app:
				$(self.get('liApp')).addClass('active');
				break;
			case iris.path.screens.user:
				$(self.get('liUser')).addClass('active');
				break;
		}
	}

}, iris.path.ui.sidebar.js);