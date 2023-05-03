<?php
require_once("connection.php");
require_once("functions.php");
if (isset($_GET['id'])) {
    $todo_id = $_GET['id'];
}

$sql = "DELETE FROM todos WHERE todo_id = '{$todo_id}'";
$result = $con->query($sql);
    $status = "the todo is has been removed";
    header("location: ../views/index.php?error=''{$status}");
    require_once("toJson.php");
     exit();