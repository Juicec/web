<?

	require_once "config.php";
	require_once (SiteData::$warp_sync.'view.php');
	require_once (SiteData::$warp_sync.'controls.php');
	require_once (SiteData::$warp_sync.'model.php');
	require_once (SiteData::$warp_sync.'tools.php');
	require_once (SiteData::$lib.'pages.php');
	require_once (SiteData::$lib.'calls.php');
	
	$user = new User();
	$user->upd_session_array();
	$user->auth_user('frolad@gmail.coma','378378378');
	//$user->make_new_user('frolad@gmail.coma','378378378');
	
	$route = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
	$view = new View();
	$view->generate_page($route);
	
	$db = new DB();
	
?>