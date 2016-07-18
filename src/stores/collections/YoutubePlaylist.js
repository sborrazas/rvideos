var BasePlaylist = require("./BasePlaylist.js")
  , classes = require("../../utils/classes.js")
  , ajax = require("../../utils/ajax.js")
  , serializer = require("../../utils/serializer.js")
  , settings = require("../../config/settings.js")
  , Error = require("../../utils/Error.js");

module.exports = classes.declare(BasePlaylist, {
  initialize: function (subreddit) {
    this._items = [];
    this._currentVideoIndex = 0;
    this._currentPage = 1;
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
