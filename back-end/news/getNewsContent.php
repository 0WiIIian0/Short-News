<?php

include_once("./News.php");

$news_id = $_POST['id'];

$news = new News();

echo $news->getNewsContent($news_id);

?>