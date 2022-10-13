import { apiHelper } from "./../utils/helpers";

export default {
  getReplies({ tweetId }) {
    return apiHelper.get(`/api/tweets/${ tweetId }/replies`);
  },
  addReply({ TweetId, comment }) {
    return apiHelper.post(`/api/tweets/${TweetId}/replies`, { comment });
  },
}