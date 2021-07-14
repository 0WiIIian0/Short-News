<?php

class DB {

	function __construct() {
		$this->connect();
	}

	function connect() {
		try {	
			$this->pdo = new PDO("mysql:host=localhost;dbname=shortnews","root",""); 
		} catch(PDOException $e) {
			die('Failed to connect to local database.');
		}
	}

}

?>