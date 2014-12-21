var React = require("react")
  , VideoPlayer = require("./components/VideoPlayer.jsx")
  , registerComponent = require("./utils/dom/registerComponent.js")
  , View = require("./services/View.js");

registerComponent("videoPlayer", VideoPlayer);

View.init();
