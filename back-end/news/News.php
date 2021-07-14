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

        return $this->db->select($categories);

    }

    function post($title,$subtitle,$content,$category)
    {

    	return $this->db->insert(
            $_SESSION['id'],
            $title,
            $subtitle,
            $content,
            $category
        );
    }

}

?>