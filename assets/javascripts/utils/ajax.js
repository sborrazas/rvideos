var Promise = require("./Promise.js")
  , window = require("./window.js")
  , serializer = require("./serializer.js")
  , document = require("./dom/document.js")
  , json = require("./json.js")
  , XMLHttpRequest = window.XMLHttpRequest
  , CALLBACKS_PREFIX = "app_"
  , Math = require("./Math.js")
  , doRequest = null;

doRequest = function (method, url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();

    request.open(method, url, true);
    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        resolve(json.parse(request.responseText));
      }
      else {
        reject();
      }
    };
    request.onerror = function () {
      reject();
    };

    request.send();
  });
};

module.exports = {
  get: function (url) {
    return doRequest("GET", url);
  },
  getCrossOrigin: function (url, params, options) {
    return new Promise(function (resolve, reject) {
      var scriptEl = document.createElement("script")
        , randomSuffix = Math.floor(Math.random() * 100000000)
        , callbackName = null;

      options = options || {};
      callbackName = options.callbackName || (CALLBACKS_PREFIX + randomSuffix);

      params = params || {};
      params.callback = callbackName;

      url = serializer.generateURL(url, params);

      window[callbackName] = function (data) {
        if (options.globalName) {
          resolve(window[options.globalName]);
        }
        else {
          resolve(data);
        }
      };

      scriptEl.async = true;
      scriptEl.src = url;
      scriptEl.addEventListener("load", function () {
        scriptEl.remove();
      });
      scriptEl.addEventListener("error", function () {
        scriptEl.remove();
        reject();
      });

      document.body.appendChild(scriptEl);
    });
  }
};
