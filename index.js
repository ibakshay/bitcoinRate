const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(){
  console.log("server is up and running on port 3000");
});

//TODO #25 #24 Add Ui @ibakshay

app.get("/", function(req,res){
  res.sendfile(__dirname + "/index.html");
});

//TODO #27 #26 test @ibakshay

app.post("/bitcoin", function(req,res){
  //console.log(req.body);
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amt = req.body.amount;

  var options = {
    url : "https://apiv2.bitcoinaverage.com/convert/global",
    method : "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amt
    }
  }
  //api request
  request(options, function(error,response, body){
    var data = JSON.parse(body);
    var price = data.price;
    console.log(price);
    var currentDate =  data.time;
    res.write("the current date is " + currentDate + " and " );
    res.write("the price of  " + amt + " " +   crypto + " is currently worth " + price + fiat );
    res.send();
  })


});
