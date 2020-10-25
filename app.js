const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/signup.html");
});
app.post("/", function(req, res){
const firstname = req.body.fName;
const lastname = req.body.LName;
const email = req.body.email;

const data = {
	members:[
	{
		email_address: email,
		status: "subscribed",
		merge_fields: {
			FNAME: firstname,
			LNAME: lastname,
		}

	}


	]


};



const jsonData = JSON.stringify(data);

const url =  "https://us2.api.mailchimp.com/3.0/lists/27fd9afbe4";
const options = {
  method: "POST",
  auth: "sandy1:d76d5b4315772745f80bcf54c15975e0-us2"
}

const request =  https.request(url, options, function(response) {

if (response.statusCode === 200){
	res.sendFile(__dirname + "/success.html");

}else{
	res.sendFile(__dirname + "/failure.html");
}

 response.on("data", function(data){
 	console.log(JSON.parse(data));
 })
})

request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res){
	res.redirect("/");

});
app.listen(3000, function(){
	console.log("server is on 3000");

});






//api key
//d76d5b4315772745f80bcf54c15975e0-us2

//id
//27fd9afbe4