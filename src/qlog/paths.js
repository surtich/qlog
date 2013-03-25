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
	, 	"path"		: "/singup" 
	, 	"handler" 	: require("./path/singup_post.js")
	}
,
	{ 	"method"  	: "POST"
	, 	"path"		: "/singin" 
	, 	"handler" 	: require("./path/singin_post.js")
	}
,
	{ 	"method"  	: "POST"
	, 	"path"		: "/singout" 
	, 	"handler" 	: require("./path/singout_post.js")
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