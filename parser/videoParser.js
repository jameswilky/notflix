/* 
This tool is meant to be used after youtubeFinder.html tool. this will take a json file and remove unnecassary fields and perge pages into one array
*/

const fs = require("fs");

const parseVideos = (path, type) => {
  return JSON.parse(fs.readFileSync(path))
    .pages.map(video => video.results)
    .reduce((acc, val) => acc.concat(val), [])
    .map(video => {
      delete video.vote_count;
      delete video.video;
      delete video.popularity;
      delete video.poster_path;
      delete video.original_language;
      delete video.original_title;
      delete video.backdrop_path;
      delete video.adult;
      delete video.release_date;
      delete video.original_name;
      delete video.origin_country;
      delete video.first_air_date;
      if (video.title == null) {
        video.title = video.name;
      }
      video.genres = video.genre_ids;
      delete video.genre_ids;
      delete video.name;
      video.type = type;

      return video;
    });
};

movies = parseVideos("./old/movies.json", "movie");
tvShows = parseVideos("./old/tvShows.json", "show");

const videos = [movies, tvShows].reduce((acc, val) => acc.concat(val), []);

fs.writeFileSync("videos.json", JSON.stringify(videos), "utf-8", () => {
  console.log("done");
});
