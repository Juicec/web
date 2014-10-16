<?

	require_once "config.php";
	require_once (SiteData::$warp_sync.'view.php');
	require_once (SiteData::$warp_sync.'controls.php');
	require_once (SiteData::$lib.'pages.php');
	
	$user = new User();
	$user->upd_session_array();
	
	$route = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
	$view = new View();
	$view->generate_page($route[0]);
	
?>