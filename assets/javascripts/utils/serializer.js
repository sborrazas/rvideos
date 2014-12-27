var object = require("./object.js")
  , window = require("./window.js");

module.exports = {
  generateQuery: function (params) {
    var query = [];

    object.each(params, function (key, val) {
      query.push(this.encodeURI(key) + "=" + this.encodeURI(val));
    });

    return query.join("&");
  },
  generateURL: function (url, params) {
    var query = this.generateQuery(params);

    if (query.length > 0) {
      return url + "?" + query;
    }
    else {
      return url;
    }
  },
  encodeURI: function (value) {
    return window.encodeURIComponent(value);
  }
};
