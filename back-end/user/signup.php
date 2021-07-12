<?php

	session_start();
		
	include_once("../db/UserDB.php");
	
	$userDB = new UserDB();

	$name = $_POST['name'];
	$email = $_POST['email'];
	$password = $_POST['pass'];
	
	echo $userDB->insert(
		$name,
		$email,
		$password
	);

?>