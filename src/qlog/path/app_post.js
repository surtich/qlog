
module.exports = function (req, res, next){

	qlog.app.update(
		req.body.appId
	, 	req.body.n
	, 	req.body.cb
	, 
		function (err, data){
			if ( err ) {
				console.log( err );
				res.writeHead(500);
			}
			else {
				res.writeHead(200);
			}
			res.end( {} );
		}
	);

}
