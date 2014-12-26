$(document).ready(function(){
	$('.edit_profile_btn').click(function(){
		$('#full_menu').slideToggle(300);
	});

	$('.colse_profile_info').click(function(){
		$('#full_menu').slideUp(300);
	});
	
	$('.text_user_name').hover(function(){
		$('.user_menu').toggle();
	});
});
