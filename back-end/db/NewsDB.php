<?php

include_once('DB.php');

class NewsDB extends DB {

     function insert(
        $user_id,
        $title,
        $subtitle,
        $content,
        $category
        ) {

        $sql = " insert into news	
			(user_id, title, subtitle,content,category) 
			values 
			(:user_id,:title,:subtitle,:content,:category)";

	    $cmd = $this->pdo->prepare($sql);

		$cmd->bindValue(":user_id"   		, $user_id);                   
		$cmd->bindValue(":title"            , $title); 
		$cmd->bindValue(":subtitle"         , $subtitle);
		$cmd->bindValue(":content" 			, $content);
		$cmd->bindValue(":category"         , $category);

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
					'message' => 'Failed to register news'
				)
			);
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

	    $cmd = $this->pdo->prepare($sql);

        $id    = $user_id;
        
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
					'message' => 'Failed to update news'
				)
			);
	    }


    }// function update

	function delete($news_id) { 

		$sql = " delete from news where id = :id ";

		$cmd = $this->pdo->prepare($sql);

		$cmd->bindValue(":id", $news_id['id']);

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
					'message' => 'Failed to delete news'
				)
			);
		}

	}// function delete

	function mountQuery($categories, $sql) {

		$categoryIndex = 0;
		foreach($categories as $category) {
			$sql = $sql.' category = :category'.$categoryIndex.' or';
			$categoryIndex++;
		}

		$sql = substr($sql, 0, strlen($sql) - 3);

		$cmd = $this->pdo->prepare($sql);

		$categoryIndex = 0;
		foreach($categories as $category) {
			$cmd->bindValue('category'.$categoryIndex, $category);
			$categoryIndex++;
		}

		return $cmd;

	}

	function select($categories){

		$sql = "select * from news where";
		
		$cmd = $this->mountQuery($categories, $sql);

		if($cmd->execute())
		{
			return json_encode(
				array(
					'result' => 200,
					'newsList' => $cmd->fetchAll(PDO::FETCH_CLASS)
				)
			);
		}
		else
		{
			return json_encode(
				array(
					'result' => 500,
					'sql' => $sql,
					'message' => 'Failed to select news'
				)
			);
		}

	}// function select

}

?>