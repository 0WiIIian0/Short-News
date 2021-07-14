<?php

	include_once('News.php');
    
    $db = new News();

	$title =  @$_POST['title'];
	$subtitle =  @$_POST['subtitle'];
	$content =  @$_POST['content'];
	$category =  @$_POST['category'];

	echo $db->post($title,$subtitle,$content,$category);

?>