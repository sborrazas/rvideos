var React = require("react")
  , VideoPlayer = require("./components/VideoPlayer.jsx")
  , registerComponent = require("./utils/dom/registerComponent.js")
  , global = require("./utils/dom/global.js")
  , View = require("./services/View.js");

registerComponent("videoPlayer", VideoPlayer);

View.init();

global.onArrowLeftPressed(function () {
  View.prevVideo();
});

global.onArrowRightPressed(function () {
  View.nextVideo();
});

global.onSpacebarPressed(function () {
  View.togglePlay();
});
