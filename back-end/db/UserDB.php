<?php

include_once('DB.php');

class UserDB extends DB {
  
    function __construct()
    {
		try {	
			$this->pdo = new PDO("mysql:host=localhost;dbname=shortnews","root",""); 
		} catch(PDOException $e) {
			die('Failed to connect to local database.');
		}
    }

    function insert(
        $name,
        $email,
        $pass) {

		if ($this->select($email)) {

			return json_encode(
				array(
					'result' => 500,
					'message' => 'User already exists'
				)
			);

		}

        $sql = " insert into users	
			(name, email, pass) 
			values 
			(:name,:email,:pass)";

	    $cmd = $this->pdo->prepare($sql);

		$cmd->bindValue(":name" , $name);                   
		$cmd->bindValue(":email", md5($email)); 
		$cmd->bindValue(":pass" , password_hash($pass, PASSWORD_DEFAULT));

        if($cmd->execute())
	    {
			return json_encode(
				array(
					'result' => 200
				)
			);
		}
	    else
	    {
			return json_encode(
				array(
					'result' => 500,
					'message' => 'Failed to register user'
				)
			);
	    }

	}// function insert

	function update(
    	$name,
        $email,
        $pass,
        $permission_type) { 

		$sql = " update users set	
					name            = :name   , 
					email           = :email  ,
					pass            = :pass   ,
					permission_type = :permission_type

				 where id = :id";

	    $cmd = $this->pdo->prepare($sql);

        $id    = $_SESSION['id'];
        
        $cmd->bindValue(":id"        			, $id); 
		$cmd->bindValue(":name"      			, $name);                   
		$cmd->bindValue(":email"     			, $email); 
		$cmd->bindValue(":pass"      			, $pass);
		$cmd->bindValue(":permission_type"      , $permission_type);


	    if($cmd->execute())
	    {
         	echo 'O usuario foi atualizado';
	    }
	    else
	    {
            echo 'Nao foi possivel atuzalizar o usuario';
	    }


	}// function update

	function delete() { 

		$sql = " delete from users where id = :id ";

		$cmd = $this->pdo->prepare($sql);

		$cmd->bindValue(":id", $_SESSION['id'] );

		if($cmd->execute())
		{
			echo 'O usuario foi deletado';
		}
		else
		{
			echo 'Nao foi possivel deletar o usuario';
		}

	}// function delete

	function select($email) {

		$email = md5($email);

		$sql = "SELECT * FROM users where email = :email";

	    $cmd = $this->pdo->prepare($sql);

		$cmd->bindValue(":email", $email);

		$cmd->execute();

		return $cmd->fetch();

	}

}

?>