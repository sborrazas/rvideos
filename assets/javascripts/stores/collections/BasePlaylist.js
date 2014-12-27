var Base = require("./Base.js")
  , classes = require("../../utils/classes.js")
  , collection = require("../../utils/collection.js")
  , settings = require("../../config/settings.js");

module.exports = classes.declare(Base, {
  _filterVideos: function (videosData) {
    var self = this
      , videos = [];

    collection.each(videosData, function (_, videoData) {
      video = self._formatVideo(videoData);

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
