var qlog = require('../qlog.js')
;

module.exports = function (req, res, next){

	qlog.user.getByEmailAndPwd (
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
				req.pastry.data.uid = data.uid;
				res.writeHead(200);
				data.pwd = null;
				res.write( JSON.stringify(data) );
			}
			res.end();
		}
	);

}
