const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
  console.log("server is up and running on port 3000");
});

app.get("/", function(req,res){
  res.sendfile(__dirname + "/index.html");
});

app.post("/bitcoin", function(req,res){
  //console.log(req.body);
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var finalURL  = baseURL + crypto + fiat;
  var result = crypto + fiat ;
  request(finalURL, function(error,response, body){
    var data = JSON.parse(body);
    var price = data.last;
    console.log(price);
    var currentDate =  data.display_timestamp;
    res.write("the current date is " + currentDate + " and " );
    res.write("the price of  " + crypto + " is " + price + fiat );
    res.send();
  })


});
