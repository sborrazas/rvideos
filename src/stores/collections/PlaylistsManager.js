var Base = require("./Base.js")
  , classes = require("../../utils/classes.js")
  , settings = require("../../config/settings.js")
  , Math = require("../../utils/Math.js")
  , stack = require("../../utils/localStorage/stack.js")
  , RedditPlaylist = require("./RedditPlaylist.js")
  , YoutubePlaylist = require("./YoutubePlaylist.js")
  , VimeoPlaylist = require("./VimeoPlaylist.js")
  , STACK_NAME = "rvideos-playlist";

module.exports = classes.declare(Base, {
  getCurrentVideo: function () {
    return this._getCurrentPlaylist().getCurrentVideo();
  },
  prevVideo: function () {
    var prevVideo = null
      , playlist = null;

    stack.pop(STACK_NAME);
    prevVideo = stack.top(STACK_NAME);

    if (prevVideo) {
      this._currentPlaylistIndex = prevVideo.playlistIndex;
      playlist = this._getCurrentPlaylist();
      playlist.playVideo(prevVideo.videoID);
    }
  },
  nextVideo: function () {
    var playlistIndex = null
      , playlist = null;

    playlistIndex = this._getRandomPlaylistIndex();
    this._currentPlaylistIndex = playlistIndex;
    playlist = this._getCurrentPlaylist();
    playlist.nextVideo();

    playlist.getCurrentVideo().then(function (video) {
      stack.push(STACK_NAME, {
        playlistIndex: playlistIndex,
        videoID: video.id
      });
    });
  },
  _getCurrentPlaylist: function () {
    return this._getPlaylists()[this._getCurrentPlaylistIndex()];
  },
  _getCurrentPlaylistIndex: function () {
    if (!this._currentPlaylistIndex) {
      this._currentPlaylistIndex = this._getRandomPlaylistIndex();
    }

    return this._currentPlaylistIndex;
  },
  _getPlaylists: function () {
    if (!this._playlists) {
      this._playlists = [
        new YoutubePlaylist(),
        new RedditPlaylist(settings.VIDEOS_SUBREDDIT),
        new VimeoPlaylist(settings.VIMEO_CHANNEL)
      ];
    }

    return this._playlists;
  },
  _getRandomPlaylistIndex: function () {
    return Math.floor(Math.random() * this._getPlaylists().length);
  }
});
