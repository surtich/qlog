iris.path = {
	welcome : 'app/screen/welcome.js',
	welcome_tmpl : 'app/screen/welcome.html',

	apps : 'app/screen/apps.js',
	apps_tmpl : 'app/screen/apps.html',

	ui_header : 'app/ui/header.js',
	ui_header_tmpl : 'app/ui/header.html',
	ui_sidebar : 'app/ui/sidebar.js',
	ui_sidebar_tmpl : 'app/ui/sidebar.html',

	ui_apps_list : 'app/ui/apps/apps_list.js',
	ui_apps_list_tmpl : 'app/ui/apps/apps_list.html',
	ui_apps_edit : 'app/ui/apps/apps_edit.js',
	ui_apps_edit_tmpl : 'app/ui/apps/apps_edit.html',
	ui_apps_item : 'app/ui/apps/apps_item.js',
	ui_apps_item_tmpl : 'app/ui/apps/apps_item.html',
	ui_apps_log : 'app/ui/apps/apps_log.js',
	ui_apps_log_tmpl : 'app/ui/apps/apps_log.html',
	ui_apps_log_item : 'app/ui/apps/apps_log_item.js',
	ui_apps_log_item_tmpl : 'app/ui/apps/apps_log_item.html',

	resource : {
		user : "app/resource/user.js",
		app : "app/resource/app.js",
		log : "app/resource/log.js"
	}
};

iris.evts = {
	apps : {
		selected : "APP_SELECTED",
		changed : "APP_CHANGED"
	}
};

function _hostContains () {
	for(var i = 0 ; i< arguments.length; i++) {
		if ( document.location.host.indexOf(arguments[i]) > -1 ) {
			return true;
		}
	}
	return false;
}

var _local = _hostContains('local');
iris.servicepaths = {
	apps : _local ? 'http://localhost' :  'http://qlog.skbk.es'
};

$(document).ready(
	function () {
		iris.translations('en-US', './app/lang/en-us.js');

		iris.baseUri('./');

		iris.locale(
			'en-US', {
				dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				dateFormat: 'dd M yy H:i:s',
				currency: {
					formatPos: 'n',
					formatNeg: '-n',
					decimal: '.',
					thousand: ',',
					precision: 2
				}
			}
			);

		iris.welcome(iris.path.welcome);
	}
);
