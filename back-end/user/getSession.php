<?php

    session_start();

    if (isset($_SESSION['id'])) {
        echo json_encode(
            array(
                'result' => 200,
                'username' => $_SESSION['name'],
                'canPostNews' => $_SESSION['canPostNews']
            )
        );
    }

?>