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

  const groupBy = key => array =>
    // returns an object of array of objects, grouped by the specified key

    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

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

  return { sortBy, groupBy, addEvent, removeEvent };
})();
