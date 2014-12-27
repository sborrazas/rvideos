var React = require("react")
  , YoutubePlayer = require("../../../utils/players/YoutubePlayer.js")
  , View = require("../../../services/View.js")
  , settings = require("../../../config/settings.js")
  , serializer = require("../../../utils/serializer.js")
  , sprintf = require("../../../utils/sprintf.js")
  , JSON = require("../../../utils/json.js")
  , on = require("../../../utils/dom/on.js")
  , domStyle = require("../../../utils/dom/style.js")
  , domAttr = require("../../../utils/dom/attr.js")
  , OUTER_MARGIN = 150;

module.exports = React.createClass({
  render: function () {
    var video = this.props.video
      , baseURL = sprintf(settings.VIMEO_PLAYER_URL, video.providerID)
      , url = null;

    url = serializer.generateURL(baseURL, {
      autoplay: "1",
      badge: "0",
      byline: "0",
      title: "0"
    });

    return (
      <iframe className="videoPlayer-player videoPlayer-player--vimeo"
              width="100%" height="100%" src={url} frameBorder="0"
              webkitAllowFullscreen="1" mozAllowFullScreen="1"
              allowFullScreen="1"></iframe>
    );
  },
  componentDidMount: function () {
    var self = this
      , el = self.getDOMNode()
      , dimensions = domStyle.getContentBox(el);

    domAttr.set(el, "height", (dimensions.height + OUTER_MARGIN * 2));

    self.messageHandler = on(window, "message", function (event) {
      var data = JSON.parse(event.data);

      switch (data.event) {
        case "ready":
          self._playerReady = true;
          break;
        case "finished":
          View.videoEnded();
          break;
      }
    });
  },
  componentWillReceiveProps: function (newProps) {
    if (newProps.isPaused) {
      this._sendPlayerMessage("pause");
    }
    else {
      this._sendPlayerMessage("play");
    }
  },
  componentWillUnmount: function () {
    this.messageHandler.remove();
    this._sendPlayerMessage("pause");
  },
  _sendPlayerMessage: function (action, value) {
    var el = this.getDOMNode()
      , url = el.src.split("?")[0]
      , data = { method: action };

    if (!this._playerReady) {
      return;
    }

    if (value) {
      data.value = value;
    }

    el.contentWindow.postMessage(JSON.stringify(data), url);
  }
});
