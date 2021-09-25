const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.listen(process.env.PORT || 3000, function(){
  console.log("up and running on 3000")
});

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){

  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: "nome",
          LNAME: "cognome"
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data)

  const url = "https://us5.api.mailchimp.com/3.0/lists/3b1a1b8e98"
  const option = {
    method: "POST",
    auth: "rob:8692b1a117930ed6ac707f97045507db-us5",

  }

  const request = https.request(url, option, function(response){

    if (response.statusCode == 200){
      res.sendFile(__dirname + "/success.html")
    }else{
      res.sendFile(__dirname + "/failure.html")
    }
    response.on("data",function(data){
      console.log(JSON.parse(data))
    })
  })

  request.write(jsonData);
  request.end();

});



//API Key
//8692b1a117930ed6ac707f97045507db-us5

//Audience ID
//3b1a1b8e98
