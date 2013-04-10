iris.screen(function(self) {

	self.create = function() {
		self.tmpl(iris.path.screens.signin.html);

		self.get('btnSend').click(onBtnSend);
	};

	self.awake = function(){
		self.notify('SCREEN_CHANGE', iris.path.screens.signin);
	};

	function onBtnSend(e){
		e.preventDefault();

		self.get('iconSubtitle').addClass('icon-spin');
		self.get('iconSignin').addClass('icon-spin');

		var p = {
			e : $(self.get('txtEmail')).val(),
			p : $(self.get('txtPassword')).val()
		};

		$(self.get('txtEmail')).val('');
		$(self.get('txtPassword')).val('');

		iris.resource(iris.path.resource.user).signin(p.e, p.p, signInOk, signInKo);
	}

	function signInOk(p_data){
		self.notify(iris.evts.signin.ok, p_data);
		iris.navigate('#/app');
		self.get('iconSubtitle').removeClass('icon-spin');
		self.get('iconSignin').removeClass('icon-spin');
	}

	function signInKo(p_data){
		iris.log('signin', p_data);
		self.get('iconSubtitle').removeClass('icon-spin');
		self.get('iconSignin').removeClass('icon-spin');
	}

}, iris.path.screens.signin.js);