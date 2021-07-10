<?php

class User {

    private $id = '';
    private $name = '';
    private $email = '';
    private $permissionType = '';

    function __construct(
        $id,
        $name,
        $email,
        $permissionType) {

        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->permissionType = $permissionType;

    }

    function delete() {
        
    }

    function changeName() {

    }

    function changePassword() {
        
    }

    function changePermissionType($newPermissionType) {
        $this->permissionType = $newPermissionType;
    }

    function checkPassword() {

    }

};

?>