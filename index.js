const express = require('express');
const mongoose = require('mongoose');

var bodyParser = require('body-parser')

const path = require('path');

const app = express();

const Posts = require('./Posts.js');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://williammaich:RinOyHRev14e3XPl@cluster0.u68ut.mongodb.net/dankicode?retryWrites=true&w=majority&appName=Cluster0";',{useNewUrlParser: true, useUnifiedTopology: true}).then(function(){
    console.log('conectado ao mongo');
}).catch(function(err){
    console.log(err.message);
})

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));


app.get('/',(req,res)=>{
    
    if(req.query.busca == null){
        Posts.find({}).sort({'_id':-1}).exec(function(err,posts){
           
            //console.log("posts[0]");
            res.render('home',{posts:posts});
        })
        
    }else{
        res.send('busca',{});
    }

});

app.get('/:slug',(req,res)=>{
   // res.send(req.params.slug);
   res.render('single',{});
})

app.listen(5000,()=>{
    console.log('server rodando!');
})