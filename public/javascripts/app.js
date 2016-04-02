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
// bên trên là jquery cho phần login cho đẹp

// user data( template )
//var user = jQuery.parseJSON( ""+document.getElementById('userinfo').value );
//$("#avatar").attr("src", user.avatar );
//console.log("Userinfor: " + document.getElementById('userinfo').value);
//$("#username").html( user.name );