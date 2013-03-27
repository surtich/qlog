iris.ui(function(self) {
	var _app = null;

	self.create = function() {
		self.tmplMode(self.APPEND);

		_app = self.setting('app');

		self.tmpl(iris.path.ui.app.item.html, _app);

		self.get('row').click(rowSelected);
		self.on(iris.evts.apps.changed, appChanged);
		self.on(iris.evts.apps.selected, appSelected);
	};

	function rowSelected(){
		self.notify(iris.evts.apps.selected, _app);
	}

	function appChanged(app){
		if(_app.appId != app.appId) return;

		self.get('lblName').html(app.name);
		self.get('lblClientId').html(app.clientId);
		self.get('lblCallback').html(app.callback);
	}

	function appSelected(app){
		if(_app.appId == app.appId){
			self.get('row').addClass('info');
		} else {
			self.get('row').removeClass('info');
		}
	}

}, iris.path.ui.app.item.js);
