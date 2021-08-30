//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// converts the uppercase alphate to lowercase and remove the symbols like dash
const _ = require('lodash');
const mongoose=require('mongoose');


const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

app.set('view engine', 'ejs');
// use to connect database with nodejs
//  a database named blogDb is created if already exist then linked with nodejs
mongoose.connect('mongodb+srv://admin-vanshika:noddy123@cluster0.k4u4v.mongodb.net/blogDb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
// structure of your table ,the fields it has
const blogSchema =new mongoose.Schema({
  name :String,
  content:String
})
// name of the table (collections)
const Blog=new mongoose.model("Blog",blogSchema);
var i=1;
app.get("/",function(req,res){
  Blog.find({},function(err,results){
    res.render('home.ejs',{posts:results});
  })
  })
app.get('/about',function(req,res){
  res.render('about.ejs');
})
app.get('/home',function(req,res){
  Blog.find({},function(err,results){
    res.render('home.ejs',{posts:results});
  })
})
app.get('/contact',function(req,res){
  res.render('contact.ejs');
})

app.get('/compose',function(req,res){
  res.render('compose.ejs');
})
app.get('/posts/:x',function(req,res){
  Blog.find({},function(err,results){
    results.forEach(function(y){
    if(_.lowerCase(y.name)===_.lowerCase(req.params.x)){
      res.render('post.ejs',{k:y});
    }

  })
})
})
app.post('/compose',function(req,res){
  const post=new Blog({
     name: req.body.pTitle,
   content:req.body.pBody
});
post.save();


res.redirect('/');

})














app.listen(3000, function() {
  console.log("Server started on port 3000");
});
