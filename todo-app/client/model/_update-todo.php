<?php
require_once("connection.php");
require_once("functions.php");

if (isset($_GET['id'])) {
    $todo_id = $_GET['id'];
}

$sql = "SELECT * FROM todos WHERE todo_id = '{$todo_id}'";

$result = $con->query($sql);
$row = $result->fetch_object();
if (!empty(mysqli_num_rows($result)) && $row->todo_status != "active") {
    $sql = "UPDATE todos SET todo_status = 'active' WHERE todo_id = '{$todo_id}'";
    $result = $con->query($sql);
    $status = "the todo is marked as active";   
    require_once("toJson.php");
    header("location: ../views/index.php?error=''{$status}");
 
   exit();
}
else if (!empty(mysqli_num_rows($result)) && $row->todo_status != "completed") {
$sql = "UPDATE todos SET todo_status = 'completed' WHERE todo_id = '{$todo_id}'";
 $result = $con->query($sql);
if (isset($result)) {
 $status = "the todo is marked as completed";
 require_once("toJson.php");
 header("location: ../views/index.php?error=''{$status}");
}
else{
 $status = "something went worng please try again!";
 require_once("toJson.php");
 header("location: ../views/index.php?error=''{$status}");
}
}


?>