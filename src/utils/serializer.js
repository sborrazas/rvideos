var object = require("./object.js")
  , global = require("./global.js")
  , serializer = null;

serializer = {
  generateQuery: function (params) {
    var query = [];

    object.each(params, function (key, val) {
      query.push(serializer.encodeURI(key) + "=" + serializer.encodeURI(val));
    });

    return query.join("&");
  },
  generateURL: function (url, params) {
    var query = serializer.generateQuery(params);

    if (query.length > 0) {
      return url + "?" + query;
    }
    else {
      return url;
    }
  },
  encodeURI: function (value) {
    return global.encodeURIComponent(value);
  }
};

module.exports = serializer;
