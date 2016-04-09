// function hệ thống
$(document).ready(function(){
	
	$(function() {

	    $('#login-form-link').click(function(e) {
			$("#login-form").delay(100).fadeIn(100);
	 		$("#register-form").fadeOut(100);
			$('#register-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});
		
		$('#register-form-link').click(function(e) {
			$("#register-form").delay(100).fadeIn(100);
	 		$("#login-form").fadeOut(100);
			$('#login-form-link').removeClass('active');
			$(this).addClass('active');
			e.preventDefault();
		});

	});



	var differ = function( date1 , date2 ) {
		var one_day = 1000*60*60*24;
		var date1_ms = date1.getTime();
		var date2_ms = date2.getTime();
		var difference_ms = date2_ms - date1_ms;
		return Math.round( difference_ms / one_day ); 
	};
	//alert('TEST' + $("#userinfo").text());
	// user data( template )
	// user là JSON object
	// userinfo sẽ được thêm ngay trong jade không cần bind từ đây vì chỉ cần lấy sess.user là lấy được thông tin cá nhân rồi
	
	// khi nào get được json thì chạy đống dưới đây

	// task data( template )
	// task là JSON array chứa các task và deadline
	var task = jQuery.parseJSON( $("#userinfo").text() ).task;
	
	// select day function sẽ được thêm sau, bây giờ cứ làm màu đã :v
	$("#taskList").empty();
	var toDay = new Date(); toDay.setHours( 0 , 0 , 0 , 0 );
	alert(JSON.stringify(task));
	for(i = 0; i<task.length; i++) {
		var from = task[i].deadline.split( '-' );
		var day = null;
		if (from[2].length==4) day = new Date( from[2], from[1] - 1, from[0] );
		if (from[2].length==2) day = new Date( from[0], from[1] - 1, from[2] );
		var x = differ( toDay , day );
		alert(JSON.stringify(toDay)+ ' X = '+ JSON.stringify(day) +'==' +x);
		if ( x > 3 ) x = 3; temp = (x) * 25;
		var htmlData = '<div class="task-item">' + 
					'<div class="progress">' + 
						'<div class="progress-bar progress-bar-info progress-bar-striped active" style="width:' + temp + '%">' + 
							task[i].content +
						'</div>' + 
					'</div>' +
			'</div>';
		alert('TEST' + htmlData);
		$("#taskList").append( htmlData );
	};

	// đến đây là hết cái đống get json rồi


	$("#task-deadline").pickadate({
		today: '',
		clear: '',
		close: 'Cancel',
		min: 1
	});

	//Cuong them function
	
});
	function logout(){
		window.location = 'http://localhost:3000/logout';
	}
	//Trung added new function
	function add(){
		window.location = 'http://localhost:3000/add';
	}
	function edit(){
		window.location = 'http://localhost:3000/edit';
	}