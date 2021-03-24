//Install express server
const express = require("express");
const path = require("path");
const cors = require("cors");
const https = require('https');
const axios = require('axios');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.port || 8082;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const dictionaryApi = "https://od-api.oxforddictionaries.com/api/v2";

// const whitelist = ['https://od-api.oxforddictionaries.com/api/v2'];

// const corsOptions = {
//   origin: function(origin, callback) {
//     if(!origin){
//       return callback(null, true);
//     }

//     if(whitelist.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not allow access from the specified origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }

//app.use(cors(corsOptions));

// Serve only the static files form the dist directory
app.use("/", express.static("dist/DictionaryApi"));

// app.get('/*', function(req,res) {

// res.sendFile(path.join(__dirname+'/dist/DictionaryApi/index.html'));
// });

app.get("/test", (req, res) => {
  res.send({ message: "Ok", result: true });
});


app.get(`/dictionarysearch/:language/:wordId`, async (req, res) => {

  const language = req.params.language;
  const wordId = req.params.wordId;

  const app_id = req.headers.app_id;
  const app_key = req.headers.app_key;

  const apiUrl = `${dictionaryApi}/entries/${language}/${wordId.toLowerCase()}`;

  const response = await axios.get(apiUrl, {
    headers:  {
      'app_id': app_id,
      'app_key': app_key
    }
  })
   res.send(response.data);
});

// Start the app by listening on the default Heroku port
app.listen(port, () => {
  console.log("app is started and listening to port " + port);
});
