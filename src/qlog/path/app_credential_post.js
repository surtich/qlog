var qlog = require('../qlog.js')
;

module.exports = function (req, res, next){

	qlog.app.getByClientId(
		req.params.appId
	, function(err, data){
		if(data.secretKey === req.body.p){
			qlog.rabbitMan.createCredential(
				req.params.appId
			, 	req.body.p
			, 	'/'
			, 	qlog.config.mq.log.host + (qlog.config.mq.log.port ? ":" + qlog.config.mq.log.port : "")
			, function (err, data){
				if ( err ) {
					console.log( err );
					res.writeHead(500);
					res.end();
				}
				else {
					res.writeHead(200);
					res.end( JSON.stringify( data ) );
				}
			});
		} else {
			res.writeHead(403);
			res.end();
		}
	});
};