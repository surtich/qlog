iris.ui(function(self) {
	var _log = null;

	self.create = function() {
		self.tmplMode(self.APPEND);

		_log = self.setting('log');

		_log.msgPretty = '<li>' + _log.msg.split('\n').join('</li><li>') + '</li>';
		_log.tagsPretty = '<span class="label label-info">' + _log.tags.split(',').join('</span>&nbsp;<span class="label label-info">') + '</span>';

		self.tmpl(iris.path.ui.rt.item.html, _log);

		self.get('row').click(rowSelected);
		self.on(iris.evts.apps.changed, appChanged);
	};

	function rowSelected(){
		self.notify(iris.evts.rt.selected, _log);
	}

	function appChanged(app){
		if(_log.appId != app.appId) return;

		self.get('lblName').html(app.name);
		self.get('lblClientId').html(app.clientId);
	}

}, iris.path.ui.rt.item.js);
