﻿$(document).ready(function() {
	$("#create_group_btn").click(function() {
		layer_open('create_group_popup', 'layer');
		return false;
	});

	$("#create_group_ok_btn").click(function() {
		addRow();  //'groupname_data', 'groupinfo_data'
		gname_on_congrat_popup();
		layer_open('congrat_create', 'layer');
		return false;
	});

	$("#search_group_btn").click(function() {
		layer_open('search_group_popup', 'layer2');
		return false;
	});
	
	$(".del_group").click(function() {
		layer_open('group_delete_popup', 'layer3');
		return false;	
	});
	
	$("#delete_group_ok").click(function() {
		$("#my_group_list tr:last").remove();
		return false;	
	});
});

function layer_open(layer_id, higher_layer_class) {

	var popup_layer = $('#' + layer_id);
	var higher_layer_class = $('.' + higher_layer_class);
	var background = popup_layer.prev().hasClass('background');

	if (background) {
		higher_layer_class.fadeIn(); // 'background' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다.
	} else {
		popup_layer.fadeIn();
	}

	// 화면의 중앙에 레이어를 띄운다.
	if (popup_layer.outerHeight() < $(document).height())
		popup_layer.css('margin-top', '-' + popup_layer.outerHeight() / 2
				+ 'px');
	else
		popup_layer.css('top', '0px');
	if (popup_layer.outerWidth() < $(document).width())
		popup_layer.css('margin-left', '-' + popup_layer.outerWidth() / 2
				+ 'px');
	else
		popup_layer.css('left', '0px');

	popup_layer.find('a.cbtn').click(function(e) {
		if (background) {
			higher_layer_class.fadeOut(); // 'background' 클래스가 존재하면 레이어를 사라지게
			// 한다.
		} else {
			popup_layer.fadeOut();
		}
		e.preventDefault();
		
		window.location.reload(true); // close버튼을 누르면 페이지 초기화->나중에 통신할 때 서버로 값 넘겨주고 초기화할때 값 받아오게 하기
	});

	higher_layer_class.background.click(function(e) { // 배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
		higher_layer_class.fadeOut();
		e.preventDefault();
	});
}
function addRow() {
	var groupname = $('#groupname_data').val();
	var groupinfo = $('#groupinfo_data').val();
	var groupdel = $('#del_group > div');
	
	var new_row = "<tr><td>" + groupname + "</td><td>" + groupinfo + "</td><td>"+ groupdel +"</td></tr>";
	$("#my_group_list tr:last").after(new_row);
	$("#my_group_list tr:last td:first").addClass("group_name");
	$("#my_group_list tr:last td:nth-child(2)").addClass("group_info");
	$("#my_group_list tr:last td:last").addClass("del_group");
	
}
function gname_on_congrat_popup() {
	var groupname = $('#groupname_data').val();
	var message = "<p>Group name : ["+ groupname + "]</p>"
	
	$("#congrat_create .pop-container .pop-conts p").after(message);
}