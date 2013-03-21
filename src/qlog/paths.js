exports.paths = [

	{ 	"method"  	: "GET"
	, 	"path"		: "/auth" 
	, 	"handler" 	: require("./path/auth.js")
	}
,
	{ 	"method"  	: "POST"
	, 	"path"		: "/singup" 
	, 	"handler" 	: require("./path/singup.js")
	}
,
	{ 	"method"  	: "POST"
	, 	"path"		: "/login" 
	, 	"handler" 	: require("./path/login.js")
	}
,
	{ 	"method"  	: "POST"
	, 	"path"		: "/logout" 
	, 	"handler" 	: require("./path/logut.js")
	}
,
	{ 	"method"  	: "GET"
	, 	"path"		: "/log" 
	, 	"handler" 	: require(["./filter/user.js","./path/log.js"])
	}
,
	{ 	"method"  	: "GET"
	, 	"path"		: "/settings" 
	, 	"handler" 	: require(["./filter/user.js","./path/settings.js"])
	}
,
	{ 	"method"  	: "GET"
	, 	"path"		: "/admin/list" 
	, 	"handler" 	: require(["./filter/admin.js","./path/admin/client_list.js"])
	}
,
	{ 	"method"  	: "GET"
	, 	"path"		: "/admin/"
	, 	"handler" 	: require(["./filter/admin.js","./path/admin/client_list.js"])
	}
,
	{ 	"method"  	: "POST"
	, 	"path"		: "/log" 
	, 	"handler" 	: require(["./filter/session.js", "./path/log.js"])
	}
]