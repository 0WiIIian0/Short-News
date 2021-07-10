<?php

session_start();

include_once('DB.php');

class ReportedNews extends DB {

    function insert(
        $comment_id,
        $complaint,
        $reported_by) {

        $sql = " insert into reported_comments	
			(comment_id, complaint, reported_by) 
			values 
			(:comment_id,:complaint,:reported_by)";

	    $cmd = $pdo->prepare($sql);

		$cmd->bindValue(":comment_id"   , $comment_id);                   
		$cmd->bindValue(":complaint"      , $complaint); 
		$cmd->bindValue(":reported_by" , $reported_by);

        if($cmd->execute())
	    {
         	echo 'O comentario reportado foi inserido ';
	    }
	    else
	    {
           echo 'Nao foi possivel inserir o comentario reportado';
	    }
	}// function insert

	function update(
    	$comment_id,
        $complaint,
        $reported_by) { 

		$sql = " update reported_comments set	
					comment_id      = :comment_id   , 
					complaint         = :complaint  ,
					reported_by    = :reported_by

				 where id = :id";

	    $cmd = $pdo->prepare($sql);

        $id    = $_SESSION['id'];
        
        $cmd->bindValue(":id"         , $id); 
		$cmd->bindValue(":comment_id"   , $comment_id);                   
		$cmd->bindValue(":complaint"      , $complaint); 
		$cmd->bindValue(":reported_by" , $reported_by);

	    if($cmd->execute())
	    {
         	echo 'O comentario reportado foi atualizado';
	    }
	    else
	    {
            echo 'Nao foi possivel atuzalizar o comentario reportado';
	    }


        }// function update

        function delete() { 

        	$sql = " delete from reported_comments where id = :id ";

			$cmd = $pdo->prepare($sql);

			$cmd->bindValue(":id", $_SESSION['id'] );

			if($cmd->execute())
		    {
	         	echo 'O comentario reportado foi deletado';
		    }
		    else
		    {
	            echo 'Nao foi possivel deletar o comentario reportado';
		    }

        }// function delete

}

?>