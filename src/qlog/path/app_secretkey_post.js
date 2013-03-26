
module.exports = function (req, res, next){

	qlog.app.refreshSecretKey(
		req.body.appId
	, 
		function (err, data){
			if ( err ) {
				console.log( err );
				res.writeHead(500);
				res.end( {} );
			}
			else {
				res.writeHead(200);
				res.end( { secretKey : data.secretKey } );
			}
		}
	);

}
