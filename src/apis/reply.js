import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem("token");

export default {
  getReplies({ tweetId }) {
    return apiHelper.get(`/api/tweets/${ tweetId }/replies`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
}