iris.ui(function(self) {

	var prevValues = {};
	var _user = null;

	self.create = function() {
		self.tmpl(iris.path.ui.user.create.html);

		self.get('btnPassword').click(resetPassword);
		self.get('btnSave').click(saveUser);
		self.get('btnCancel').click(cancel);

		self.on(iris.evts.user.create, userCreate);
		self.on(iris.evts.screen.change, function(){self.get('root').hide();});
	};

	function cancel(){
		self.get('root').hide();
	}

	function save(){
		saveUser();
	}

	// ---------------
	// Save User
	// ---------------
	function saveUser(){
		var user = {
			e : self.get('txtEmail').val(),
			p : self.get('lblPassword').html()
		};

		var bValid = true;
		if(!iris.resource(iris.path.resource.validation).isEmail(user.e)){
			self.get('gEmail').addClass('error');
			self.get('errorEmail').show();
			bValid = false;
		}

		if(bValid){
			iris.resource(iris.path.resource.user).signup(user.e, user.p, saveUserOk, saveUserKo);
		}
	}

	function reset(){
		self.get('txtEmail').val('');
		self.get('lblPassword').html('--');
		self.get('root').hide();
	}

	function saveUserOk(){
		reset();
		self.notify(iris.evts.user.created);
	}

	function saveUserKo(){
		reset();
	}

	function userCreate(){
		self.get('gEmail').removeClass('error');
		self.get('errorEmail').hide();

		self.get('root').show();
		resetPassword();
	}

	function resetPassword(e){
		if(e){
			e.preventDefault();
		}

		self.get('lblPassword').html(generatepass(8));
	}

	// ---------------------
	// Random Pass generator
	// ---------------------
	var keylist="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ123456789";

	function generatepass(plength){
		var temp='';
		for (i=0;i<plength;i++){
			temp+=keylist.charAt(Math.floor(Math.random()*keylist.length));
		}
		return temp;
	}


}, iris.path.ui.user.create.js);
