import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem("token");

export default {
  getTweets() {
    return apiHelper.get("/api/tweets", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getReplies({ tweetId }) {
    return apiHelper.get(`/api/tweets/${ tweetId }/replies`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  addLike({ tweet_id, userId }) {
    return apiHelper.post(`/api/tweets/${ tweet_id }/like`, { userId }, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  deleteLike({ tweet_id, userId }) {
    return apiHelper.post(`/api/tweets/${ tweet_id }/unlike`, { userId }, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  addTweet({ description}) {
    return apiHelper.post('/api/tweets', { description }, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  getTweet({ tweetId }) {
    return apiHelper.get(`/api/tweets/${ tweetId }`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  }
};