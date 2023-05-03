<?php 
require_once("../model/connection.php");
require_once("../model/functions.php");
require_once("../model/toJson.php");
$sql = "SELECT * FROM todos";
$result = $con->query($sql);
$row = $result->fetch_object();

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>todo</title>
    <script src="https://code.jquery.com/jquery-3.3.1.js" integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="styles/style.css">
</head>
<body>
     <main>
         <div class="todo-container">
             <div class="todo-container-first"></div>
             <div class="todo-container-last">
                  <div class="todo-list-wrapper center">
                    <nav>
                        <h1>todo</h1>
                        <img src="../views/images/icon-moon.svg" alt="theme-switcher">
                    </nav>
                       <div class="todo-list-inner-wrapper">
                          <div class="todo-add">
                            <div class="todo-item-button">
                                <div class="circle-btn"></div>
                          </div>
                          <form class="form" action="../model/_create-todo.php"  method="post">
                             <input placeholder="create new todo" name="name">
                          </form>
                          </div>
                          <div class="todo-list">
                            <div class="item-container">

                            </div>
                             <div class="todo-filter">
                                <span><?php echo mysqli_num_rows($result) ?> items left</span>
                                <div class="middle-filter">
                                     <span id="all">all</span>
                                     <span class="active">active</span>
                                     <span class="complete">completed</span>
                                </div>
                                <a href="../model/_clear-todo.php">clear completed</a>
                             </div>
                          </div>
                       </div>
                  </div>
             </div>
         </div>
     </main>
    <script src="scripts/script.js"></script>
</body>
</html>