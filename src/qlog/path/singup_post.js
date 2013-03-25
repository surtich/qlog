
module.exports = function (req, res, next){

	qlog.user.create( 
		{ "email" : req.body.e
		, "pwd"   : req.body.p 
		}
	,
		function (err){
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
