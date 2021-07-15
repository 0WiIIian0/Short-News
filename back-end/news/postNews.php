<?php

	include_once('News.php');
    
    $news = new News();

	$title =  @$_POST['title'];
	$subtitle =  @$_POST['subtitle'];
	$cover =  @$_POST['cover'];
	$content =  @$_POST['content'];
	$category =  @$_POST['category'];

	echo $news->post(array(
		'title' => $title,
		'subtitle' => $subtitle,
		'cover' => $cover,
		'content' => $content,
		'category' => $category
	));

?>