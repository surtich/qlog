var qlog = require('../qlog.js')
;

module.exports = function (req, res, next){

	if(req.pastry.data.uid === undefined || !req.pastry.data.isAdmin){
		console.log( req.pastry.data );
		res.writeHead(401);
		res.write('');
		res.end();
		return;
	}

	qlog.user.getUsers(
		{
			// 'uid' : req.pastry.data.uid,
			// 'page'  : req.params('p'),
			// 'count' : req.params('c')
		},

		function (err, data){
			if ( err ) {
				console.log(err);
				res.writeHead(500);
				res.write( JSON.stringify(err) );
			}
			else {
				res.writeHead(200);
				res.write( JSON.stringify(data) );
			}
			res.end();
		}
	);

};
