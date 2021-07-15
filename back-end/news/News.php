<?php

session_start();
include_once('../db/NewsDB.php');

class News {

    function __construct() {
        $this->db = new NewsDB();
    }

    function getAll($categories) {

        if (count($categories) == 0) {
            return json_encode(array(
                'result' => 500,
                'message' => 'You need to provide one category or more'
            ));
        }

        return $this->db->getAllNewsPreview($categories);

    }

    function getNewsContent($news_id) {
        return $this->db->selectByID($news_id);
    }

    function post($postInfo)
    {

        $postInfo['id'] = $_SESSION['id'];
        
    	return $this->db->insert($postInfo);
        
    }

}

?>