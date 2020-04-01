var express = require('express');
var path = require('path');
var app = express();
var request = require('request');
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.engine('.html', require('ejs').renderFile);

app.get('/', function (req, res) { //website link home page
    request.get("https://api.magicthegathering.io/v1/types", function (error, response, responseBody) {
            if (error) {
              console.log(error);
            }
            var body = JSON.parse(responseBody);
            body=JSON.stringify(body);
            res.render( __dirname + "/index.html", {body: body} );
          });

});

var server = app.listen(8081, function(req,res){
    console.log("Running Server...");
});