var qlog = require('../qlog.js')
;

module.exports = function (req, res, next){

	if ( !req.pastry.data.uid ) {
		res.writeHead(401);
		res.end();
	}
	else {
		qlog.log.getByApp(
			req.params.appId
		,
			{ 'uid' : req.pastry.data.uid
			// , 'page'  : req.params('p')
			// , 'count' : req.params('c')
			}
		,
			function (err, data){
				if ( err ) {
					res.writeHead(500, err);
					res.end();
				}
				else {
					res.writeHead(200);
					res.end(JSON.stringify(data));
				}
			}
		);
	}

}
