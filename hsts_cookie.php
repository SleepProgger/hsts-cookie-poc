<?php
//header('Access-Control-Allow-Origin: *');
$is_ssl = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443;

if(isset($_GET['SET'])){
	if($is_ssl){
		header('Strict-Transport-Security: max-age=31536000');
	}else{
		$redirect = "https://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
		header("HTTP/1.1 301 Moved Permanently");
		header("Location: $redirect");
	}
	die();
}

if(isset($_GET['DEL'])){
	if($is_ssl){
		header('Strict-Transport-Security: max-age=0');
	}else{
		$redirect = "https://".$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
		header("HTTP/1.1 301 Moved Permanently");
		header("Location: $redirect");
	}
	die();
}

if($is_ssl){
	header('Content-type: image/png');
	readfile('track.png');
	die();
}else{
	header('X-PHP-Response-Code: 404', true, 404);
}
?>
