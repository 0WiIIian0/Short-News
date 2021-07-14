<?php

  include_once('../db/UserDB.php');

class User {

    private $id = '';
    private $name = '';
    private $pass = '';
    private $email = '';
    private $permissionType = '';

    function __construct(
        $id,
        $name,
        $email,
        $permissionType) {

        $this->id = $id;
        $this->name = $name;
        $this->pass = $pass;
        $this->email = $email;
        $this->permissionType = $permissionType;
        $this->db = new UserDB();

    }

    function delete() {
        return $this->db->delete();
    }

    function changeName($newName) {
        return $this->db->updateName($newName);
    }

    function changePassword($newPass) {
        return $this->db->updatePass($newPass);
    }

    function changePermissionType($newPermissionType) {
        return $this->db->updatePermission($newPermissionType);
    }

    function checkPassword() {
        
    }

};

?>