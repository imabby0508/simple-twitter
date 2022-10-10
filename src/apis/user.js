import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
  // TODO：先用 signin api代替
  getCurrentUser({ account, password }) {
    return apiHelper.post('api/users/signin', {
      account, password
    })
  },
  getPopularUsers () {
    return apiHelper.get('/api/users/popularUsers', {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  getUser({ userId }) {
    // const searchParams = new URLSearchParams({ userId });
    return apiHelper.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getFollowings({ userId }) {
    // const searchParams = new URLSearchParams({ userId });
    return apiHelper.get(`/api/users/${userId}/followings`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getFollowers({ userId }) {
    // const searchParams = new URLSearchParams({ userId });
    return apiHelper.get(`/api/users/${userId}/followers`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getUserTweets({ userId }) {
    // const searchParams = new URLSearchParams({ userId });
    return apiHelper.get(`/api/users/${userId}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
  getUserReplies({ userId }) {
    // const searchParams = new URLSearchParams({ userId });
    return apiHelper.get(`/api/users/${userId}/replied_tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};
