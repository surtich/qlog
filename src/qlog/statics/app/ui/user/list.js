iris.ui(function(self) {
	var _app = null;

	self.create = function() {
		self.tmpl(iris.path.ui.user.list.html);
		upgradeDatatable();

		self.on(iris.evts.user.created, refreshItems);
	};

	self.awake = function() {
		refreshItems();
	};

	function refreshItems(){
		iris.resource(iris.path.resource.user).getAll(drawItems);
	}

	function drawItems(p_items){
		var dt = $(self.get('dtUserList')).dataTable();
		dt.fnDestroy();

		self.destroyUIs('container');
		var i, I = p_items.length;
		for(i = 0; i<I; i++){
			self.ui('container', iris.path.ui.user.item.js, {user: p_items[i]});
		}
		self.get('lblCount').html(I);

		upgradeDatatable();
		$(self.get('dtUserList')).dataTable().fnSort([[0,'desc']]);

		self.get('icon').removeClass('icon-spin');
	}

	function upgradeDatatable(){
		$(self.get('dtUserList')).dataTable({
			"bJQueryUI": true,
			"sPaginationType": "two_button", // "full_numbers"
			"sDom": '<""l>t<"F"fp>',
			aLengthMenu: [ 10, 25 ],
			iDisplayLength : 10,
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

}, iris.path.ui.user.list.js);
