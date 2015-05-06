<?
	require_once "config.php";
	require_once (SiteData::$warp_sync.'view.php');
	require_once (SiteData::$warp_sync.'controls.php');
	require_once (SiteData::$warp_sync.'model.php');
	require_once (SiteData::$warp_sync.'tools.php');
	require_once (SiteData::$lib.'pages.php');
	require_once (SiteData::$lib.'calls.php');
	require_once (SiteData::$lib.'item.php');
	require_once (SiteData::$lib.'company.php');
	
	$user = User::getInstance();
	$user->upd_session_array();
	
	$route = explode('/', trim($_SERVER['REQUEST_URI'], '/'));
	$view = new View();
	$view->generate_page($route);
	
	$db = new DB();
?>