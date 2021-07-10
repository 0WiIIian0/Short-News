<?php

session_start();

include_once('DB.php');

class UserDB extends DB {


    function insert(
        $name,
        $email,
        $pass,
        $permission_type) {

        $sql = " insert into users	
			(name, email, pass,permission_type) 
			values 
			(:name,:email,:pass,:permission_type)";

	    $cmd = $pdo->prepare($sql);

		$cmd->bindValue(":name"   		   , $name);                   
		$cmd->bindValue(":email"           , $email); 
		$cmd->bindValue(":pass"            , $pass);
		$cmd->bindValue(":permission_type" , $permission_type);

        if($cmd->execute())
	    {
         	echo 'O usuario foi inserido ';
	    }
	    else
	    {
           echo 'Nao foi possivel inserir o usuario';
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

	    $cmd = $pdo->prepare($sql);

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

			$cmd = $pdo->prepare($sql);

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

}

?>