var Base = require("./Base.js")
  , classes = require("../../utils/classes.js")
  , ajax = require("../../utils/ajax.js")
  , collection = require("../../utils/collection.js")
  , sprintf = require("../../utils/sprintf.js")
  , serializer = require("../../utils/serializer.js")
  , settings = require("../../config/settings.js")
  , Promise = require("../../utils/Promise.js");

module.exports = classes.declare(Base, {
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
      , subredditURL = sprintf(settings.SUBREDDIT_URL, this._subreddit)
      , params = { limit: settings.VIDEOS_PRELOAD_COUNT }
      , videos = null;

    if (self._afterToken) {
      params.after = self._afterToken;
    }

    videos = ajax.get(serializer.encodeURL(subredditURL, params));

    return videos.then(function (videosData) {
      self._afterToken = videosData.data.after;

      return self._filterVideos(videosData.data.children);
    }).then(function (newVideos) {
      self._items = self._items.concat(newVideos);
    });
  },
  _filterVideos: function (videosData) {
    var videos = [];

    collection.each(videosData, function (_, videoData) {
      videoData = videoData.data;

      collection.each(settings.VIDEO_PROVIDERS, function (_, matchInfo) {
        var match = videoData.url.match(matchInfo.pattern);

        if (match) {
          videos.push({
            id: videoData.name,
            title: videoData.title,
            url: videoData.url,
            provider: matchInfo.provider,
            providerID: match[1]
          });

          return false;
        }
      });
    });

    return videos;
  }
});
