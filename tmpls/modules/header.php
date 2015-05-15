<?
	$tmp = explode('?', $_SERVER['REQUEST_URI']);
	$global_page = str_replace('/', '', $tmp[0]);
?>

<html>
<head>
	<link rel="stylesheet" href="css/style.css" />
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
	<script src="js/dist/js/flux_bundle.js"></script>
</head>
<body class="<? echo $global_page.'_page'; ?>">
	<script type="text/javascript">
		var global_page = "<? echo $global_page; ?>" ;
    </script>

	<div id="main-flux">
	</div>
	<div id="main_body">