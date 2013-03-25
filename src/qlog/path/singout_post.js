
module.exports = function (req, res, next){

	req.pastry.invalidate();
	res.writeHead(200);
	res.end( {} );

}
