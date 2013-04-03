iris.path = {
	welcome : 'app/screen/welcome.js',
	welcome_tmpl : 'app/screen/welcome.html',

	screens : {
		app : { js:'app/screen/app.js', html:'app/screen/app.html'},
		user : { js:'app/screen/user.js', html:'app/screen/user.html'},
		signin : { js:'app/screen/signin.js', html:'app/screen/signin.html'}
	},

	ui : {
		header : {js:'app/ui/header.js', html:'app/ui/header.html'},
		sidebar : {js:'app/ui/sidebar.js', html:'app/ui/sidebar.html'},
		app : {
			list : { js:'app/ui/app/list.js' , html:'app/ui/app/list.html'},
			edit : { js:'app/ui/app/edit.js' , html:'app/ui/app/edit.html'},
			item : { js:'app/ui/app/item.js' , html:'app/ui/app/item.html'},
			create : { js:'app/ui/app/create.js' , html:'app/ui/app/create.html'}
		},
		log : {
			list : { js:'app/ui/log/list.js' , html:'app/ui/log/list.html'},
			item : { js:'app/ui/log/item.js' , html:'app/ui/log/item.html'},
			tags : { js:'app/ui/log/tags.js' , html:'app/ui/log/tags.html'},
			tag_item : { js:'app/ui/log/tag_item.js' , html:'app/ui/log/tag_item.html'}
		},
		user : {
			list : { js:'app/ui/user/list.js' , html:'app/ui/user/list.html'},
			item : { js:'app/ui/user/item.js' , html:'app/ui/user/item.html'},
			create : { js:'app/ui/user/create.js' , html:'app/ui/user/create.html'},
			edit : { js:'app/ui/user/edit.js' , html:'app/ui/user/edit.html'}
		}
	},

	resource : {
		user : "app/resource/user.js",
		app : "app/resource/app.js",
		log : "app/resource/log.js",
		validation : "app/resource/validation.js"
	}
};

iris.evts = {
	screen : {
		change : 'SCREEN_CHANGE'
	},
	signin : {
		ok : "SIGNIN_OK",
		ko : "SIGNIN_KO",
		out: "SIGNIN_OUT"
	},
	apps : {
		selected : "APP_SELECTED",
		changed : "APP_CHANGED",
		create : "APP_CREATE",
		created : "APP_CREATED",
		deleted : "APP_DELETED"
	},
	log : {
		selected : "LOG_SELECTED",
		tag : {
			changed : "LOG_TAG_CHANGED",
			selected : "LOG_TAG_SELECTED",
			unselected : "LOG_TAG_UNSELECTED"
		}
	},
	user : {
		selected : "USER_SELECTED",
		changed : "USER_CHANGED",
		create : "USER_CREATE",
		created : "USER_CREATED"
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
				dateFormat: 'd M Y H:i:s',
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
