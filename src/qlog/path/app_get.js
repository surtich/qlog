/**___ DO NOT MODIFY. AUTOMATICALLY GENERATED BY RESTRUC FROM I/O Docs.

	Synopsis	: Gets all apps from an user
	Method		: GET
	Path		: /app

	Num Params		: 1

	req.headers.Cookie			: The pastry.sid of the connected user ( example: pastry.sid=d416fc67-07c6-406b-a393-c86fd54ee361 )

END OF AUTOMATICALLY GENERATED BY RESTRUC.___*/

var qlog = require('../qlog.js')
;

module.exports = function (req, res, next){

	qlog.app.getByUser ( 
		req.pastry.data.uid
	, 
		function (err, data){
			if ( err ) {
				console.log( err );
				res.writeHead(500);
				res.end();
			}
			else {
				res.writeHead(200);
				res.end( JSON.stringify(data) );
			}
		}
	);

};
