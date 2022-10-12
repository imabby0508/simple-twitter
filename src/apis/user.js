import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
  getCurrentUser() {
    return apiHelper.get('/api/users/currentUser', {
      headers: { Authorization: `Bearer ${getToken()}` },
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
  getUserTweets({ id }) {
    return apiHelper.get(`/api/users/${id}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getUserReplies({ userId }) {
    return apiHelper.get(`/api/users/${userId}/replied_tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getUserLikes({ id }) {
    return apiHelper.get(`/api/users/${ id }/likes`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  update({ userId, formData }) {
    console.log('inside API:', userId);
    for (let [name, value] of formData.entries()) {
      console.log(name + ": " + value);
    }
    return apiHelper.put(`/api/users/${userId}`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  updateSetting({ id, formData }) {
    return apiHelper.put(`/api/users/${id}/account`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
};
