import { apiHelper } from "./../utils/helpers";

export default {
  addFollow({ id }) {
    return apiHelper.post("/api/followships", { id })
    },
  deleteFollow({followingId}) {
    return apiHelper.delete(`/api/followships/${followingId}`)
  },
};
