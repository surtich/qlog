iris.ui(function(self) {

	var prevValues = {};
	var _app = null;

	self.create = function() {
		self.tmpl(iris.path.ui.app.create.html);

		self.get('btnSave').click(save);
		self.get('btnCancel').click(cancel);

		self.on(iris.evts.apps.selected, appSelected);
		self.on(iris.evts.apps.create, appCreate);
		self.on(iris.evts.screen.change, function(){self.get('root').hide();});
	};

	function cancel(){
		self.get('root').hide();
	}

	function save(){
		saveApp();
	}

	// ---------------
	// Save App
	// ---------------

	function saveApp(){
		var app = {
			name : self.get('txtName').val(),
			callback : self.get('txtCallback').val()
		};

		iris.resource(iris.path.resource.app).create(app.name, app.callback, saveAppOk, saveAppKo);
	}

	function reset(){
		self.get('txtName').val('');
		self.get('txtCallback').val('');
		self.get('root').hide();		
	}

	function saveAppOk(p_txt){
		reset();
		self.notify(iris.evts.apps.created);
	}

	function saveAppKo(p_txt){
		reset();
	}

	function appSelected(app){
		reset();
	}

	function appCreate(){
		self.get('root').show();
	}

	// ----------------
	// Reset Secret Key
	// ----------------

	function resetSecretKey(){
		self.get('btnSecretKey').addClass('icon-spin');
		bootbox.confirm('Are you sure you want to regenerate the Secret Key for app "'+ _app.name +'"?', function(p_confirm){
			if(p_confirm){
				iris.resource(iris.path.resource.app).resetSecretKey({app:_app},resetSecretKeyOk,resetSecretKeyKo);
			} else {
				self.get('btnSecretKey').removeClass('icon-spin');
			}
		});
	}

	function resetSecretKeyOk(p_data){
		_app.secretKey = p_data.secretKey;
		self.notify(iris.evts.apps.changed, _app);
		appSelected(_app);

		self.get('btnSecretKey').removeClass('icon-spin');
	}

	function resetSecretKeyKo(){
		self.get('btnSecretKey').removeClass('icon-spin');
	}

}, iris.path.ui.app.create.js);
