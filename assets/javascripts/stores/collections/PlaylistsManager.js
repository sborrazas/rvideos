var Base = require("./Base.js")
  , classes = require("../../utils/classes.js")
  , settings = require("../../config/settings.js")
  , Math = require("../../utils/Math.js")
  , RedditPlaylist = require("./RedditPlaylist.js")
  , YoutubePlaylist = require("./YoutubePlaylist.js")
  , VimeoPlaylist = require("./VimeoPlaylist.js");

module.exports = classes.declare(Base, {
  getCurrentPlaylist: function () {
    return this._getPlaylists()[this._getCurrentPlaylistIndex()];
  },
  _getCurrentPlaylistIndex: function () {
    if (!this._currentPlaylistIndex) {
      this._setCurrentPlaylistIndex();
    }

    return this._currentPlaylistIndex;
  },
  _getPlaylists: function () {
    if (!this._playlists) {
      this._playlists = [
        new YoutubePlaylist()
      ];
    }

    return this._playlists;
  },
  _setCurrentPlaylistIndex: function () {
    var rand = Math.random() * this._getPlaylists().length;

    this._currentPlaylistIndex = Math.floor(rand);
  }
});
