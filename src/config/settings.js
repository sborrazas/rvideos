module.exports = {
  VIDEOS_SUBREDDIT: "videos",
  REDDIT_URL: "http://www.reddit.com",
  SUBREDDIT_URL: "http://www.reddit.com/r/%s.json",
  VIDEOS_PRELOAD_COUNT: 10,
  GOOGLE_FEED_API_URL: "http://ajax.googleapis.com/ajax/services/feed/load",
  YOUTUBE_FEED_URL: "http://gdata.youtube.com/feeds/api/standardfeeds/most_popular",
  VIMEO_CHANNEL_URL: "https://vimeo.com/api/v2/channel/%s/videos.json",
  VIMEO_CHANNEL: "staffpicks",
  VIMEO_PLAYER_URL: "https://player.vimeo.com/video/%s",
  VIDEO_PROVIDERS: [
    {
      provider: "youtube",
      pattern: /https?:\/\/www\.youtube\.com\/watch\?v=(\w{6,})/
    },
    {
      provider: "youtube",
      pattern: /https?:\/\/youtu\.be\/(\w{6,})/
    },
    {
      provider: "vimeo",
      pattern: /https?:\/\/vimeo\.com\/(\d+)/
    }
  ],
  NAME: "Videos Worth Watching",
  TAGLINE: "Curated videos — Made by Form & Function",
  DESCRIPTION: "Watch the best videos of the day curated by Youtube, Vimeo and Reddit.",
  KEYWORDS: "best, youtube, reddit, videos, day, vimeo, picks, zapping, player",
  AUTHORS: "Sebastian Borrazas, Santiago Alonso",
};
