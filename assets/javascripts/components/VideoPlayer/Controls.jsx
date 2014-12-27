var React = require("react")
  , View = require("../../services/View.js");

module.exports = React.createClass({
  render: function () {
    var playIcon = this.props.isPaused ? "play3" : "pause2";

    return (
      <nav className="videoPlayer-controls">
        <div className="videoPlayer-controlsList">
          <span className="videoPlayer-control icon icon--previous2"
                onClick={this._goPrev}></span>
          <span className={"videoPlayer-control icon icon--" + playIcon}
                onClick={this._togglePlay}></span>
          <span className="videoPlayer-control icon icon--next2"
                onClick={this._goNext}></span>
        </div>
      </nav>
    );
  },
  _goNext: function () {
    View.nextVideo();
  },
  _goPrev: function () {
    View.prevVideo();
  },
  _togglePlay: function () {
    if (this.props.isPaused) {
      View.playVideo();
    }
    else {
      View.pauseVideo();
    }
  }
});
