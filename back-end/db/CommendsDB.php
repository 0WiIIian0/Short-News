<?php

session_start();

include_once('DB.php');

class CommentsDB extends DB {

    function insert(
        $user_id,
        $text,
        $reactions) {

        $sql = " insert into comments	
			(user_id, text, reactions) 
			values 
			(:user_id,:text,:reactions)";

	    $cmd = $pdo->prepare($sql);

		$cmd->bindValue(":user_id"   , $user_id);                   
		$cmd->bindValue(":text"      , $text); 
		$cmd->bindValue(":reactions" , $reactions);

        if($cmd->execute())
	    {
         	echo 'O comentario foi inserido ';
	    }
	    else
	    {
           echo 'Nao foi possivel inserir o comentario';
	    }
        
	}// function insert

	function update(
    	$user_id,
        $text,
        $reactions) { 

		$sql = " update comments set	
					user_id      = :user_id   , 
					text         = :text  ,
					reactions    = :reactions

				 where id = :id";

	    $cmd = $pdo->prepare($sql);

        $id    = $_SESSION['id'];
        
        $cmd->bindValue(":id"         , $id); 
		$cmd->bindValue(":user_id"   , $user_id);                   
		$cmd->bindValue(":text"      , $text); 
		$cmd->bindValue(":reactions" , $reactions);

	    if($cmd->execute())
	    {
         	echo 'O comentario foi atualizado';
	    }
	    else
	    {
            echo 'Nao foi possivel atuzalizar o comentario';
	    }


    }// function update

    function delete() { 

        $sql = " delete from comments where id = :id ";

        $cmd = $pdo->prepare($sql);

        $cmd->bindValue(":id", $_SESSION['id'] );

        if($cmd->execute())
        {
            echo 'O comentario foi deletado';
        }
        else
        {
            echo 'Nao foi possivel deletar o comentario';
        }

    }// function delete


}

?>