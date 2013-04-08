iris.ui(function(self) {

	var prevValues = {};
	var _app = null;

	self.create = function() {
		self.tmpl(iris.path.ui.app.edit.html);

		//Setup interactions
		setup('Name');
		setup('Callback');

		self.get('btnSecretKey').click(resetSecretKey);
		self.get('btnDelete').click(deleteApp);

		$(self.get('btnDelete')).tooltip();

		self.on(iris.evts.apps.selected, appSelected);
		self.on(iris.evts.apps.create, appCreate);
		self.on(iris.evts.screen.change, function(){self.get('root').hide();});
	};

	function setup(p_txt){
		//Edit click
		self.get('btn'+p_txt).click(function(){
			edit(p_txt);
		});

		//Save click
		self.get('save'+p_txt).click(function(){
			save(p_txt);
		});

		//Cancel click
		self.get('cancel'+p_txt).click(function(){
			cancel(p_txt);
		});
	}

	function show(p_txt){
		self.get('lbl'+p_txt).hide();
		self.get('cnt'+p_txt).show();
		self.get('save'+p_txt).show();
		self.get('refresh'+p_txt).hide();
	}

	function hide(p_txt){
		self.get('lbl'+p_txt).show();
		self.get('cnt'+p_txt).hide();
		self.get('refresh'+p_txt).hide();
	}

	function edit(p_txt){
		show(p_txt);
		prevValues[p_txt] = self.get('txt'+p_txt).val();
		self.get('txt'+p_txt).select();
	}

	function cancel(p_txt){
		hide(p_txt);
		self.get('txt'+p_txt).val(prevValues[p_txt]);
	}

	function save(p_txt){
		self.get('lbl'+p_txt).html(self.get('txt'+p_txt).val());
		self.get('refresh'+p_txt).show();
		self.get('save'+p_txt).hide();
		saveApp(p_txt);
	}

	// ---------------
	// Save App
	// ---------------

	function saveApp(p_txt){
		_app.name = self.get('txtName').val();
		_app.callback = self.get('txtCallback').val();

		iris.resource(iris.path.resource.app).save(
			_app._id,
			_app.name,
			_app.callback,
			function(){saveAppOk(p_txt);},
			function(){saveAppKo(p_txt);}
		);
	}

	function saveAppOk(p_txt){
		hide(p_txt);
		self.notify(iris.evts.apps.changed, _app);
	}

	function saveAppKo(p_txt){
		hide(p_txt);
	}

	function appSelected(app){
		_app = app;
		self.get('lblClientId').html(app.clientId);
		self.get('lblSecretKey').html(app.secretKey);
		self.get('lblName').html(app.name);
		self.get('txtName').val(app.name);
		self.get('lblCallback').html(app.callback);
		self.get('txtCallback').val(app.callback);

		self.get('btnSecretKey').show();
		self.get('btnName').show();
		self.get('btnCallback').show();

		prevValues['Name'] = _app.name;
		prevValues['Callback'] = _app.callback;

		self.get('root').show();
	}

	function appCreate(){
		self.get('root').hide();
	}

	// ----------------
	// Reset Secret Key
	// ----------------

	function resetSecretKey(){
		self.get('btnSecretKey').addClass('icon-spin');
		bootbox.confirm('Are you sure you want to regenerate the Secret Key for app "'+ _app.name +'"?', function(p_confirm){
			if(p_confirm){
				iris.resource(iris.path.resource.app).resetSecretKey(_app._id,resetSecretKeyOk,resetSecretKeyKo);
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

	// ----------------
	// Reset Secret Key
	// ----------------
	function deleteApp(){
		self.get('btnDelete').addClass('icon-spin');
		bootbox.confirm('Are you sure you want to delete the app "'+ _app.name +'"?', function(p_confirm){
			if(p_confirm){
				iris.resource(iris.path.resource.app).remove(_app._id, deleteAppOk, deleteAppKo);
			} else {
				self.get('btnDelete').removeClass('icon-spin');
			}
		});
	}

	function deleteAppOk(){
		self.notify(iris.evts.apps.deleted);
		self.get('btnDelete').removeClass('icon-spin');
		self.get('root').hide();
	}

	function deleteAppKo(){
		self.get('btnDelete').removeClass('icon-spin');
	}

}, iris.path.ui.app.edit.js);
