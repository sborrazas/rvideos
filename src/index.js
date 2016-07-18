var React = require("react")
  , VideoPlayer = require("./components/VideoPlayer.jsx")
  , registerComponent = require("./utils/dom/registerComponent.js")
  , global = require("./utils/dom/global.js")
  , VideosStore = require("./stores/VideosStore.js")
  , View = require("./services/View.js")
  , title = global.getTitle();

require ("./less/application.less");

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

VideosStore.onChange(function () {
  var video = VideosStore.getCurrentVideo();

  if (video) {
    global.setTitle([title, video.title].join(" — "));
  }
  else {
    global.setTitle(title);
  }
});
