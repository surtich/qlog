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

		var p = {
			e : $(self.get('txtEmail')).val(),
			p : $(self.get('txtPassword')).val()
		};

		iris.resource(iris.path.resource.user).signin(p.e, p.p, signInOk, signInKo);
	}

	function signInOk(p_data){
		self.notify(iris.evts.signin.ok, p_data);
		iris.navigate('#/app');
	}

	function signInKo(p_data){
		iris.log('signin', p_data);
	}

}, iris.path.screens.signin.js);