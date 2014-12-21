module.exports = {
  DEFAULT_SUBREDDIT: "videos",
  REDDIT_URL: "http://www.reddit.com",
  SUBREDDIT_URL: "http://www.reddit.com/r/%s.json",
  VIDEOS_PRELOAD_COUNT: 10,
  VIDEO_PROVIDERS: [
    {
      provider: "youtube",
      pattern: /https?:\/\/www\.youtube\.com\/watch\?v=(\w{6,})/
    },
    {
      provider: "youtube",
      pattern: /https?:\/\/youtu\.be\/(\w{6,})/
    }
  ]
};
