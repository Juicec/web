<html>
<head>
	<link rel="stylesheet" href="css/style.css" />
	<script src="js/dist/js/flux_bundle.js"></script>
</head>
<body>
	<div id="head_menu">
		<div class="head_col">
			<div class="web_logo">task's book</div>
		</div>
		<div class="user_name">
			<span class="text_user_name">
				<div class="full_menu_icon"></div>
				Vladimir Frolov
				<div class="user_menu">
					<ul>
						<li class="edit_profile_btn">edit profile</li>
						<li>my tasks</li>
					</ul>
				</div>
			</span>
		</div>
		<div class="head_col">
			<div class="search_block">
				<input placeholder="Some text" class="search_input" type="text">
			</div>
		</div>
	</div>
	<div id="full_menu">
		<div class="profile_info">
			<div class="user_img"><img src="img/ava.png"><div class="edit_profile"><div class="edit_photo_text">Edit<br/>photo</div></div></div>
			<div class="profile_col">
				<div class="profile_user name">
					<span>First name</span> 
					<input type='text' id="user_first_name" value="Vladimir">
				</div>
				<div class="profile_user name">
					<span>Last name</span> 
					<input type='text' id="user_last_name" value="Frolov">
				</div>
			</div>
			<div class="profile_col">
				<div class="profile_user email">
					<span>Email</span> 
					<input type='email' id="user_email" value="frolad@gmail.com">
				</div>
				<div class="profile_user email">
					<span>City</span> 
					<input type='text' id="user_city" value="Moscow">
				</div>
			</div>
			<div class="profile_col">
				<div class="profile_user password">
					<span>Enter new password</span> 
					<input type='password' id="user_password" value="">
				</div>
				<div class="profile_user password">
					<span>Confirm new password</span> 
					<input type='password' id="user_conf_password" value="">
				</div>
			</div>
			<div class="profile_col">
				<div class="profile_user">
				</div>
				<div class="profile_user save_new">
					<input type='button' id="save_new_profile" value="Save">
				</div>
			</div>
			<div class="colse_profile_info"></div>
		</div>
	</div>
	<script type="text/javascript">
		var global_page = "<? echo str_replace('/', '', $_SERVER['REQUEST_URI']); ?>" ;
    </script>

	<div id="main-flux">
	</div>
	<div id="main_body">