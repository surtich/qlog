var commons = require("../lib/commons.js")
,	express = commons.express
,	async	= commons.async
,	hero	= commons.hero
,	qlog	= require("./qlog.js")
;

qlog.ready(
	function (){
		hero.app.listen( hero.port() );
		console.log('listening on port '+hero.port());
	}
);
