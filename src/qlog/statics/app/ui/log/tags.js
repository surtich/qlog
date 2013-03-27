iris.ui(function(self) {

	var prevValues = {};
	var _log = null;

	self.create = function() {
		self.tmpl(iris.path.ui.log.tags.html);

		self.on(iris.evts.log.tag.changed, tagsChanged);
	};

	function tagsChanged(tags){
		self.destroyUIs('tagContainer');
		var i,I=tags.length;
		for(i=0;i<I;i++){
			self.ui('tagContainer', iris.path.ui.log.tag_item.js, {lbl:tags[i]});
		}
	}

}, iris.path.ui.log.tags.js);
