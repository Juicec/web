<?

	require_once "config.php";
	require_once (SiteData::$warp_sync.'view.php');
	require_once (SiteData::$lib.'pages.php');
	
	$route = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
	$view = new View();
	$view->generate_page($route[0]);
	//var_dump(get_class_methods('Pages'));
	//$page->$route[0]();
	
?>