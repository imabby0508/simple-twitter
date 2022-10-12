import moment from "moment";

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).fromNow() : "-";
    },
  },
};

export const timeFormatFilter = {
  filters: {
    timeFormat(datetime) {
      moment.locale("zh-tw");
      return datetime
        ? moment(datetime).format("A hh:mm ・ YYYY年MM月DD日")
        : "-";
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