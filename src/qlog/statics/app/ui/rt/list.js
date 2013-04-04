iris.ui(function(self) {
	var _app = null;

	self.create = function() {
		self.tmpl(iris.path.ui.rt.list.html);

		// self.on(iris.evts.log.tag.selected, tagSelected);
	};

	self.awake = function() {
	};

	function drawItems(p_items){
		var dt = $(self.get('dtLogList')).dataTable();
		dt.fnDestroy();

		self.destroyUIs('container');
		var i, I = p_items.length;
		for(i = 0; i<I; i++){
			self.ui('container', iris.path.ui.log.item.js, {log: p_items[i]});
		}
		self.get('lblCount').html(I);

		upgradeDatatable();
		$(self.get('dtLogList')).dataTable().fnSort([[0,'desc']]);

		self.get('icon').removeClass('icon-spin');
	}

	function upgradeDatatable(){
		$(self.get('dtLogList')).dataTable({
			"bJQueryUI": true,
			"sPaginationType": "two_button", // "full_numbers"
			"sDom": '<""l>t<"F"fp>',
			aLengthMenu: [ 5, 10 ],
			iDisplayLength : 5,
			bAutoWidth : false,
			aoColumnDefs: [
				{ "asSorting": [ "desc", "asc" ], "aTargets": [ 0 ] }
			]
			//bLengthChange : false
		});

		$('input[type=checkbox],input[type=radio],input[type=file]').uniform();

		$('select').select2();

		$("span.icon input:checkbox, th input:checkbox").click(function() {
			var checkedStatus = this.checked;
			var checkbox = $(this).parents('.widget-box').find('tr td:first-child input:checkbox');
			checkbox.each(function() {
				this.checked = checkedStatus;
				if (checkedStatus == this.checked) {
					$(this).closest('.checker > span').removeClass('checked');
				}
				if (this.checked) {
					$(this).closest('.checker > span').addClass('checked');
				}
			});
		});
	}

	function tagSelected(tag){
		var dt = $(self.get('dtLogList')).dataTable();
		dt.fnFilter(tag.lbl, 2);
	}

}, iris.path.ui.rt.list.js);
