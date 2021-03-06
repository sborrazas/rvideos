var React = require("react/addons")
  , ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
  , View = require("../../services/View.js")
  , throttler = require("../../utils/throttler.js")
  , CONTROLS_DURATION_MS = 1000;

module.exports = React.createClass({
  getInitialState: function () {
    return {
      visible: false,
      showAnimation: null
    };
  },
  render: function () {
    var playIcon = this.props.isPaused ? "play3" : "pause2"
      , video = this.props.video
      , controls = null;

    if (this.state.visible) {
      controls = (
        <nav className="videoPlayer-controls" key="controls">
          <span className="videoPlayer-control icon icon--previous2"
                onClick={this._goPrev}></span>
          <span className={"videoPlayer-control icon icon--" + playIcon}
                onClick={this._togglePlay}></span>
          <span className="videoPlayer-control icon icon--next2"
                onClick={this._goNext}></span>
          <a href={video.url} className="videoPlayer-title link" target="_blank"
             onClick={this._pauseVideo} title={video.title}>
            {video.title}
          </a>
        </nav>
      );
    }

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="anim_fadeIn"
          component="div"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>

          {controls}
        </ReactCSSTransitionGroup>
      </div>
    );
  },
  componentDidMount: function () {
    this.didMount = true;
    this.show();
  },
  componentWillUnmount: function () {
    this.didMount = false;
  },
  show: function () {
    var self = this
      , animation = self.state.showAnimation;

    if (!animation) {
      animation = throttler(function () {
        if (self.didMount && !self.props.isPaused) {
          self.setState({ visible: false });
        }
      }, CONTROLS_DURATION_MS);
    }

    self.setState({ visible: true, showAnimation: animation });
    animation();
  },
  _goNext: function () {
    View.nextVideo();
  },
  _goPrev: function () {
    View.prevVideo();
  },
  _togglePlay: function () {
    View.togglePlay();
  },
  _pauseVideo: function () {
    View.pauseVideo();
  }
});
