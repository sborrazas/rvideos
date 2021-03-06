var React = require("react")
  , ajax = require("../utils/ajax.js")
  , VideosStore = require("../stores/VideosStore.js")
  , VideoPlayerControls = require("./VideoPlayer/Controls.jsx")
  , PLAYERS_MAP = {
      "youtube": require("./VideoPlayer/players/YoutubePlayer.jsx"),
      "vimeo": require("./VideoPlayer/players/VimeoPlayer.jsx")
    };

module.exports = React.createClass({
  getInitialState: function () {
    return {
      video: VideosStore.getCurrentVideo(),
      isLoading: VideosStore.isLoading(),
      isPaused: VideosStore.isPaused()
    };
  },
  componentDidMount: function () {
    VideosStore.onChange(this._onChange);
  },
  componentWillUnmount: function () {
    VideosStore.removeOnChangeListener(this._onChange);
  },
  render: function () {
    var video = this.state.video
      , controls = null
      , player = null
      , loader = null;

    if (this.state.isLoading) {
      loader = (<div className="videoPlayer-loader">Loading...</div>);
    }
    else if (video) {
      controls = (
        <VideoPlayerControls isPaused={this.state.isPaused} ref="controls"
                             video={video} />
      );
    }

    if (video) {
      player = React.createElement(PLAYERS_MAP[video.provider], {
        key: video.id,
        refs: "player",
        video: video,
        isPaused: this.state.isPaused
      });
    }

    return (
      <div className="videoPlayer">
        <div className="videoPlayer-screen" onMouseMove={this._showControls}
             onTouchStart={this._showControls}></div>

        {player}
        {controls}
        {loader}
      </div>
    );
  },
  _onChange: function () {
    this.setState({
      video: VideosStore.getCurrentVideo(),
      isLoading: VideosStore.isLoading(),
      isPaused: VideosStore.isPaused()
    });
  },
  _showControls: function () {
    var controls = this.refs["controls"];

    if (controls) {
      controls.show();
    }
  }
});
