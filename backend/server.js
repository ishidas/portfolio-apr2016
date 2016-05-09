'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/blog', (req, res)=>{
  
});

app.listen(3000, ()=> console.log('Backend server listening at 3000'));
