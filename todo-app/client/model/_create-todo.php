<?php
require_once("connection.php");
require_once("functions.php");
    $name = $_POST['name'];
$sql = "INSERT INTO todos (todo_name,todo_status,todo_date)
VALUES ('{$name}','active',NOW())";
  $con->query($sql);
  $status = "the todo has been created";
  require_once("toJson.php");
  header("location: ../views/index.php?error=''{$status}");
 exit();