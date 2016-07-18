var ajax = require("../ajax.js")
  , classes = require("../classes.js")
  , EventEmitter = require("../events.js").EventEmitter
  , style = require("../dom/style.js")
  , YouTube = null;

YouTube = ajax.getCrossOrigin("https://www.youtube.com/iframe_api", {}, {
  callbackName: "onYouTubeIframeAPIReady",
  globalName: "YT"
});

module.exports = classes.declare(EventEmitter, {
  initialize: function (youtubeID, el) {
    this._youtubeID = youtubeID;
    this._el = el;

    this.play();
  },
  play: function () {
    this._player().then(function (player) {
      if (player.playVideo) {
        player.playVideo();
      }
      else {
        player.addEventListener("ready", function (event) {
          event.target.playVideo();
        });
      }
    });
  },
  pause: function () {
    this._player().then(function (player) {
      player.pauseVideo();
    });
  },
  stop: function () {
    var self = this;

    self._player().then(function (player) {
      player.stopVideo();
      delete self._ytPlayer;
    });
  },
  _player: function () {
    var self = this
      , dimensions = style.getContentBox(this._el);

    return YouTube.then(function (YT) {
      if (self._ytPlayer) {
        return Promise.resolve(self._ytPlayer);
      }
      else {
        self._ytPlayer = new YT.Player(self._el, {
          videoId: self._youtubeID,
          width: dimensions.width,
          height: dimensions.height,
          playerVars: {
            controls: 0,
            autoplay: 1,
            disablekb: 1,
            iv_load_policy: 3,
            showinfo: 0
          },
          events: {
            onStateChange: function (event) {
              if (event.data === YT.PlayerState.ENDED) {
                self.emit("ended", event);
              }
            },
            onError: function () {
              self.emit("error");
            }
          }
        });

        return self._player();
      }
    });
  }
});
