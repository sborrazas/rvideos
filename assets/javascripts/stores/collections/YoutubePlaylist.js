var BasePlaylist = require("./BasePlaylist.js")
  , classes = require("../../utils/classes.js")
  , ajax = require("../../utils/ajax.js")
  , collection = require("../../utils/collection.js")
  , serializer = require("../../utils/serializer.js")
  , settings = require("../../config/settings.js")
  , Promise = require("../../utils/Promise.js")
  , Error = require("../../utils/Error.js");

module.exports = classes.declare(BasePlaylist, {
  initialize: function (subreddit) {
    this._items = [];
    this._currentVideoIndex = 0;
    this._currentPage = 1;
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
      , feedParams = null
      , videos = null;

    feedParams = {
      "start-index": (self._currentPage - 1) * settings.VIDEOS_PRELOAD_COUNT + 1,
      "max-results":  settings.VIDEOS_PRELOAD_COUNT
    };

    videos = ajax.getCrossOrigin(settings.GOOGLE_FEED_API_URL, {
      num: settings.VIDEOS_PRELOAD_COUNT,
      v: "1.0",
      q: serializer.generateURL(settings.YOUTUBE_FEED_URL, feedParams)
    });

    return videos.then(function (response) {
      if (response.responseStatus !== 200) {
        throw new Error("Couldn't load feed videos.");
      }

      self._currentPage += 1;

      return self._filterVideos(response.responseData.feed.entries);
    });
  },
  _formatVideo: function (videoData) {
    return {
      title: videoData.title,
      url: videoData.link
    };
  }
});
