
module.exports = function (req, res, next){

	qlog.user.getByUserAndPwd (
		{'usr' : req.body.u
		,'pwd' : req.body.p
		}
	, 
		function (err, data){
			if ( err ) {
				console.log( err );
				res.writeHead(500);
			}
			else if ( !data ) {
					res.writeHead(401);
			}
			else {
				req.pastry.data.uid = data.uid;
				res.writeHead(200);
			}
			res.end( {} );
		}
	);

}
