iris.screen(function(self) {

	self.create = function() {
		self.tmpl(iris.path.screens.user.html);

		self.ui("users_list", iris.path.ui.user.list.js);
	};

	self.awake = function(){
		self.notify("SCREEN_CHANGE", iris.path.screens.user);
	};

}, iris.path.screens.user.js);