var express = require('express');
var path = require('path');
var app = express();
var request = require('request');
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.engine('.html', require('ejs').renderFile);

app.get('/', function (req, res) { //website link home page
    request.get("https://api.magicthegathering.io/v1/cards", function (error, response, responseBody) {
            if (error) {
              console.log(error);
            }
            var body = JSON.parse(responseBody);
           // console.log(body.cards);
            //console.log(typeof Object.keys(body.cards)[0]);

            //delete the foreign names of the cards
            for(var i =0; i< body.cards.length; i++){
                // name, cmc, colors, colorIdentity, type, supertypes, types, subtypes, setName, toughness, loyalty, power, legality
                console.log(body.cards[i]);
                var temp = {};
                temp.name = body.cards[i].name;
                temp.cmc = body.cards[i].cmc;
                temp.colors = body.cards[i].colors;
                temp.colorIdentity = body.cards[i].colorIdentity;
                temp.type = body.cards[i].type;
                temp.supertypes = body.cards[i].supertypes;
                temp.types = body.cards[i].types;
                temp.subtypes = body.cards[i].subtypes;
                temp.setName = body.cards[i].setName;
                temp.toughness = body.cards[i].toughness;
                temp.loyalty = body.cards[i].loyalty;
                temp.power = body.cards[i].power;
                temp.legality = body.cards[i].legality;
                temp.multiverseid = body.cards[i].multiverseid;
                temp.imageUrl = body.cards[i].imageUrl;
                body.cards[i]= temp;
            }

            body=JSON.stringify(body);
            res.render( __dirname + "/index.html", {body: body} );
          });

});

var server = app.listen(8081, function(req,res){
    console.log("Running Server...");
});