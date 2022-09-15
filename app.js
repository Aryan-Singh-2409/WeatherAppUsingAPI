/* jshint esversion:6 */

const express = require("express");
const app = express();
const https = require("https");

const apikey = "358b467b8c2d7bc99459ffb554e9945f"; 

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
}); 

app.post("/", function(req, res){
    // console.log();
    
    const query = req.body.cityName;
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(weatherData);
            console.log(temp);
            const weatherDescription = weatherData.weather[0].description;
            console.log(weatherDescription);
            const icon =  weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in " + query + " is "+ temp +" degree Celsius.</h1>");
            res.write("<h3>The weather is currently " + weatherDescription +".</h3>");
            res.write("<img src=" + imageURL + ">" );
            res.send();
        });
    }) ;
    // console.log("Post request recieved.");
});
app.listen(3000, function() {
    console.log.apply("The server is running on port 3000");
});
