<?php

if (unlink('../files/'.$_POST['fileName'])) {

    echo json_encode(array(
        'result' => 200
    ));

} else {

    echo json_encode(array(
        'result' => 500
    ));

}

?>