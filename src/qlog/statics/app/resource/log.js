iris.resource(
	function(self){

		self.getAll = function (params, f_ok, f_error) {
			return self.get('/app/'+params.app.clientId+'/log', function(logs){

				//Extracts all tags from received logs
				var tags = {};
				var l,L=logs.length, t,T, lbl;
				for(l=0; l<L; l++){
					T = logs[l].tags.length;
					for(t=0;t<T;t++){
						lbl = logs[l].tags[t];
						tags[lbl] = lbl;
					}
				}

				tags = $.map(tags, function(lbl){
					return lbl;
				});
				tags.sort();
				iris.notify(iris.evts.log.tag.changed, tags);

				f_ok(logs);
			}, f_error);
		};

	},

	iris.path.resource.log);
