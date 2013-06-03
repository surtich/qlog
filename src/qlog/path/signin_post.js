/**___ DO NOT MODIFY. AUTOMATICALLY GENERATED BY RESTRUC FROM I/O Docs.

	Synopsis	: Connects an user to QLog
	Method		: POST
	Path		: /signin

	Num Params		: 2

	req.body.e			: user email
	req.body.p			: user password

END OF AUTOMATICALLY GENERATED BY RESTRUC.___*/

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
				req.pastry.data.uid = data._id;
				if(data.admin === true){
					req.pastry.data.isAdmin = true;
				}

				res.writeHead(200);
				delete data.pwd;
				res.write( JSON.stringify(data) );
			}
			res.end();
		}
	);

}
