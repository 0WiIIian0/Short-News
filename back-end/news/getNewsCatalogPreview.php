<?php

include_once('./News.php');

$categories = $_POST['categories'];
$categories = json_decode($categories);

$news = new News();

echo $news->getAll($categories);


?>