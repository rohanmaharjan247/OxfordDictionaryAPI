//Install express server
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dictionaryApi = require('./dist/DictionaryApi/assets/dictionary-api/index.js')(app);

// Serve only the static files form the dist directory
app.use("/", express.static(__dirname + "/dist/DictionaryApi"));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/DictionaryApi/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(port, () =>{
  console.log("App listening to: http://localhost:" + port);
});
