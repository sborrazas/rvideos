var Base = require("./Base.js")
  , classes = require("../../utils/classes.js")
  , collection = require("../../utils/collection.js")
  , settings = require("../../config/settings.js")
  , Promise = require("../../utils/Promise.js");

module.exports = classes.declare(Base, {
  getCurrentVideo: function () {
    var self = this;

    if (self._currentVideoIndex <= self.getSize()) {
      return Promise.resolve(self._items[self._currentVideoIndex - 1]);
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
  playVideo: function (videoID) {
    var self = this;

    collection.each(this.getItems(), function (index, video) {
      if (video.id === videoID) {
        self._currentVideoIndex = index + 1;
        return false;
      }
    });
  },
  _filterVideos: function (videosData) {
    var self = this
      , videos = [];

    collection.each(videosData, function (_, videoData) {
      var video = self._formatVideo(videoData);

      collection.each(settings.VIDEO_PROVIDERS, function (_, matchInfo) {
        var match = video.url.match(matchInfo.pattern);

        if (match) {
          video.provider = matchInfo.provider;
          video.providerID = match[1];
          video.id = [video.provider, video.providerID].join("-");

          videos.push(video);

          return false;
        }
      });
    });

    self._items = self._items.concat(videos);

    return videos;
  }
});
