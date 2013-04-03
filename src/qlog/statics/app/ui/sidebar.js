iris.ui(function(self) {

	self.create = function() {
		self.tmpl(iris.path.ui.sidebar.html);

		self.on(iris.evts.screen.change, screenChange);
		self.on(iris.evts.signin.ok, onSignOk);
		self.on(iris.RESOURCE_ERROR, resourceError);

		self.get('liSignout').click(signout);
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

	function onSignOk(user){
		self.get('liApp').show();
		self.get('liSignout').show();
		if(user.admin) {
			self.get('liUser').show();
		}
	}

	function resourceError(p_params){
		if(p_params.request.status == 401){
			hideAll();
		}
	}

	function hideAll(){
		self.get('liApp').hide();
		self.get('liUser').hide();
		self.get('liSignout').hide();
	}

	function signout(){
		iris.resource(iris.path.resource.user).signout(signoutOk);
	}

	function signoutOk(){
		console.log('signed out');
		iris.navigate('#/signin');
		hideAll();
	}

}, iris.path.ui.sidebar.js);
