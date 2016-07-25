var React = require("react")
  , YoutubePlayer = require("../../../utils/players/YoutubePlayer.js")
  , View = require("../../../services/View.js");

module.exports = React.createClass({
  render: function () {
    var video = this.props.video;

    return (<div id={video.id} className="videoPlayer-player" ref="base" />);
  },
  componentDidMount: function () {
    if (this._player) {
      if (this.props.isPaused) {
        this._player.pause();
      }
      else {
        this._player.play();
      }
    }
    else {
      var youtubeID = this.props.video.providerID
        , player = new YoutubePlayer(youtubeID, this.refs["base"]);

      player.on("ended", function () {
        View.videoEnded();
      });

      player.on("error", function () {
        View.nextVideo();
      });

      this._player = player;
    }
  },
  componentWillReceiveProps: function (newProps) {
    if (newProps.isPaused) {
      this._player.pause();
    }
    else {
      this._player.play();
    }
  },
  componentWillUnmount: function () {
    this._player.stop();
    delete this._player;
  }
});
