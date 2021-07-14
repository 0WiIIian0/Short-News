<?php

session_start();
include_once('../db/NewsDB.php');

class News {

    function __construct() {
        $this->db = new NewsDB();
    }

    function getAll($categories) {

        if (count($categories) == 0) {
            return false;
        }

        $whereClause = '';

        foreach ($categories as $category) {
            $whereClause += 'category = $category or';
        }

        $whereClause = substr($whereClause, 0, strlen($whereClause) - 3);

        $this->db->select($whereClause);

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