import moment from "moment";

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : "-";
    },
  },
};

export const emptyAvatarFilter = {
  filters: {
    emptyAvatar (src) {
      return src || 'https://i.postimg.cc/zDyBsYX4/img.png'
    }
  },
};