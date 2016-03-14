var express = require("express"),
	request = require("request"),
	ejs = require("ejs");

var app = express();
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', function(req, res){
	res.render('index');
});

app.get('/api/menu/', function(req, res){
	request("https://ba-js-test.herokuapp.com/api/menu_next_week", function(error, response, body){
		if(!error && response.statusCode === 200) {
			var json = JSON.parse(body);
			res.send(json.two_person_plan.recipes);
		} else {
			res.send({"error": error, "status": response.statusCode});
		}
	});
});


app.listen(process.env.PORT || 5000, function() {
	console.log("Listening on port "+ this.address().port);
});
