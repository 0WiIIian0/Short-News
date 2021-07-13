<?php

session_start();

include_once('DB.php');

class NewsDB extends DB {
	
    
    function __construct()
    {
		try {	
			$this->pdo = new PDO("mysql:host=localhost;dbname=shortnews","root",""); 
		} catch(PDOException $e) {
			die('Failed to connect to local database.');
		}
    }

    function insert(
        $user_id,
        $title,
        $subtitle,
        $content,
        $category,
        $reactions) {

        $sql = " insert into news	
			(user_id, title, subtitle,content,category,reactions) 
			values 
			(:user_id,:title,:subtitle,:content,:category,:reactions)";

	    $cmd = $this->pdo->prepare($sql);

		$cmd->bindValue(":user_id"   		, $user_id);                   
		$cmd->bindValue(":title"            , $title); 
		$cmd->bindValue(":subtitle"         , $subtitle);
		$cmd->bindValue(":content" 			, $content);
		$cmd->bindValue(":category"         , $category);
		$cmd->bindValue(":reactions"        , $reactions);

        if($cmd->execute())
	    {
         	echo 'A noticia foi inserido ';
	    }
	    else
	    {
           echo json_encode($cmd->errorInfo());
	    }
		
	}// function insert

	function update(
    	$user_id,
        $title,
        $subtitle,
        $content,
        $category,
        $reactions,
        $post_date) { 

		$sql = " update news set	
					user_id          = :user_id  , 
					title            = :title    ,
					subtitle         = :subtitle ,
					content          = :content  ,
					category         = :category ,
					reactions        = :reactions,
					post_date        = :post_date

				 where id = :id";

	    $cmd = $pdo->prepare($sql);

        $id    = $_SESSION['id'];
        
        $cmd->bindValue(":id"        	, $id); 
		$cmd->bindValue(":user_id"      , $user_id);                   
		$cmd->bindValue(":title"     	, $title); 
		$cmd->bindValue(":subtitle"     , $subtitle);
		$cmd->bindValue(":content"      , $content);
		$cmd->bindValue(":category"     , $category);
		$cmd->bindValue(":reactions"    , $reactions);
		$cmd->bindValue(":post_date"    , $post_date);


	    if($cmd->execute())
	    {
         	echo 'A noticia foi atualizado';
	    }
	    else
	    {
            echo 'Nao foi possivel atuzalizar a noticia';
	    }


    }// function update

	function delete() { 

		$sql = " delete from noticia where id = :id ";

		$cmd = $pdo->prepare($sql);

		$cmd->bindValue(":id", $_SESSION['id'] );

		if($cmd->execute())
		{
			echo 'A noticia foi deletado';
		}
		else
		{
			echo 'Nao foi possivel deletar o noticia';
		}

	}// function delete

}

?>