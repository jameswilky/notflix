export default (function() {
  const sortBy = (videos, field) => {
    //sorts a list of objects by field in alphabetical order
    return videos.sort((a, b) => {
      const A = a[field].toUpperCase();
      const B = b[field].toUpperCase();
      if (A < B) return -1;
      if (A > B) return 1;
      return 0;
    });
  };

  const groupBy = (videos, genres) => {
    // This funcion returns a list of objects that map each genre to all vidoes of that genre
    // The genre of each video is considered to be the first item from the genres array
    return genres.map(genre => {
      //genres[0] will select first genre from list of genres
      return { [genre]: videos.filter(video => video.genres[0] === genre) };
    });
  };

  const addEvent = function(object, type, callback) {
    if (object == null || typeof object == "undefined") return;
    if (object.addEventListener) {
      object.addEventListener(type, callback, false);
    } else {
      object["on" + type] = callback;
    }
  };
  const removeEvent = function(object, type, callback) {
    if (object == null || typeof object == "undefined") return;
    if (object.removeEventListener) {
      object.removeEventListener(type, callback, false);
    } else {
      object["on" + type] = callback;
    }
  };

  return { sortBy, groupBy, addEvent, removeEvent, groupBy };
})();
