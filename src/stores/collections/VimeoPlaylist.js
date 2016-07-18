var BasePlaylist = require("./BasePlaylist.js")
  , classes = require("../../utils/classes.js")
  , ajax = require("../../utils/ajax.js")
  , sprintf = require("../../utils/sprintf.js")
  , settings = require("../../config/settings.js");

module.exports = classes.declare(BasePlaylist, {
  initialize: function (channel) {
    this._items = [];
    this._currentVideoIndex = 0;
    this._currentPage = 1;
    this._channel = channel;
  },
  _loadNext: function () {
    var self = this
      , vimeoURL = sprintf(settings.VIMEO_CHANNEL_URL, self._channel)
      , params = { page: self._currentPage }
      , videos = null;

    videos = ajax.getCrossOrigin(vimeoURL, params);

    return videos.then(function (response) {
      self._currentPage += 1;

      return self._filterVideos(response);
    });
  },
  _formatVideo: function (videoData) {
    return {
      title: videoData.title,
      url: videoData.url
    };
  }
});
