import { apiHelper } from "./../utils/helpers";

export default {
  getCurrentUser() {
    return apiHelper.get('/api/users/currentUser');
  },
  getPopularUsers() {
    return apiHelper.get("/api/users/popularUsers");
  },
  getUser({ userId }) {
    return apiHelper.get(`/api/users/${userId}`);
  },
  getFollowings({ userId }) {
    return apiHelper.get(`/api/users/${userId}/followings`);
  },
  getFollowers({ userId }) {
    return apiHelper.get(`/api/users/${userId}/followers`);
  },
  getUserTweets({ id }) {
    return apiHelper.get(`/api/users/${id}/tweets`);
  },
  getUserReplies({ userId }) {
    return apiHelper.get(`/api/users/${userId}/replied_tweets`);
  },
  getUserLikes({ id }) {
    return apiHelper.get(`/api/users/${ id }/likes`);
  },
  update({ userId, formData }) {
    return apiHelper.put(`/api/users/${userId}`, formData);
  },
  updateSetting({ id, formData }) {
    return apiHelper.put(`/api/users/${id}/account`, formData)
  },
};
