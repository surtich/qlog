
module.exports = function (req, res, next){

	qlog.user.get(
		{ 'uid' : req.pastry.data.uid
		, 'page'  : req.params('p')
		, 'count' : req.params('c')
		}
	,
		function (err, data){
			if ( err ) {
				console.log(err);
				res.writeHead(500, err);
				res.end( {} );
			}
			else {
				res.writeHead(200);
				res.end( data );
			}
		}
	);

}
