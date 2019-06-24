const fetch = require("node-fetch");
const fs = require("fs");

/* This module will search movieDB API for a list of movies and tv shows, and then output them in to the input folder*/
const createArray = n => {
  let output = [];
  let length = n; // user defined length

  for (let i = 1; i < length; i++) {
    output.push(i);
  }
  return output;
};
const showURL = n =>
  `https://api.themoviedb.org/3/discover/tv?api_key=${
    process.env.MOVIE_DB_API_KEY
  }&language=en-US&sort_by=popularity.desc&page=${n}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_original_language=en`;

const movieURL = n =>
  `https://api.themoviedb.org/3/discover/movie?api_key=${
    process.env.MOVIE_DB_API_KEY
  }&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${n}&with_original_language=en`;

const getData = (url, dest, limit) => {
  const output = createArray(limit);
  Promise.all(output.map(i => fetch(url(i)))).then(responses => {
    Promise.all(responses.map(res => res.json())).then(data =>
      fs.writeFileSync(dest, JSON.stringify(data), "utf-8", () => {
        console.log("done");
      })
    );
  });
};

getData(showURL, "./input/tvShow.json", 5);
getData(movieURL, "./input/movies.json", 5);
