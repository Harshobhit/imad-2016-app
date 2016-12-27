var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
  user: 'harshobhit',
   database: 'harshobhit',
   host:'harshobhit.imad.hasura-app.io',
   port:'5432',
  password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
var counter=0;
app.get('/counter',function(req,res)
{
   counter=counter+1;
   res.send(counter.toString());
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool = new Pool(config);
app.get('/userlogin', function (req, res) {
  pool.query('SELECT * FROM user',function(err,result){
      res.send(JSON.stringify(result));

});
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/blog', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog.html'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
