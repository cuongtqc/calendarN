// function hệ thống
 //var jsdom = require('jsdom').jsdom;
 //var document = jsdom('<html></html>', {});
 //var window = document.defaultView;
 //var $ = require('jquery')(window);
 
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
}

// user data( template )
// user là JSON object
//{ "name": "John", "avatar": "img/avatar.jpg"}
var user = jQuery.parseJSON( $("userinfo").text());
$("#avatar").attr("src", sess.user.avatar );
$("#username").html( user.name );


// task data( template )
// task là JSON array chứa các task và deadline
var data = user.task;
console.log( data );

function test(){
	console.log('Test call js function');
}
// khi nào get được json thì chạy đống dưới đây
// select day function sẽ được thêm sau, bây giờ cứ làm màu đã :v
$("#task-list").empty();
var toDay = new Date(); toDay.setHours( 0 , 0 , 0 , 0 );
$.each( data, function( i, item ) {
	var from = item.deadline.split( '-' );
	var day = new Date( from[2], from[1] - 1, from[0] );
	var x = differ( toDay , day );
	if ( x > 3 ) x = 3; x *= 25;
	var htmlData = '<li class="task-item">' + 
			'<div class="progress">' + 
				'<div class="progress-bar progress-bar-info progress-bar-striped active" style="width:' + x + '%">' +
					item.content + 
				'</div>' + 
			'</div>' 
		'</li>';
	$("#task-list").append( htmlData );
})

// đến đây là hết cái đống get json rồi


$("#task-deadline").pickadate({
	today: '',
	clear: '',
	close: 'Cancel',
	min: 1
})

//Cuong them function
function logout(){
	window.location = 'http://localhost:3000/logout';
}

//module.exports = {foo: test};