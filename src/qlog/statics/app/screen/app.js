iris.screen(function(self) {

	self.create = function() {
		self.tmpl(iris.path.screens.app.html);

		self.ui("apps_list", iris.path.ui.app.list.js);
		self.ui("apps_edit", iris.path.ui.app.edit.js);
		self.ui("log_list", iris.path.ui.log.list.js);
	};

	self.awake = function(){
		self.notify("SCREEN_CHANGE", iris.path.apps);
	};

}, iris.path.screens.app.js);