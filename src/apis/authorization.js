import { apiHelper } from "@/utils/helpers";

export default {
  signIn({ account, password }) {
    return apiHelper.post('/api/users/signin', {
      account,
      password
    })
  },
  signUp(data) {
    return apiHelper.post('/api/users', {
      ...data
    })
  }
}