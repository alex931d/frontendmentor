<?php

require_once("connection.php");
$query = "SELECT * FROM todos";
$results = $con->query($query);
$array = array();
while($row = $results->fetch_object())
{
    $array[] = $row;
}
$fp = fopen('data.json', 'w');
fwrite($fp, json_encode($array));
fclose($fp);