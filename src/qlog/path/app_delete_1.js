var qlog = require('../qlog.js')
;

module.exports = function (req, res, next){

	qlog.app.erase(
		req.params.appId
	, 
		function (err){
			if ( err ) {
				console.log( err );
				res.writeHead(500);
			}
			else {
				res.writeHead(200);
			}
			res.end();
		}
	);

};