var AppDispatcher = require("../dispatchers/AppDispatcher.js")
  , VIEW_ACTIONS = require("../config/constants.js").VIEW_ACTIONS;

module.exports = {
  init: function () {
    AppDispatcher.handleViewAction({
      actionType: VIEW_ACTIONS.INIT
    });
  },
  playVideo: function () {
    AppDispatcher.handleViewAction({
      actionType: VIEW_ACTIONS.VIDEO_PLAYED
    });
  },
  pauseVideo: function () {
    AppDispatcher.handleViewAction({
      actionType: VIEW_ACTIONS.VIDEO_PAUSED
    });
  },
  videoEnded: function () {
    AppDispatcher.handleViewAction({
      actionType: VIEW_ACTIONS.VIDEO_ENDED
    });
  },
  nextVideo: function () {
    AppDispatcher.handleViewAction({
      actionType: VIEW_ACTIONS.NEXT_VIDEO
    });
  },
  prevVideo: function () {
    AppDispatcher.handleViewAction({
      actionType: VIEW_ACTIONS.PREV_VIDEO
    });
  }
};
