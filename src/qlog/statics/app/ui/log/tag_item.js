iris.ui(function(self) {
	var _tag = null;

	self.create = function(container, p_params) {
		self.tmplMode(self.APPEND);

		_tag = p_params;

		self.tmpl(iris.path.ui.log.tag_item.html, _tag);

		self.get('tag').click(onClick);
		self.on(iris.evts.log.tag.selected, tagsSelected);
	};

	function onClick(){
		self.notify(iris.evts.log.tag.selected, _tag);
	}

	function tagsSelected(tag){
		if(tag.lbl == _tag.lbl){
			self.get('tag').addClass('label-success');
			self.get('tag').removeClass('label-info');
		} else {
			self.get('tag').addClass('label-info');
			self.get('tag').removeClass('label-success');
		}
	}

}, iris.path.ui.log.tag_item.js);
