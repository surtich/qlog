iris.screen(function(self) {

	self.create = function() {
		self.tmpl(iris.path.screens.user.html);

		self.ui("user_list", iris.path.ui.user.list.js);
		self.ui("user_edit", iris.path.ui.user.edit.js);

		self.get('btnCreate').click(onBtnCreate);
	};

	self.awake = function(){
		self.notify(iris.evts.screen.change, iris.path.screens.user);
	};

	function onBtnCreate(){
		self.notify(iris.evts.user.create);
	}

}, iris.path.screens.user.js);