var qlog = require('../qlog.js');

module.exports = function (req, res, next){

	if(req.pastry.data.uid === undefined){
		res.writeHead(401);
		res.write('');
		res.end();
		return;
	}

	qlog.user.getUserById( 
		req.pastry.data.uid
	,
		function (err, data){
			if ( err || data === null ) {
console.log('user_me_get', err, data);
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
