<?php

    if (!file_exists('../files')) {
        mkdir('../files', 0777, true);
    }

    $file = $_FILES['file'];

    $name = basename($_FILES['file']['name']);
    $tmp_name = $_FILES['file']['tmp_name'];

    $fileName = md5($name);
    $parsedFileName = explode('.', $name);
    $fileExtension = array_pop($parsedFileName);

    if (move_uploaded_file($tmp_name, '../files/'.$fileName.'.'.$fileExtension)) {
        
        echo json_encode(
            array(
                'result' => 201,
                'fileName' => $fileName.'.'.$fileExtension
            )
        );

    } else {
        
        echo json_encode(
            array(
                'result' => 500
            )
        );

    }

?>