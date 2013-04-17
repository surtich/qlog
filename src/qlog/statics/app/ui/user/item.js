iris.ui(function(self) {
	var _user = null;

	self.create = function() {
		self.tmplMode(self.APPEND);

		_user = self.setting('user');
		self.tmpl(iris.path.ui.user.item.html, _user);
		userChanged(_user);

		self.get('row').click(rowSelected);
		self.on(iris.evts.user.changed, userChanged);
		self.on(iris.evts.user.selected, userSelected);
	};

	function rowSelected(){
		self.notify(iris.evts.user.selected, _user);
	}

	function userChanged(user){
		if(_user.uid != user.uid) return;

		self.get('lblUid').html(user.uid);
		self.get('lblEmail').html(user.email);

		var adminIcon = 'icon-check-empty';
		if(user.admin) {
			adminIcon = 'icon-check';
		}
		self.get('icoAdmin').removeClass();
		self.get('icoAdmin').addClass(adminIcon);
		self.get('icoAdminSort').html(user.admin? '1':'0');

		var date = new Date( user.created );
		self.get('lblCreated').html(iris.date(date));
	}

	function userSelected(user){
		if(_user._id == user._id){
			self.get('row').addClass('info');
		} else {
			self.get('row').removeClass('info');
		}
	}

}, iris.path.ui.user.item.js);
