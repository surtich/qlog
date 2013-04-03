iris.ui(function(self) {

	var _user = null;

	self.create = function() {
		self.tmpl(iris.path.ui.user.edit.html);

		self.get('btnPassword').click(resetPassword);

		self.on(iris.evts.user.selected, userSelected);
		self.on(iris.evts.screen.change, function(){self.get('root').hide();});
	};

	function userSelected(user){
		iris.log('user selected', user);
		_user = user;
		self.get('lblEmail').html(_user.email);
		self.get('lblPassword').html(_user.password);
		self.get('root').show();
	}

	// ----------------
	//  Reset Password
	// ----------------

	function resetPassword(){
		self.get('btnPassword').addClass('icon-spin');
		bootbox.confirm('Are you sure you want to regenerate password for user "'+ _user.email +'"?', function(p_confirm){
			if(p_confirm){
				self.get('lblPassword').html(generatepass(8));
				// iris.resource(iris.path.resource.app).resetSecretKey(_app._id,resetPasswordOk,resetPasswordKo);
			} else {
				self.get('btnPassword').removeClass('icon-spin');
			}
		});
	}

	function resetPasswordOk(p_data){
		self.get('btnSecretKey').removeClass('icon-spin');
	}

	function resetPasswordKo(){
		self.get('lblPassword').html('--');
		self.get('btnSecretKey').removeClass('icon-spin');
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


}, iris.path.ui.user.edit.js);
