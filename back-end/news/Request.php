<?php

	include_once('News.php');
    
    $db = new NewsDB();

	$title =  @$_POST['title'];
	$subtitle =  @$_POST['subtitle'];
	$content =  @$_POST['content'];
	$category =  @$_POST['category'];

	$db->post($title,$subtitle,$content,$category);




?>