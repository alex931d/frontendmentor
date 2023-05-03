<?php
function createItem($con,$sql){
$result = $con->query($sql);
$i;
    while ($row = $result->fetch_object()) {
     ?>
       <div class="todo-item">
        <div class="row">
           <div class="todo-item-button"> 
            <a href="../model/_update-todo.php?id=<?php echo $row->todo_id ?>">
                 <div class="circle-btn">
                  </div>    
                  </a>
                 </div>
                 <?php 
                 if ($row->todo_status == "completed") {
                ?>
                <span class="completed" style="text-decoration: line-through;"><?php echo $row->todo_name ?></span>
                <?php
                 }
                 else{
                  ?>
                  <span><?php echo $row->todo_name ?></span>
                  <?php
                 }
                 ?>
                 </div>
               <div class="todo-remove"> 
                    <a href="../model/_remove-todo.php?id=<?php echo $row->todo_id ?>">
                 <div class="x-btn">
                    𝗑
                  </div>    
                  </a>
                 </div>
        </div>

    <?php
    }
}