<?php

	include_once("../db/connectDB.php");

	$my_DB = new DB();	

	$pdo = $my_DB->pdo;

	$sql = " insert into users	
			(user, email, pass) 
			values 
			(:username,:email,:password)";

	$cmd = $pdo->prepare($sql);

	$username           = $_POST['username'];           
	$email              = $_POST['email'];
	$password           = $_POST['password'];


	$cmd->bindValue(":username" , $username);                   
	$cmd->bindValue(":email"    , md5($email)); 
	$cmd->bindValue(":password" , password_hash($password,PASSWORD_DEFAULT));

	$cmd->execute();
	header("Location: ../../web");

?>