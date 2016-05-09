'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//db set up
const PORT = process.env.MONGO_URI || 'mongodb://localhost/db';
mongoose.connect('mongodb://localhost/db');
let models = {};
require(__dirname + '/models/blog-model.js')(mongoose, models);

//routers
app.use(bodyParser.json());

app.get('/blog/articles', (req, res)=>{
  models.Blog.find({},(err, blog)=>{
    if(err) res.json({error: err});
    res.json(blog);
  });
});

app.post('/admin/blog', (req, res)=>{
  var newBlog = new models.Blog(req.body);
  newBlog.save((err)=>{
    if(err) return res.json({error: err});
    res.json({msg: 'Success!'});
  });
});



app.listen(3000, ()=> console.log('Backend server listening at 3000'));
