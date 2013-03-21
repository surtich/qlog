

module.exports = function (p_req, p_res, f_next){

	qlog.singin (
		p_req
	, 
		function (err, p_cookies){
			if ( err ){
				p_res.writeHead(401);
			}
			else {
				p_res.writeHead(200, p_cookies);
			}
			p_res.end( {} );
		}
	);

}