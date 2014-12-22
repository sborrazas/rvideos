var React = require("react")
  , View = require("../../services/View.js");

module.exports = React.createClass({
  render: function () {
    return (
      <nav className="videoPlayer-controls">
        <ul className="videoPlayer-controlsList">
          <li className="videoPlayer-control" onClick={this._goPrev}>Prev</li>
          <li className="videoPlayer-control" onClick={this._mainAction}>
            {this.props.isPaused ? "Play" : "Pause"}
          </li>
          <li className="videoPlayer-control" onClick={this._goNext}>Next</li>
        </ul>
      </nav>
    );
  },
  _goNext: function () {
    View.nextVideo();
  },
  _goPrev: function () {
    View.prevVideo();
  },
  _mainAction: function () {
    if (this.props.isPaused) {
      View.playVideo();
    }
    else {
      View.pauseVideo();
    }
  }
});
