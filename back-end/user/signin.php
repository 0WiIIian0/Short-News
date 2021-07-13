<?php

	session_start();

	include_once("../db/UserDB.php");
	
	$userDB = new UserDB();
	
	$email = $_POST['email'];
	$password = $_POST['pass'];

	$userInfo = $userDB->select($email);

	if (!$userInfo) {

		echo json_encode(
			array(
				'result' => 401,
				'message' => 'User does not exist'
			)
		);

	} else {

		if (password_verify($password, $userInfo['pass'])) {
		    
            $_SESSION['id']   = $userInfo['id'];
		    $_SESSION['name'] = $userInfo['name'];
		    $_SESSION['can_post_news'] = $userInfo['can_post_news'];

			echo json_encode(
				array(
					'result' => 200,
					'username' => $userInfo['name'],
					'canPostNews' => $userInfo['can_post_news']
				)
			);
	
		} else {
	
			echo json_encode(
				array(
					'result' => 401,
					'message' => 'Invalid password'
				)
			);
	
		}

	}


?>