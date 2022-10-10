import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem('token')

export default {
  addFollow({ id }) {
    return apiHelper.post('/api/followships', { id }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  }
}