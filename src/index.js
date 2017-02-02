import React from "react";
import _ from "lodash";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import VideoPlayer from "./components/VideoPlayer.jsx";
import StaticApp from "components/StaticApp.jsx";
import View from "./services/View.js";
import registerComponent from "./utils/dom/registerComponent.js";
import global from "./utils/dom/global.js";
import VideosStore from "./stores/VideosStore.js";

require("./less/application.less");

// Client render
if (typeof document !== "undefined") {
  const title = global.getTitle();

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
}

// Exported static site renderer:
export default (locals, callback) => {
  const props = { locals: locals };
  const content = ReactDOMServer.renderToStaticMarkup(
    React.createElement(StaticApp, props)
  );

  callback(null, content);
};
