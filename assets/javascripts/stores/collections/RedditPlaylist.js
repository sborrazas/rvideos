var BasePlaylist = require("./BasePlaylist.js")
  , classes = require("../../utils/classes.js")
  , ajax = require("../../utils/ajax.js")
  , collection = require("../../utils/collection.js")
  , sprintf = require("../../utils/sprintf.js")
  , serializer = require("../../utils/serializer.js")
  , settings = require("../../config/settings.js")
  , Promise = require("../../utils/Promise.js");

module.exports = classes.declare(BasePlaylist, {
  initialize: function (subreddit) {
    this._items = [];
    this._subreddit = subreddit;
    this._currentVideoIndex = 0;
  },
  getCurrentVideo: function () {
    var self = this;

    if (self._currentVideoIndex < self.getSize()) {
      return Promise.resolve(self._items[self._currentVideoIndex]);
    }
    else {
      return self._loadNext().then(function () {
        return self.getCurrentVideo();
      });
    }
  },
  nextVideo: function () {
    this._currentVideoIndex += 1;
  },
  prevVideo: function () {
    if (this._currentVideoIndex > 0) {
      this._currentVideoIndex -= 1;
    }
  },
  _loadNext: function () {
    var self = this
      , subredditURL = sprintf(settings.SUBREDDIT_URL, self._subreddit)
      , params = { limit: settings.VIDEOS_PRELOAD_COUNT }
      , videos = null;

    if (self._afterToken) {
      params.after = self._afterToken;
    }

    videos = ajax.get(serializer.generateURL(subredditURL, params));

    return videos.then(function (response) {
      self._afterToken = response.data.after;

      return self._filterVideos(response.data.children);
    });
  },
  _formatVideo: function (videoData) {
    return {
      title: videoData.data.title,
      url: videoData.data.url
    };
  }
});
