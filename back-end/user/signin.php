<?php
    session_start();

    include_once("../db/DB.php");
	
	$my_DB = new DB();	
	
	$pdo = $my_DB->pdo;

	$email = $_POST['email'];
	$password = $_POST['password'];
    
	$sql = "select * from users where email = :email";

	$cmd = $pdo->prepare($sql);

	$cmd->bindValue(":email", md5($email));
	
	$cmd->execute();


	if( $dados = $cmd->fetch(PDO::FETCH_ASSOC) )
	{
        if(password_verify($password,$dados['pass']))
        {
			$_SESSION['id']   = $dados['id'];
			$_SESSION['user'] = $dados['user'];

			echo json_encode(array(
				'result' => 200,
				'message' => 'Sucess to login'
			));
        }      
	} 
	else 
	{        	
		echo json_encode(array(
				'result' => 500,
				'message' => 'Failed to login'
			));
	}

?>