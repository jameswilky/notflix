// const genres = ["Horror", "Action", "Comedy", "Documentary", "Thriller"];
// const videos = [
//   {
//     id: 299534,
//     vote_average: 8.5,
//     title: "Avengers: Endgame",
//     overview:
//       "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
//     videoId: "TcMBFSGVi1c",
//     genres: ["Horror", "Action", "Comedy"],
//     type: "movie"
//   },
//   {
//     id: 447404,
//     vote_average: 7,
//     title: "Pokémon Detective Pikachu",
//     overview:
//       "In a world where people collect pocket-size monsters (Pokémon) to do battle, a boy comes across an intelligent monster who seeks to be a detective.",
//     videoId: "1roy4o4tqQM",
//     genres: ["Horror", "Documentary"],
//     type: "movie"
//   },
//   {
//     id: 458156,
//     vote_average: 7.8,
//     title: "John Wick: Chapter 3 – Parabellum",
//     overview:
//       "In this third installment of the adrenaline-fueled action franchise, super-assassin John Wick returns with a $14 million price tag on his head and an army of bounty-hunting killers on his trail. After killing a member of the shadowy international assassin’s guild, the High Table, John Wick is excommunicado, but the world’s most ruthless hit men and women await his every turn.",
//     videoId: "pU8-7BX9uxs",
//     genres: ["Action"],
//     type: "show"
//   },
//   {
//     id: 543103,
//     vote_average: 5.3,
//     title: "Kamen Rider Heisei Generations FOREVER",
//     overview:
//       "In the world of Sougo Tokiwa and Sento Kiryu, their \"companions\" are losing their memories one after the other as they're replaced by other people. The Super Time Jacker, Tid , appears before them. He orders his powerful underlings, Another Double and Another Den-O, to pursue a young boy called Shingo. While fighting to protect Shingo, Sougo meets Ataru, a young man who loves Riders, but Ataru says that Kamen Riders aren't real. What is the meaning of those words? While the mystery deepens, the true enemy that Sougo and Sento must defeat appears in the Kuriogatake mountain...",
//     videoId: "HgCE4MWCN5w",
//     genres: ["Thriller", "Action"],
//     type: "movie"
//   }
// ];
// // console.log(genres);
// // console.log(videos);

// const groupBy = (videos, genres) => {
//   return genres.map(genre => {
//     return { [genre]: videos.filter(video => video.genres[0] === genre) };
//   });
// };

const genres = [
  {
    id: 10759,
    name: "Action & Adventure"
  },
  {
    id: 10762,
    name: "Kids"
  },
  {
    id: 10763,
    name: "News"
  },
  {
    id: 10764,
    name: "Reality"
  },
  {
    id: 10765,
    name: "Sci-Fi & Fantasy"
  },
  {
    id: 10766,
    name: "Soap"
  },
  {
    id: 10767,
    name: "Talk"
  },
  {
    id: 10768,
    name: "War & Politics"
  },
  {
    id: 37,
    name: "Western"
  },
  {
    id: 28,
    name: "Action"
  },
  {
    id: 12,
    name: "Adventure"
  },
  {
    id: 16,
    name: "Animation"
  },
  {
    id: 35,
    name: "Comedy"
  },
  {
    id: 80,
    name: "Crime"
  },
  {
    id: 99,
    name: "Documentary"
  },
  {
    id: 18,
    name: "Drama"
  },
  {
    id: 10751,
    name: "Family"
  },
  {
    id: 14,
    name: "Fantasy"
  },
  {
    id: 36,
    name: "History"
  },
  {
    id: 27,
    name: "Horror"
  },
  {
    id: 10402,
    name: "Music"
  },
  {
    id: 9648,
    name: "Mystery"
  },
  {
    id: 10749,
    name: "Romance"
  },
  {
    id: 878,
    name: "Science Fiction"
  },
  {
    id: 10770,
    name: "TV Movie"
  },
  {
    id: 53,
    name: "Thriller"
  },
  {
    id: 10752,
    name: "War"
  },
  {
    id: 37,
    name: "Western"
  }
];

console.log(
  genres.map(object => {
    return {
      name: object.name
    };
  })
);
