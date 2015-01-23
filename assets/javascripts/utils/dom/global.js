var window = require("../window.js")
  , on = require("./on.js")
  , KEYS_MAP = {
      ARROW_RIGHT: 39,
      ARROW_LEFT: 37,
      SPACEBAR: 32
    };

module.exports = {
  onArrowRightPressed: function (callback) {
    return on(window, "keydown", function (event) {
      if (event.keyCode === KEYS_MAP.ARROW_RIGHT) {
        callback(event);
      }
    });
  },
  onArrowLeftPressed: function (callback) {
    return on(window, "keydown", function (event) {
      if (event.keyCode === KEYS_MAP.ARROW_LEFT) {
        callback(event);
      }
    });
  },
  onSpacebarPressed: function (callback) {
    return on(window, "keydown", function (event) {
      if (event.keyCode === KEYS_MAP.SPACEBAR) {
        callback(event);
      }
    });
  }
};
