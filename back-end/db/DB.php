<?php

class DB {

	private $pdo;

	function __construct() {

		try {	
			$this->pdo = new PDO("mysql:host=localhost;dbname=cloudnotes","root",""); 
		} catch(PDOException $e) {
			die('Failed to connect to local database.');
		}

	}

}

?>