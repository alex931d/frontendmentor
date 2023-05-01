<?php
$host = "localhost";
$user = "username";
$password = "secret :)";
$database = "why you looking here?";
$con = new mysqli($host, $user, $password, $database);
$con->set_charset("utf8");
if ($con->connect_errno) {
    die('can not conntent to database: (' . $con->connect_errno  .')'. $con->connect_error);
}
?>