iris.screen(function(self) {

	self.create = function() {
		self.tmpl(iris.path.apps_tmpl);

		self.ui("apps_list", iris.path.ui_apps_list);
		self.ui("apps_edit", iris.path.ui_apps_edit);
		self.ui("apps_log", iris.path.ui_apps_log);
	};

	self.awake = function(){
		self.notify("SCREEN_CHANGE", iris.path.apps);
	};

}, iris.path.apps);