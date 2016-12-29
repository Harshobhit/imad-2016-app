var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
  user: 'harshobhit',
   database: 'harshobhit',
   host:'db.imad.hasura-app.io',
   port:'5432',
  password: 'db-harshobhit-11999'
};
function createTemplate(data)
{
    var name=data.name;
    var email=data.emailid;
    var password=data.password;
    var htmlTemplate=`<html>
    <head>
    <title>Football</title>
    </head>
    <body>
    <h1> ${name}</h1>;
    <h2> ${email}</h1>;
    </body>
    </html>`;
    return htmlTemplate;
}
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
  pool.query('SELECT * FROM d',function(err,result){
      if(err)
      {
          res.status(500).send(err.toString());
      }
      else
      {
          var a=result.rows[0];
          res.send(createTemplate(a));
          
      }
});
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
window.onclick = function () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
              alert('User created successfully');
          } else {
              alert('Could not register the user');
          }
      }
    };
    request.open('POST', '/create-user', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({name: '',emailid: '', password: ''}));       
};
app.get('/blog', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'blog.html'));
});
app.post('/create-user', function (req, res) {
  var username = req.body.name;
  var emailid = req.body.emailid;
  var password = req.body.password;
  pool.query('INSERT INTO "d" (name, emailid,password) VALUES ($1, $2,$3)', [username, emailid,password],         function (err, result) {
           if(err) {
              res.status(500).send(err.toString());
           } 
           else {
              res.send('User successfully created: ' + username);
           }
  });
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
