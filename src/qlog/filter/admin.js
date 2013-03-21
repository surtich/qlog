var qlog = require('../../../lib/commons').qlog

;


module.exports = function (p_req, p_res, f_next){
	var cookies = qlog.getCookies( p_req.cookies )

	;

	qlog.getUserSession( cookies[ qlog.LABEL_ADMIN_COOKIE ] )

}
