iris.ui(function(self) {

	self.create = function() {
		self.tmpl(iris.path.ui_apps_log_tmpl);
	};


	self.awake = function() {
		iris.resource(iris.path.service_apps).getAll(drawItems);
	};

	function drawItems(p_items){
		var i, I = p_items.length;
		for(i = 0; i<I; i++){
			self.ui('appsContainer', iris.path.ui_apps_log_item, {app: p_items[i]});
		}
		self.get('lblAppsCount').html(I);

		upgradeDatatable();
	}

	function upgradeDatatable(){
		$(self.get('data-table')).dataTable({
			"bJQueryUI": true,
			"sPaginationType": "two_button", // "full_numbers"
			"sDom": '<""l>t<"F"fp>',
			aLengthMenu: [ 5, 10 ],
			iDisplayLength : 5
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

}, iris.path.ui_apps_log);
