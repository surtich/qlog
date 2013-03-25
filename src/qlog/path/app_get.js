
module.exports = function (req, res, next){

	qlog.auth.list (
		{'uid'  : req.pastry.data.uid
		}
	, 
		function (err, data){
			if ( err ) {
				console.log( err );
				res.writeHead(500);
				res.end( {} );
			}
			else {
				res.writeHead(200);
				res.end( data );
			}
		}
	);

}
