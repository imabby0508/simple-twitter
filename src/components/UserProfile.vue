<template>
  <Spinner v-if="isLoading" />
  <div v-else class="user__profile">
    <div class="user__profile__header">
      <router-link :to="{ name: 'main' }">
        <img src="@/assets/image/arrow.png" alt="arrow" />
      </router-link>
      <div>
        <h4 class="header__name">{{ user.name }}</h4>
        <p class="header__tweet__count">{{ user.tweetCount }}推文</p>
      </div>
    </div>

    <div class="user__profile__content">
      <img
        class="user__cover"
        :src="user.backgroundImage"
        alt="user-cover-img"
      />
      <img class="user__avatar" :src="user.avatar" alt="user-avatar" />
      <template v-if="user.id === currentUser.id">
        <button
          @click.stop.prevent="showUserEditModal()"
          class="modify__profile__btn"
        >
          編輯個人資料
        </button>
      </template>
      <div v-else class="profile__btn">
        <button class="message__btn">
          <img src="@/assets/image/btn_msg.png" alt="message" />
        </button>
        <button class="notfi__btn">
          <img src="@/assets/image/btn_notfi.png" alt="notfi" />
        </button>
        <button
          v-if="user.isFollowed"
          class="following__btn"
          @click.stop.prevent="deleteFollow(user.id)"
        >
          正在跟隨
        </button>
        <button
          v-else
          class="unfollowing__btn"
          @click.stop.prevent="addFollow(user.id)"
        >
          跟隨
        </button>
      </div>

      <div class="user__info">
        <div class="user__name">{{ user.name }}</div>
        <div class="user__account">@{{ user.account }}</div>
        <div class="user__introduction">
          {{ user.introduction }}
        </div>
        <div class="user__follow">
          <router-link
            :to="{ name: 'user-followings', params: { id: user.id } }"
            class="user__follow__num"
            >{{ user.followingCount }}個</router-link
          >
          <p class="following">跟隨中</p>
          <router-link
            :to="{ name: 'user-followers', params: { id: user.id } }"
            class="user__follow__num"
            >{{ user.followerCount }}位</router-link
          >
          <p class="follower">跟隨者</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import userAPI from "./../apis/user";
import followshipAPI from "./../apis/followship";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

// const dummyUser = {
//   user: {
//     id: 1,
//     tweetCount: 25,
//     backgroundImage: '@/assets/image/user-cover.png',
//     image: '@/assets/image/avatar-1.png',
//     name: 'John Doe',
//     account: 'heyjohn',
//     introduction: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
//     followingCount: 34,
//     followerCount: 59,
//     isFollow: false
//   },
//   currentUser: {
//     id: 74,
//   }
// }

export default {
  components: {
    Spinner,
  },
  props: {
    isUpdated: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      user: {
        id: -1,
        account: "",
        name: "",
        avatar: "",
        introduction: "",
        backgroundImage: "",
        tweetCount: "",
        followerCount: "",
        followingCount: "",
        isFollowed: false,
      },
      isLoading: true,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUser(userId);
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log('to', to)
  //   console.log('from', from)
  //   next()
  // },

  watch: {
    isUpdated(newValue, oldValue) {
      if (this.user.id === this.currentUser.id) {
        this.fetchUser(this.user.id);
      } else {
        return;
      }
    },
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await userAPI.getUser({ userId });
        const {
          id,
          account,
          name,
          avatar,
          introduction,
          backgroundImage,
          tweetCount,
          followerCount,
          followingCount,
          isFollowed,
        } = data;

        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.user = {
          ...this.user,
          id,
          account,
          name,
          avatar,
          introduction,
          backgroundImage,
          tweetCount,
          followerCount,
          followingCount,
          isFollowed,
        };
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },

    showUserEditModal() {
      this.$emit("after-click-button");
    },
    async addFollow(userId) {
      try {
        const { data } = await followshipAPI.addFollow({ id: userId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        if (userId === this.user.id) {
          this.user = {
            ...this.user,
            isFollowed: true,
            followerCount: this.user.followerCount + 1,
          };
        } else {
          return user;
        }
      } catch (error) {
        console.error("error", error);
        Toast.fire({
          icon: "error",
          title: "無法追蹤使用者，請稍後再試",
        });
      }
    },
    async deleteFollow(userId) {
      try {
        const { data } = await followshipAPI.deleteFollow(userId);

        if (data.status === "error") {
          throw new Error(data.message);
        }

        if (userId === this.user.id) {
          this.user = {
            ...this.user,
            isFollowed: false,
            followerCount: this.user.followerCount - 1,
          };
        } else {
          return user;
        }
      } catch (error) {
        console.error("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤使用者，請稍後再試",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user__profile__header {
  display: flex;
  padding: 16px 0;
  img {
    width: 17px;
    height: 14px;
    margin: 14px 20px 14px 28px;
  }
  .header__name {
    color: $scale-gray10;
    font-size: 18px;
    font-weight: 700;
  }
  .header__tweet__count {
    color: $secondary-gray;
    font-size: 13px;
    font-weight: 500;
  }
}
.user__profile__content {
  position: relative;
  .user__cover {
    height: 200px;
    object-fit: cover;
    object-position: center;
  }
  .user__avatar {
    position: absolute;
    top: 124px;
    left: 16px;
    width: 140px;
    height: 140px;
    border: 4px solid $scale-gray1;
    border-radius: 50%;
  }
  .profile__btn {
    position: absolute;
    top: 216px;
    right: 16px;
    display: flex;
    .message__btn,
    .notfi__btn {
      width: 50px;
      height: 40px;
    }
    .following__btn {
      width: 96px;
      height: 40px;
      margin-left: 5px;
      border-radius: 50px;
      background: $brand-orange;
      font-weight: 400;
      font-size: 16px;
      color: $scale-gray1;
    }
    .unfollowing__btn {
      width: 64px;
      height: 40px;
      margin-left: 5px;
      border-radius: 50px;
      border: 1px solid $brand-orange;
      background: $scale-gray1;
      font-weight: 400;
      font-size: 16px;
      color: $brand-orange;
    }
  }

  .modify__profile__btn {
    position: absolute;
    top: 216px;
    right: 16px;
    color: $brand-orange;
    border: 1px solid $brand-orange;
    border-radius: 50px;
    width: 128px;
    height: 40px;
    font-size: 16px;
    font-weight: 400;
  }
  .user__info {
    padding: 72px 16px 16px 16px;
    .user__name {
      color: $scale-gray10;
      font-size: 18px;
      font-weight: 700;
    }
    .user__account {
      color: $secondary-gray;
      font-size: 14px;
      font-weight: 400;
    }
    .user__introduction {
      color: $scale-gray10;
      font-size: 14px;
      font-weight: 400;
      margin: 8px 0;
    }
    .user__follow {
      display: flex;
      font-size: 14px;
      font-weight: 400;
      color: $secondary-gray;
      .user__follow__num {
        color: $scale-gray10;
      }
      .following {
        margin-right: 20px;
      }
    }
  }
}
</style>
