// /*
// this tool uploads all the vidoes.json file and genres.json file to the DB
// */

// const fs = require("fs");
// const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb+srv://james123:james123@notflixdb-eiper.mongodb.net/test?retryWrites=true",
//   { useNewUrlParser: true }
// );

// const videoSchema = mongoose.Schema({
//   _id: mongoose.Schema.Types.ObjectId,
//   title: String,
//   type: String,
//   videoId: String,
//   genres: Array,
//   rating: Number,
//   description: String
// });

// const Video = mongoose.model("Video", videoSchema);

// const videos = JSON.parse(fs.readFileSync("./videos.json"));

// const upload = content => {
//   content.forEach(video => {
//     const newVideo = new Video({
//       _id: new mongoose.Types.ObjectId(),
//       title: video.title,
//       type: video.type,
//       videoId: video.videoId,
//       genres: video.genre_ids,
//       rating: video.vote_average,
//       description: video.overview
//     });
//     newVideo
//       .save()
//       .then(response => console.log(response))
//       .catch(err => console.log(err));
//   });
// };

// upload(videos);
