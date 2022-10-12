import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem("token");

export default {
  getReplies({ tweetId }) {
    return apiHelper.get(`/api/tweets/${ tweetId }/replies`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  addReply({ TweetId, comment }) {
    return apiHelper.post(`/api/tweets/${TweetId}/replies`, { comment }, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
}