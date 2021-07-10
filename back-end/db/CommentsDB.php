<?php

session_start();

include_once('DB.php');

class CommentsDB extends DB {

    function __construct()
    {

    }

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

<<<<<<< HEAD:back-end/db/CommendsDB.php
        function select($where){
        	
        	$sql = "select * from comments where $where";

        	$cmd = $pdo->prepare($sql);

        	if($cmd->execute())
		    {
	         	echo 'O comentario foi selecionado';
		    }
		    else
		    {
	            echo 'Nao foi possivel selecionar o comentario';
		    }
=======
        if($cmd->execute())
        {
            echo 'O comentario foi deletado';
        }
        else
        {
            echo 'Nao foi possivel deletar o comentario';
        }

    }// function delete

>>>>>>> 73a52843c62a0af19691e7ec3ab4985533e543df:back-end/db/CommentsDB.php

        }
}

?>