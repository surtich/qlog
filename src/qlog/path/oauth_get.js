

module.exports = function (req, res, next){

	qlog.oauth.getAccessToken (
		{'clientId'  : req.body.cid
		,'secretKey' : req.body.sk
		,'authCode'  : req.body.ac
		}
	, 
		function (err, data){
			if ( err ) {
				console.log( err );
				res.writeHead(500);
				res.end( {} );
			}
			else if ( !data ) {
				res.writeHead(401);
				res.end( {} );
			}
			else {
				res.writeHead(200);
				res.end( data );
			}
		}
	);

}

