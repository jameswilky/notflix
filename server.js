const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt"); // Validate JWT and set req.user
const jwksRsa = require("jwks-rsa"); // Retrieve RSA keys from a JSON Web Key set (JWKS) endpoint
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/notflixLocalDB",
  // "mongodb+srv://james123:james123@notflix-eiper.mongodb.net/notflixdb?retryWrites=true",
  { useNewUrlParser: true }
);

mongoose.connection
  .on("connected", function() {
    console.log("Successfully connected to Database");
    // mongoose.connection.db.listCollections().toArray(function(err, names) {
    //   console.log(names); // [{ name: 'dbname.myCollection' }]
    //   module.exports.Collection = names;
    // });
  })
  .then(() => console.log("worked"), err => console.log(err));

const Video = require("./video");
const Genre = require("./genre");

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header
  // and the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true, // cache the signing key
    rateLimit: true,
    jwksRequestsPerMinute: 5, // prevent attackers from requesting more than 5 per minute
    jwksUri: `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,

  // This must match the algorithm selected in the Auth0 dashboard under your app's advanced settings under the OAuth tab
  algorithms: ["RS256"]
});

const app = express();

app.get("/public", function(req, res) {
  // res.json({videos})
  // Video.find({}).then(videos =>
  //   Genre.find({}).then(genres => res.status(200).json({ videos, genres }))
  // );
});

app.get("/videos", function(req, res) {
  Video.find({}).then(videos => res.status(200).json(videos));
});
app.get("/genres", function(req, res) {
  Genre.find({}).then(genres => res.status(200).json(genres));
});

app.get("/search", function(req, res) {
  // remove apostrophes
  let query = req.query.q.toLowerCase().replace(/'/, "");

  const filteredVideos = videos.filter(
    video =>
      video.genre
        .toLowerCase()
        .replace(/'/, "")
        .includes(query) ||
      video.title
        .toLowerCase()
        .replace(/'/, "")
        .includes(query)
  );
  res.json({
    videos: filteredVideos,
    query: query
  });
});

app.get("/private", checkJwt, function(req, res) {
  res.json({
    message: "Hello from a private API!"
  });
});

app.listen(3001);
console.log("API server listening on " + process.env.REACT_APP_AUTH0_AUDIENCE);
