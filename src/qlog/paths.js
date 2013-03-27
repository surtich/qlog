exports.paths = [

	{ 	"method"  	: "GET"
	, 	"path"		: "/oauth" 
	, 	"handler" 	: require("./path/oauth_get.js")
	}
,
	{ 	"method"  	: "GET"
	, 	"path"		: "/app" 
	, 	"handler" 	: require("./path/app_get.js")
	}
,
	{ 	"method"  	: "PUT"
	, 	"path"		: "/app" 
	, 	"handler" 	: require("./path/app_put.js")
	}
,
	{ 	"method"  	: "POST"
	, 	"path"		: "/signup" 
	, 	"handler" 	: require("./path/signup_post.js")
	}
,
	{ 	"method"  	: "POST"
	, 	"path"		: "/signin" 
	, 	"handler" 	: require("./path/signin_post.js")
	}
,
	{ 	"method"  	: "POST"
	, 	"path"		: "/signout" 
	, 	"handler" 	: require("./path/signout_post.js")
	}
,
	{ 	"method"  	: "GET"
	, 	"path"		: "/log" 
	, 	"handler" 	: require("./path/log_get.js")
	}
,
	{ 	"method"  	: "PUT"
	, 	"path"		: "/log" 
	, 	"handler" 	: require("./path/log_put.js")
	}
,
	{ 	"method"  	: "GET"
	, 	"path"		: "/user" 
	, 	"handler" 	: require("./path/user_get.js")
	}
]