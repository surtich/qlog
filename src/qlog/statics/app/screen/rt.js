iris.screen(function(self) {

	self.create = function() {
		self.tmpl(iris.path.screens.rt.html);

		// self.ui("log_list", iris.path.ui.rt.list.js);
	};

	self.awake = function(){
		self.notify(iris.evts.screen.change, iris.path.screens.rt);

		skbk.config({
			container : 'skbk-container',
			align : 'right',
			fMessageReceived : function(msg){
				iris.log('push message', msg);
			}
		});
	};

}, iris.path.screens.rt.js);