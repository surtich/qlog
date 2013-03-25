
module.exports = function (req, res, next){

	qlog.auth.create (
		{ 'uid'  	: req.pastry.data.uid
		, 'appName' : req.body.an
		}
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
