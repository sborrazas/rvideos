var BasePlaylist = require("./BasePlaylist.js")
  , classes = require("../../utils/classes.js")
  , ajax = require("../../utils/ajax.js")
  , sprintf = require("../../utils/sprintf.js")
  , serializer = require("../../utils/serializer.js")
  , settings = require("../../config/settings.js");

module.exports = classes.declare(BasePlaylist, {
  initialize: function (subreddit) {
    this._items = [];
    this._subreddit = subreddit;
    this._currentVideoIndex = 0;
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
