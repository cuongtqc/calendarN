// function hệ thống
//alert('TEST');
	var differ = function( date1 , date2 ) {
		var one_day = 1000*60*60*24;
		var date1_ms = date1.getTime();
		var date2_ms = date2.getTime();
		var difference_ms = date2_ms - date1_ms;
		return Math.round( difference_ms / one_day ); 
	};
	
	var getTaskListWithDate = function( currentDate ) {
		$("#task-list").empty();
		if(task != null){
			for(i = 0; i<task.length; i++) {
				var from = task[i].deadline.split( '-' );
				var day = new Date();
				if (from[0].length==4) day = new Date( from[0], from[1] - 1, from[2] );	
				if (from[2].length==4) day = new Date( from[2], from[1] - 1, from[0] );	
				var x = differ( currentDate , day );
				console.log( currentDate );
				if ( x <= 0 ) continue;
				if ( x > 3 ) x = 3; temp = (x+1) * 25;
				var htmlData = '<li class="task-item" style="list-style-type: none;" title="Click on this to manage this task.">' + 
					'<div class="progress" onclick="showtool('+i+')">' + 
						'<div class="progress-bar progress-bar-info progress-bar-striped active" style="width:' + temp + '%" value="' + differ( currentDate, day ) + '">' +
							task[i].content + 
						'</div>' + 
						'</div>' +	
							'<div id="'+i+'" hidden>'+
								'<div class="btn" id="cancelformshow'+i+'" onclick="formshow(\'formshow'+i+'\')">Edit</div>'+
								'<a class="btn "href="/del/'+i+'" >Delete</a>'+
							'</div>'+
							'<div id="formshow'+i+'" hidden>'+
								'<h2>Edit</h2>'+
								'<form class="task-edit-form" method="post" action="/edit/'+i+'" role="form" style="display: block;">'+
								'<div class="form-group">'+
								'<input type="text" name="task_name" tabindex="1" placeholder="Task\'s name" class="form-control"/>'+
							'</div>'+
							'<div class="form-group">'+
								'<input type="date" name="task_deadline" tabindex="2" placeholder="Task\'s deadline" class="form-control deadline-edit"/>'+
							'</div>'+
							'<div class="form-group">'+
								'<input type="submit" name="task-submit" tabindex="3" value="Submit" class=" btn "/>'+
							'</div>'+
						'</form>'+
					'</div>'+
				'</li>';
				$("#task-list").append( htmlData );
			};
		}
	};

	var getString = function( date ) {
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		return day + '/' + month + '/' + year;
	};

	var setDayText = function( date ) {
		var dayPlus = 24 * 60 * 60 * 1000;	
		if ( differ( date, new Date() ) == 0 ) {
			$("#today").html( "Today" );
		}
		else {
			$("#today").html( getString(new Date(date)) );
		}
		$("#day1").html( getString(new Date(date.getTime()+dayPlus)) );
		$("#day2").html( getString(new Date(date.getTime()+2*dayPlus)) );
		$("#day3").html( getString(new Date(date.getTime()+3*dayPlus)) );
	}
	
	$( document ).ready(function() {
		var date = new Date();
		var dayPlus = 24 * 60 * 60 * 1000;
		setDayText( date );
		$("#selectDay").attr( "value", getString( date ) );
		var toDay = new Date(); toDay.setHours( 0 , 0 , 0 , 0 );
		getTaskListWithDate( toDay );
	});
		
	// user là JSON object
	// userinfo sẽ được thêm ngay trong jade không cần bind từ đây vì chỉ cần lấy sess.user là lấy được thông tin cá nhân rồi
	
	// khi nào get được json thì chạy đống dưới đây

	// task data( template )
	// task là JSON array chứa các task và deadline
	var userinfo = jQuery.parseJSON( $("#userinfo").text() );
	var task = jQuery.parseJSON( $("#userinfo").text() ).task;
	var avatarcode = jQuery.parseJSON( $("#userinfo").text() ).avatar;
	$("#userinfo").text('');
	if(avatarcode) $('#avatar').attr('src', "data:image/png;base64, "+avatarcode);
	
	// select day function sẽ được thêm sau, bây giờ cứ làm màu đã :v
	$("#btn-select").click( function() {
		var from = $("#selectDay").val().split( '-' );
		console.log( from );
		if (from[0].length==4) day = new Date( from[0], from[1] - 1, from[2] );	
		if (from[2].length==4) day = new Date( from[2], from[1] - 1, from[0] );	
		// var day = new Date( from[0], from[1] - 1, from[2] );	
		console.log( day );
		getTaskListWithDate( day );
		setDayText( day );
	})
	
	$("#task-deadline").pickadate({
		today: '',
		clear: '',
		close: 'Cancel',
		min: 1
	});
	$(".deadline-edit").pickadate({
		today: '',
		clear: '',
		close: 'Cancel',
		min: 1
	});
	$("#selectDay").pickadate({
		today: 'Today',
		clear: '',
		close: 'Cancel',
		min: true
	});
	function showtool(id){
		$('#'+id).toggle(100);
	}
	var formshowvar = true;
	function formshow(id){
		$('#'+id).toggle(100);
		if (formshowvar) {
			$('#cancel'+id).text('Cancel');	
			formshowvar =false;
		} else {
			$('#cancel'+id).text('Edit');	
			formshowvar =true;
		}
		
	}
	var show = true;
	$('#registerbox').click(function(e) {
			if (show) {
				$('#registername').show(200);
				$('#registerimage').show(200);
				$('#login-submit').attr('value','Register');
				show = false;
				$('#login-form').attr('action', '/register');
			} else {
				$('#registername').hide(150);
				$('#registerimage').hide(150);
				$('#login-submit').attr('value','Login');
				show =true;
				$('#login-form').attr('action', '/login');
			}

	});
	
	function sortI(){	
			var items = $("#task-list li").get();
			items.sort( function( a , b ) {
				var keyA = $(a).children(".progress").children().attr( "value" );
				var keyB = $(b).children(".progress").children().attr( "value" );
				if ( keyA < keyB ) return -1;
				if ( keyA > keyB ) return 1;
				return 0;
			});
			var ul = $('#task-list');
			$.each(items, function(i, li){
				ul.append(li);
			});
	}
	function logout(){
		window.location.href = '/logout';
	}
	//Trung added new function
	function add(){
		window.location.href = '/add';
	}
	function edit(id){
		window.location.href = '/edit/'+id;
	}
	function del(id){
		window.location.href = '/del/'+id;
	}
	var handleFileSelect = function(evt) {
	    var files = evt.target.files;
	    var file = files[0];
	    
	    if (files && file) {
	        var reader = new FileReader();

	        reader.onload = function(readerEvt) {
	            var binaryString = readerEvt.target.result;
	            document.getElementById("base64textarea").value = btoa(binaryString);
	        };

	        reader.readAsBinaryString(file);
	    }
	};

	if (window.File && window.FileReader && window.FileList && window.Blob) {
	    if(document.getElementById('filePicker')) document.getElementById('filePicker').addEventListener('change', handleFileSelect, false);
	} else {
	    alert('The File APIs are not fully supported in this browser.');
	}