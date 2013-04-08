var qlog = require('../qlog.js')
;

module.exports = function (req, res, next){

	// json payload -> { 'msg' : 'An error occurs', 'tags' : 'pro,dev,chrome,ff,iOS,...', 'time':1234567890, secretKey:'...' }

	qlog.app.getByClientId(req.params.appId, function(err, data){
		if(data === null){
			res.writeHead(400);
			res.end('Bad request');
		} else {
			if(data.secretKey === req.body.secretKey){
				var tags = req.body.tags;
				if(tags === undefined || tags === null) {
					tags = '';
				}

				qlog.log.create(req.params.appId, req.body.msg, req.body.time, tags, function (err, data){
					if ( err ) {
						console.log( err );
						res.writeHead(500);
					}
					else {
						res.writeHead(200);
					}
					res.end('');
				});
			} else {
				res.writeHead(401);
				res.end('Unauthorized');
			}
		}
	});
};
