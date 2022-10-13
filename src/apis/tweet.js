import { apiHelper } from "./../utils/helpers";

export default {
  getTweets() {
    return apiHelper.get("/api/tweets");
  },
  getReplies({ tweetId }) {
    return apiHelper.get(`/api/tweets/${ tweetId }/replies`);
  },
  addLike({ tweet_id, userId }) {
    return apiHelper.post(`/api/tweets/${ tweet_id }/like`, { userId });
  },
  deleteLike({ tweet_id, userId }) {
    return apiHelper.post(`/api/tweets/${ tweet_id }/unlike`, { userId });
  },
  addTweet({ description}) {
    return apiHelper.post('/api/tweets', { description })
  },
  getTweet({ tweetId }) {
    return apiHelper.get(`/api/tweets/${ tweetId }`);
  }
};