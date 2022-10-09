import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
  getUser({ userId }) {
    const searchParams = new URLSearchParams({ userId })
    return apiHelper.get(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}`}
    });
  },
  getFollowings({ userId }) {
    const searchParams = new URLSearchParams({ userId });
    return apiHelper.get(`/api/users/${userId}/followings`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  }
};
