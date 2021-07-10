<?php

session_start();

include_once('DB.php');

class ReportedComments extends DB {

    function insert(
        $news_id,
        $complaint,
        $reported_by) {

        $sql = " insert into reported_news	
			(news_id, complaint, reported_by) 
			values 
			(:news_id,:complaint,:reported_by)";

	    $cmd = $pdo->prepare($sql);

		$cmd->bindValue(":news_id"   , $news_id);                   
		$cmd->bindValue(":complaint"      , $complaint); 
		$cmd->bindValue(":reported_by" , $reported_by);

        if($cmd->execute())
	    {
         	echo 'A noticia reportada foi inserido ';
	    }
	    else
	    {
           echo 'Nao foi possivel inserir a noticia reportada';
	    }
	}// function insert

	function update(
    	$news_id,
        $complaint,
        $reported_by) { 

		$sql = " update reported_news set	
					news_id      = :news_id   , 
					complaint         = :complaint  ,
					reported_by    = :reported_by

				 where id = :id";

	    $cmd = $pdo->prepare($sql);

        $id    = $_SESSION['id'];
        
        $cmd->bindValue(":id"         , $id); 
		$cmd->bindValue(":news_id"   , $news_id);                   
		$cmd->bindValue(":complaint"      , $complaint); 
		$cmd->bindValue(":reported_by" , $reported_by);

	    if($cmd->execute())
	    {
         	echo 'A noticia reportada foi atualizado';
	    }
	    else
	    {
            echo 'Nao foi possivel atuzalizar a noticia reportada';
	    }


        }// function update

        function delete() { 

        	$sql = " delete from reported_news where id = :id ";

			$cmd = $pdo->prepare($sql);

			$cmd->bindValue(":id", $_SESSION['id'] );

			if($cmd->execute())
		    {
	         	echo 'A noticia reportada foi deletado';
		    }
		    else
		    {
	            echo 'Nao foi possivel deletar a noticia reportada';
		    }

        }// function delete

}

?>