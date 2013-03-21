var commons = require("../../lib/commons.js")
,	express = commons.express
,	async	= commons.async
,	hero	= commons.hero
,	monitor	= require("./monitor.js")
,	app		= express()
;

app.configure(
	function() {
		app.use( express.bodyParser() );
		app.use( app.router );
		app.use(
			express.errorHandler(
				{	dumpExceptions 	: true
				,	showStack 		: true
				}
			)
		);
	}
);

hero.init(
	require("./paths.js").paths
,
	function (){
		app.listen( hero.port() );
		console.log('listening on port '+hero.port());
	}
);
