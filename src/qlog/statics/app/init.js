iris.path = {
	welcome : 'app/screen/welcome.js',
	welcome_tmpl : 'app/screen/welcome.html',

	screens : {
		app : { js:'app/screen/app.js', html:'app/screen/app.html'}
	},

	ui : {
		header : {js:'app/ui/header.js', html:'app/ui/header.html'},
		sidebar : {js:'app/ui/sidebar.js', html:'app/ui/sidebar.html'},
		app : {
			list : { js:'app/ui/app/list.js' , html:'app/ui/app/list.html'},
			edit : { js:'app/ui/app/edit.js' , html:'app/ui/app/edit.html'},
			item : { js:'app/ui/app/item.js' , html:'app/ui/app/item.html'}
		},
		log : {
			list : { js:'app/ui/log/list.js' , html:'app/ui/log/list.html'},
			item : { js:'app/ui/log/item.js' , html:'app/ui/log/item.html'},
			tags : { js:'app/ui/log/tags.js' , html:'app/ui/log/tags.html'},
			tag_item : { js:'app/ui/log/tag_item.js' , html:'app/ui/log/tag_item.html'}
		}
	},

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
	},
	log : {
		selected : "LOG_SELECTED",
		tag : {
			changed : "LOG_TAG_CHANGED",
			selected : "LOG_TAG_SELECTED",
			unselected : "LOG_TAG_UNSELECTED"
		}
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
