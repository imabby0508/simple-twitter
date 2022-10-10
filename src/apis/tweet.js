import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem("token");

export default {
  getTweets() {
    return apiHelper.get("/api/tweets", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getReplies({ tweetId }) {
    return apiHelper.get(`/api/tweets/${tweetId}/replies`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  addLike({ tweetId }) {
    // const searchParams = new URLSearchParams({ userId });
    return apiHelper.post(`/api/tweets/${tweetId}/like`, null, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};