import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
  // TODO：先用 signin api代替
  getCurrentUser({ account, password }) {
    return apiHelper.post("api/users/signin", {
      account,
      password,
    });
  },
  getPopularUsers() {
    return apiHelper.get("/api/users/popularUsers", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getUser({ userId }) {
    return apiHelper.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getFollowings({ userId }) {
    return apiHelper.get(`/api/users/${userId}/followings`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getFollowers({ userId }) {
    return apiHelper.get(`/api/users/${userId}/followers`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getUserTweets({ userId }) {
    return apiHelper.get(`/api/users/${userId}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getUserReplies({ userId }) {
    return apiHelper.get(`/api/users/${userId}/replied_tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getUserLikes({ userId }) {
    return apiHelper.get(`/api/users/${userId}/likes`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};
