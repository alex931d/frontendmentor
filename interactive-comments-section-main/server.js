const express = require("express");
const fs = require("fs");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;
const path = require("path");
const date = Date.now(); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('client'));

app.set("view engine", "ejs");

app.set("views",path.join(__dirname, "./client/views"));
const dataFilePath = path.join(__dirname, 'client', 'data.json');
let data = JSON.parse(fs.readFileSync(dataFilePath));




app.get('/', (req, res) => {
    res.render('index', { data, template: "index"});
  });
  let dataLegth = data.comments.length +1;
  data.comments.forEach(comment=>{
    if (comment.replies.length > 0) {
      dataLegth + comment.replies.length
    comment.replies.forEach(item=>{
     dataLegth++
    })  
    }
  })
  app.post('/reply/post/:id',(req,res)=>{
     const { content,replyId, png, webp,username} = req.body;
     const id = req.params.id;
     const index = data.comments.findIndex(comment => parseInt(comment.id) === parseInt(id));
     const newReply = {
      id: dataLegth++,
      replyId,
      content,
      createdAt: date,
      score: 0,
      user:{
        image:{png,webp},
        username
      }
     };
      data.comments[parseInt(index)].replies.push(newReply);
      try {
      fs.writeFileSync(dataFilePath, JSON.stringify(data));
      console.log('Data saved to file');
    } catch (err) {
      console.error(err);
    }
    res.json(newReply);
  })
  app.post('/comment/post', (req, res) => {
    const { content} = req.body;
    const newComment = {
      id: dataLegth++,
      content,
      createdAt: date,
      score: 0,
      user: {
        image: { png: data.currentUser.image.png, webp: data.currentUser.image.webp },
        username: data.currentUser.username,
      },
      replies:[],
    };
  
    data.comments.push(newComment);
  
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(data));
      console.log('Data saved to file');
    } catch (err) {
      console.error(err);
    }
    res.json(newComment);
    res.redirect("/")
  });
 // handle delete requests for comments
  app.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = data.comments.findIndex(comment => parseInt(comment.id) === parseInt(id));
    if (index === -1) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    data.comments.splice(index, 1);
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(data));
      console.log('Data saved to file');
      console.log(data.comments)  
      res.redirect("/");
    } catch (err) {
      console.error(err);
    }
    res.json({ message: 'comment deleted' });
  
  });
  function sortCommentsByScore(data) {
    data.comments.sort((a, b) => b.score - a.score);
  }
  // handle upvotes
  app.put("/upvote/:id",(req,res)=>{
     const id = req.params.id;
     let replyId ;
     let score = parseInt(req.body.score)
     if (req.body.replyId) {
      replyId = req.body.replyId;
      console.log(replyId)
     }
     let index = data.comments.findIndex(comment => parseInt(comment.id) === parseInt(id))
     if (index == -1) {
       data.comments.forEach((comment,i) =>{
        const replyIndex = comment.replies.findIndex(replyComment => parseInt(replyComment.id) === parseInt(id))
        if (replyIndex !== -1) {
          index = i;
        data.comments[index].replies[replyIndex].score = score +1;  
        try {
          fs.writeFileSync(dataFilePath, JSON.stringify(data));
          console.log('Data saved to file');
        } catch (err) {
          console.error(err);
        }
        }
       })
     }
     else{
      data.comments[index].score = score +1;
      sortCommentsByScore(data);
      try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data));
        console.log('Data saved to file');
      } catch (err) {
        console.error(err);
      }
      res.json({ message: 'upvote updated' });
     }

  })
  app.put("/downvote/:id",(req,res)=>{
    const id = req.params.id;
    let replyId ;
    let score = parseInt(req.body.score)
    if (req.body.replyId) {
     replyId = req.body.replyId;
     console.log(replyId)
    }
    let index = data.comments.findIndex(comment => parseInt(comment.id) === parseInt(id))
    if (index == -1) {
      data.comments.forEach((comment,i) =>{
       const replyIndex = comment.replies.findIndex(replyComment => parseInt(replyComment.id) === parseInt(id))
       if (replyIndex !== -1) {
         index = i;
       data.comments[index].replies[replyIndex].score = score -1;  
       try {
         fs.writeFileSync(dataFilePath, JSON.stringify(data));
         console.log('Data saved to file');
       } catch (err) {
         console.error(err);
       }
       res.json({ message: 'upvote updated' });
       }
      })
    }
    else{
     data.comments[index].score = score -1;
     sortCommentsByScore(data);
     try {
       fs.writeFileSync(dataFilePath, JSON.stringify(data));
       console.log('Data saved to file');
     } catch (err) {
       console.error(err);
     }
     res.json({ message: 'upvote updated' });
    }
  })
// handle update requests for comments 
app.put("/comment/update/:id",(req,res)=>{
  const { content, png, webp,username,score,createdAt} = req.body;
  const id = req.params.id;
  var replies;
  let index = data.comments.findIndex(comment => parseInt(comment.id) === parseInt(id));
  const updated = {
    id: req.params.id,
    content,
    createdAt,
    score,
    user: {
      image: { png, webp},
      username,
    },
    replies: replies,
  }
  // updating the object
    data.comments[index] = updated;
   try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
    console.log('Data saved to file');
  } catch (err) {
    console.error(err);
  }
  res.json({ message: 'reply updated' });
});
// handle update requests for replies
app.put("/reply/update/:id",(req,res)=>{
  let commentIndex = -1;
  let replyIndex = -1;
  const { content,replyId, png, webp,username,score,createdAt} = req.body;
  const replyid = req.params.id;


  data.comments.forEach((comment, i) => {  

 if (comment.replies.length > 0) {
    const foundReplyIndex = comment.replies.findIndex(reply =>parseInt(reply.id) === parent(replyid));
    console.log(foundReplyIndex)
    if (foundReplyIndex !== -1) {
      commentIndex = i;
       replyIndex = foundReplyIndex;
    } 
  }
  });

  const updated = {
    id: req.params.id,
    replyId: replyId,
    content,
    createdAt,
    score,
    user: {
      image: { png, webp},
      username,
    },
    replies:[],
  }
  if (commentIndex === -1 || replyIndex === -1) {
    return res.status(404).json({message: "Reply not found"})
  }

  // object the data array
  data.comments[commentIndex].replies[replyIndex] = updated;

  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data));
    console.log('Data saved to file');
  } catch (err) {
    console.error(err);
  }
  res.json({ message: 'reply updated' });
});
  // handle delete requests for replies
  app.delete("/reply/:id",(req,res) =>{
    const replyId = parseInt(req.params.id);
  
    // Iterate through all comments to find the one that contains the reply with the specified ID
    let commentIndex = -1;
    let replyIndex = -1;
    data.comments.forEach((comment, i) => {
      const foundReplyIndex = comment.replies.findIndex(reply => reply.id === replyId);
      if (foundReplyIndex !== -1) {
        commentIndex = i;
        replyIndex = foundReplyIndex;
      }
    });
  
    // If the reply was not found, return 404
    if (commentIndex === -1 || replyIndex === -1) {
      return res.status(404).json({message: "Reply not found"})
    }
  
    // Remove the reply from the comment's replies array
    data.comments[commentIndex].replies.splice(replyIndex, 1);
  
    // Save the updated data to file
    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(data));
      console.log('Data saved to file');
    } catch (err) {
      console.error(err);
    }
  
    res.json({ message: 'reply deleted' });
  });
  
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
});
