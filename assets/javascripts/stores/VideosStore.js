var object = require("../utils/object.js")
  , AppDispatcher = require("../dispatchers/AppDispatcher.js")
  , VIEW_ACTIONS = require("../config/constants.js").VIEW_ACTIONS
  , Store = require("../utils/Store.js")
  , Playlists = require("./collections/Playlists.js")
  , store = new Store(AppDispatcher);

object.extends(store, {
  getCurrentVideo: function () {
    return this._currentVideo;
  },
  isLoading: function () {
    return this._isLoading;
  },
  isPaused: function () {
    return this._isPaused;
  },
  onChange: function (callback) {
    this.on("change", callback);
  },
  removeOnChangeListener: function (callback) {
    this.off("change", callback);
  },
  _playlists: new Playlists(),
  _isLoading: false,
  _isPaused: false,
  _dispatcherToken: AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
      case VIEW_ACTIONS.INIT:
        store._loadVideo();
        break;
      case VIEW_ACTIONS.VIDEO_PLAYED:
        store._play();
        break;
      case VIEW_ACTIONS.VIDEO_PAUSED:
        store._pause();
        break;
      case VIEW_ACTIONS.VIDEO_ENDED:
        store._next();
        break;
      case VIEW_ACTIONS.NEXT_VIDEO:
        store._next();
        break;
      case VIEW_ACTIONS.PREV_VIDEO:
        store._prev();
        break;
    }
  }),
  _loadVideo: function () {
    var self = this
      , video = null;

    if (self._isLoading) {
      return;
    }

    self._isLoading = true;
    self.emit("change");

    video = self._playlists.getCurrentPlaylist().getCurrentVideo();

    video.then(function (video) {
      self._currentVideo = video;
    });

    video.catch(function (e) { // TODO: Better handling (alert message?)
      alert("An error ocurred while trying to load videos from Reddit.");
    });

    video.fin(function () {
      self._isLoading = false;
      self._isPaused = false;
      self.emit("change");
    });
  },
  _play: function () {
    if (this._isPaused) {
      this._isPaused = false;
      this.emit("change");
    }
  },
  _pause: function () {
    if (!this._isPaused) {
      this._isPaused = true;
      this.emit("change");
    }
  },
  _next: function () {
    this._playlists.getCurrentPlaylist().nextVideo();
    this._loadVideo();
  },
  _prev: function () {
    this._playlists.getCurrentPlaylist().prevVideo();
    this._loadVideo();
  }
});

module.exports = store;
