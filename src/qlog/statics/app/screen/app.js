iris.screen(function(self) {

	self.create = function() {
		self.tmpl(iris.path.screens.app.html);

		self.ui("apps_list", iris.path.ui.app.list.js);
		self.ui("apps_edit", iris.path.ui.app.edit.js);
		self.ui("apps_create", iris.path.ui.app.create.js);
		self.ui("log_list", iris.path.ui.log.list.js);
		self.ui("log_tags", iris.path.ui.log.tags.js);

		self.get('btnCreate').click(appCreate);

		self.on(iris.evts.apps.selected, function(){self.get('logsTitle').show();});
		self.on(iris.evts.screen.change, function(){self.get('logsTitle').hide();});
	};

	self.awake = function(){
		self.notify(iris.evts.screen.change, iris.path.screens.app);
	};

	function appCreate(){
		self.notify(iris.evts.apps.create);
	}

}, iris.path.screens.app.js);