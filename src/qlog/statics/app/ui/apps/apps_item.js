iris.ui(function(self) {
	var _app = null;

	self.create = function() {
		self.tmplMode(self.APPEND);

		_app = self.setting('app');

		self.tmpl(iris.path.ui_apps_item_tmpl, _app);

		self.get('row').click(rowSelected);
		self.on(iris.evts.apps.changed, appChanged);
	};

	function rowSelected(){
		self.notify(iris.evts.apps.selected, _app);
	}

	function appChanged(app){
		if(_app.appId != app.appId) return;

		self.get('lblName').html(app.name);
		self.get('lblClientId').html(app.clientId);
	}

}, iris.path.ui_apps_item);
