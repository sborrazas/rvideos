var Base = require("./Base.js")
  , classes = require("../../utils/classes.js")
  , settings = require("../../config/settings.js")
  , VideosPlaylist = require("./VideosPlaylist.js");

module.exports = classes.declare(Base, {
  getCurrentPlaylist: function () {
    if (!this._currentPlaylist) {
      this._currentPlaylist = new VideosPlaylist(this._getCurrentPlaylistID());
    }

    return this._currentPlaylist;
  },
  _getCurrentPlaylistID: function () {
    if (!this._currentPlaylistID) {
      this._currentPlaylistID = settings.DEFAULT_SUBREDDIT;
    }

    return this._currentPlaylistID;
  }
});
