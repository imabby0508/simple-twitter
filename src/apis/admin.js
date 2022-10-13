import { apiHelper } from "@/utils/helpers";

export default {
  adminSignIn({ account, password }) {
    return apiHelper.post('/api/admin/signin', {
      account,
      password
    })
  },
  getTweets() {
    return apiHelper.get('/api/admin/tweets')
  },
  getUsers() {
    return apiHelper.get('/api/admin/users')
  },
  deleteTweet ({id}) {
    return apiHelper.delete(`/api/admin/tweets/${id}`)
  }
}