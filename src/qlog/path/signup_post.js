var qlog = require('../qlog.js')
;

module.exports = function (req, res, next){

	qlog.user.signup( 
		req.body.e
	,	req.body.p 
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
				req.pastry.data.uid = data[0]._id;
				res.writeHead(200);
				res.write( '{"uid":"'+data[0]._id+'"}' );
			}
			res.end();
		}
	);
}
