<?php

include_once('./NewsDB.php');

date_default_timezone_set('UTC');

$newsDB = new NewsDB();

$reactions = json_encode(array(
    'likes' => 10,
    'dislikes' => 50
));

$content = json_encode(
    array(
        'title' => 'test',
        'content' => 'let me see'
    )
);

/*  $user_id,
    $title,
    $subtitle,
    $content,
    $category,
    $reactions,
    $post_date */

$newsDB->insert(
    10,
    "Test News",
    "News description",
    $content,
    1,
    $reactions
);

?>