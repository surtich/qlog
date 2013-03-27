iris.resource(
	function(self){

		self.getAll = function (params, success) {
			var logs = [];

			var tagsRandom = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ullamcorper est ut ante consectetur hendrerit. Suspendisse ornare feugiat tortor, egestas auctor nibh condimentum vitae. Sed suscipit ornare ante at sollicitudin. Donec vel sapien a quam fermentum varius id vel turpis. Fusce est massa, varius nec porta nec, convallis sed lectus. Curabitur lacus nulla, facilisis id commodo id, sagittis eu tellus. Duis ut quam nunc, ut consectetur ligula. Curabitur in dolor eu nisl dapibus viverra.';
			tagsRandom = tagsRandom.replace('.','');
			tagsRandom = tagsRandom.split(' ');

			var i,I = Math.floor(Math.random() * 300);
			for(i=1; i<I; i++){

				var tagsGen = tagsRandom[Math.floor(Math.random() * tagsRandom.length)] + ',' + tagsRandom[Math.floor(Math.random() * tagsRandom.length)];

				var log = {
					logId : String(75298374598753057 * i).substring(0,16),
					appId : params.app.clientId,
					msg : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ullamcorper est ut ante consectetur hendrerit. Suspendisse ornare feugiat tortor, egestas auctor nibh condimentum vitae. Sed suscipit ornare ante at sollicitudin. Donec vel sapien a quam fermentum varius id vel turpis. Fusce est massa, varius nec porta nec, convallis sed lectus. Curabitur lacus nulla, facilisis id commodo id, sagittis eu tellus. Duis ut quam nunc, ut consectetur ligula. Curabitur in dolor eu nisl dapibus viverra. Ut a neque a justo scelerisque vehicula id ac diam.\nUt sed suscipit tortor. Praesent nibh nibh, sagittis vitae interdum in, sodales quis tellus. Etiam lobortis, dui cursus pretium tincidunt, lectus leo imperdiet risus, at auctor arcu ligula eget ligula. Aliquam leo ante, condimentum a placerat imperdiet, fringilla et tortor. Vestibulum nibh ipsum, imperdiet a consequat quis, gravida sed urna. Ut ut orci pellentesque est iaculis fringilla. Nam lorem quam, blandit at gravida scelerisque, feugiat vel dui. Phasellus ac ligula urna.\nIn lobortis, lorem at eleifend auctor, lacus tellus ultrices odio, sit amet ornare ipsum purus vitae odio. Morbi tincidunt, augue nec adipiscing consequat, nibh libero ullamcorper neque, in euismod erat libero eu lorem. Vivamus fringilla massa sit amet urna vestibulum a rhoncus nulla sagittis. Fusce vulputate tellus vitae eros varius sollicitudin. Vivamus non enim dolor. Donec volutpat venenatis molestie. Pellentesque quis tortor non metus varius pulvinar at in justo. Proin dolor ligula, placerat quis aliquet pulvinar, faucibus ut neque. Etiam tristique interdum venenatis. Donec turpis risus, ultrices at scelerisque sit amet, rhoncus ac orci.\nUt vestibulum elit sit amet felis sollicitudin porta. Nulla egestas pellentesque lacus, non lobortis tellus aliquam vel. Donec lectus felis, lacinia a tincidunt vitae, mattis sit amet felis. Aliquam porta sodales ligula a cursus. Suspendisse eu eros lacinia lacus posuere fringilla vel mollis dolor. Nunc a tortor metus, at lobortis tellus. Praesent pharetra dapibus ligula at fringilla. Mauris ligula sem, molestie in lacinia ac, varius vel augue. Quisque a diam erat, nec placerat nisi.\nAliquam ac odio ac tortor scelerisque faucibus. Nullam a vehicula enim. Donec risus nunc, elementum blandit accumsan eu, rutrum eu leo. Praesent ornare feugiat arcu. Pellentesque placerat tortor ipsum. Vivamus imperdiet consectetur massa, et rutrum mi pulvinar ac. Maecenas eget tellus ac lorem interdum dapibus non in nibh. Nunc nec elit arcu, id facilisis lorem. Vestibulum at neque sapien, sit amet consectetur orci. Nunc a nisl sed tortor sodales hendrerit. Proin suscipit varius elementum. Ut pharetra imperdiet eros sit amet sollicitudin. In scelerisque vestibulum porttitor. Curabitur dui felis, mattis vel interdum sagittis, eleifend adipiscing magna.',
					time : (new Date()).getTime(),
					tags : tagsGen,
					created : (new Date()).getTime()
				};

				logs.push(log);
			}


			success(logs);

			var tags = {};
			var l,L=logs.length, t,T, lbl;
			for(l=0; l<L; l++){
				var split = logs[l].tags.split(',');
				T = split.length;
				for(t=0;t<T;t++){
					lbl = split[t];
					tags[lbl] = lbl;
				}
			}

			tags = $.map(tags, function(lbl){
				return lbl;
			});
			tags.sort();
			iris.notify(iris.evts.log.tag.changed, tags);
		};

	},

	iris.path.resource.log);
