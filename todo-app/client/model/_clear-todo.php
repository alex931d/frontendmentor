<?php
require_once("connection.php");
require_once("functions.php");
$sql = "SELECT * FROM todos";
$result = $con->query($sql);
$row = $result->fetch_object();
if (!empty(mysqli_num_rows($result)) && $row->todo_status != 'active') {
  $sql = "DELETE  FROM todos WHERE todo_status = 'completed'";
  $con->query($sql);
  $status = "all todos marked as completed is removed";
  require_once("toJson.php");
  header("location: ../views/index.php?error=''{$status}");
 exit();
}
else{
    $status = "there was no completed marked";
    require_once("toJson.php");
    header("location: ../views/index.php?error=''{$status}");
   exit();
}
