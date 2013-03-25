var commons = require("../lib/commons.js")
,   assert  = commons.assert
,	async	= commons.async
,	hero	= commons.hero
,	qlog	= require("../qlog/qlog.js")
;

var user = 'user';
var pwd  = '123456';

var adminUsr = 'admin';
var adminPwd = '123456';

var appName = 'test'

var logMsg  = 'this message is a test'
var logTags = 'test,qlog'

describe('QLog testing'
, 	function(){

		before(
			function (done){

				qlog.ready(
					function (err){
						if(err) {
							hero.error(err);
						}
						else {
							hero.app.listen( hero.port() );
							done();
						}
					}
				);

			}
		);

	  	beforeEach( 
		  	function(done){
		  		monitor.resetDB(
					function(err) {
						if(err){
							hero.error('mongoDB reset fails!', err);
						}
						else {
							done(err, 'monitor mongoDB reset success');
						}
					}
				);
			}
	  	);

		describe('#Saving and getting data from MongoDB'
	  	, 	function(){

	    		it('save a trace and get it by user'
	    		, 	function(done){

						async.series(
							[
								function(callback){
									monitor.save(
										testUser, testDesc, testSender
									, 	function (err){
											callback(null, 'save');
										}
									);
								}
							,
								function(callback){
									monitor.getByUser(
										testUser
									,	function (err, obj){
											assert.equal(testUser	, obj.user);
											assert.equal(testDesc	, obj.desc);
											assert.equal(testSender	, obj.sender);
											callback(null, 'getByUser');
										}
									);
								}
							]
							,
							function(err, results){
								done();
							}
						);

	    			}
	    		);

	    		it('save three traces, twice with the same sender and find by sender returning only two'
	    		, 	function(done) {

						async.series(
							[
								function(callback){
									monitor.save(
										testUser, testDesc+' 1 ', testSender
										, 	function (err){
											callback(null, 'save1');
										}
									);
								}
								,
								function(callback){
									monitor.save(
										testUser, testDesc, 'other_sender'
										, 	function (err){
											callback(null, 'save2');
										}
									);
								}
								,
								function(callback){
									monitor.save(
										testUser, testDesc+' 2 ', testSender
										, 	function (err){
											callback(null, 'save2');
										}
									);
								}
								,
								function(callback){
									monitor.findBySender(
										testSender
										,	function (err, docs){
											assert.equal(docs.length, 2);
											for ( var f= 0, F=docs.length; f<F; f++ ){
												assert.equal(testSender, docs[f].sender);
											}
											callback(null, 'findBySender');
										}
									);
								}
							]
							,
							function(err, results){
								done();
							}
						);

					}
				);

	  		}
	  	);

		var mqMessage = {'msg' : 'writing message at '+(new Date()).getTime() };

		describe(
			'#Sending and getting tasks with RabbitMQ'
	  	, 	
	  		function(){

	    		it('sending data to RabbitMQ'
	    		, 	function(done){
						sokobank.mq.monitor( mqMessage );
						done();
	    			}
	    		);
	    	}
	    );


	}

);
