
module.exports = function (req, res, next){

	// json payload -> { 'msg' : 'An error occurs', 'tags' : 'pro,dev,chrome,ff,iOS,...', 'ts':1234567890 }

	qlog.log.save (
		{ 'msg'  : req.body.msg
		, 'tags' : req.body.tags
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
