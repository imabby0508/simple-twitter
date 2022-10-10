<template>
  <div class="follow__card__wrapper">
    <template v-if="$route.name === 'user-followers'">
      <div
        v-for="follower in followers"
        :key="follower.id"
        class="follow__card"
      >
        <div class="follow__card__content">
          <div class="follow__card__title">
            <div class="follow__card__title__info">
              <router-link
                :to="{ name: 'user-tweets', params: { id: follower.id } }"
              >
                <img
                  class="follow__card__avatar"
                  src="@/assets/image/user-avatar.png"
                  alt="avatar"
                />
              </router-link>
              <div>
                <p class="follow__card__name">{{ follower.name }}</p>
                <p class="follow__card__account">@{{ follower.account }}</p>
              </div>
            </div>
            <button
              @click.stop.prevent="deleteFollower(follower.id)"
              v-if="follower.isFollowed"
              class="follow__card__btn--following"
            >
              正在跟隨
            </button>

            <button
              @click.stop.prevent="addFollower(follower.id)"
              v-else
              class="follow__card__btn--unfollowing"
            >
              跟隨
            </button>
          </div>
          <div class="follow__card__description">
            {{ follower.introduction }}
          </div>
        </div>
      </div>
    </template>

    <template v-if="$route.name === 'user-followings'">
      <div
        v-for="following in followings"
        :key="following.id"
        class="follow__card"
      >
        <div class="follow__card__content">
          <div class="follow__card__title">
            <div class="follow__card__title__info">
              <router-link
                :to="{ name: 'user-tweets', params: { id: following.id } }"
              >
                <img
                  class="follow__card__avatar"
                  src="@/assets/image/user-avatar.png"
                  alt="avatar"
                />
              </router-link>
              <div>
                <p class="follow__card__name">{{ following.name }}</p>
                <p class="follow__card__account">@{{ following.account }}</p>
              </div>
            </div>

            <button
              @click.stop.prevent="deleteFollowing(following.id)"
              v-if="following.isFollowed"
              class="follow__card__btn--following"
            >
              正在跟隨
            </button>

            <button
              @click.stop.prevent="addFollowing(following.id)"
              v-else
              class="follow__card__btn--unfollowing"
            >
              跟隨
            </button>
          </div>
          <p class="follow__card__description">
            {{ following.introduction }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import userAPI from "@/apis/user";
import { Toast } from '@/utils/helpers'

// const dummyData = {
//   followers: [
//     {
//       id: 1,
//       name: "Apple",
//       account: "apple",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: true,
//       isFollowed: true,
//     },
//     {
//       id: 2,
//       name: "Bob",
//       account: "bob",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: false,
//       isFollowed: true,
//     },
//     {
//       id: 3,
//       name: "Bob",
//       account: "bob",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: false,
//       isFollowed: true,
//     },
//     {
//       id: 4,
//       name: "Bob",
//       account: "bob",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: false,
//       isFollowed: true,
//     },
//     {
//       id: 5,
//       name: "Bob",
//       account: "bob",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: false,
//       isFollowed: true,
//     },
//     {
//       id: 6,
//       name: "Bob",
//       account: "bob",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: false,
//       isFollowed: true,
//     },
//     {
//       id: 7,
//       name: "Bob",
//       account: "bob",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: false,
//       isFollowed: true,
//     },
//     {
//       id: 8,
//       name: "Bob",
//       account: "bob",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: false,
//       isFollowed: true,
//     },
//   ],
//   followings: [
//     {
//       id: 13,
//       name: "Apple",
//       account: "apple",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: true,
//       isFollowed: true,
//     },
//     {
//       id: 14,
//       name: "Cindy",
//       account: "cindy",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: true,
//       isFollowed: false,
//     },
//     {
//       id: 15,
//       name: "Cindy",
//       account: "cindy",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: true,
//       isFollowed: false,
//     },
//     {
//       id: 16,
//       name: "Cindy",
//       account: "cindy",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: true,
//       isFollowed: false,
//     },
//     {
//       id: 17,
//       name: "Cindy",
//       account: "cindy",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: true,
//       isFollowed: false,
//     },
//     {
//       id: 18,
//       name: "Cindy",
//       account: "cindy",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: true,
//       isFollowed: false,
//     },
//     {
//       id: 19,
//       name: "Cindy",
//       account: "cindy",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: true,
//       isFollowed: false,
//     },
//     {
//       id: 20,
//       name: "Cindy",
//       account: "cindy",
//       image: "",
//       introduction:
//         "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
//       isFollowing: true,
//       isFollowed: false,
//     },
//   ],
// };

export default {
  // props: {
  //   user: {
  //     type: Object,
  //     required: true
  //   }
  // },
  data() {
    return {
      followers: [],
      followings: [],
    };
  },
  created() {
    const { id: userId } = this.$route.params;    
    this.fetchFollower(userId);
    this.fetchFollowings(userId);
  },
  methods: {
    async fetchFollower(userId) {
      try {
        const { data } = await userAPI.getFollowers({ userId });
               
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.followers = data

      } catch(error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        })
      }      
    },
    async fetchFollowings(userId) {
      try {               
        const { data } = await userAPI.getFollowings({ userId });
               
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.followings = {
          ...this.followings,
          ...data
        }
      } catch(error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        })
      }
    },
    // async fetchFollowings() {
    //   try {
    //     const { data } = await userAPI.getFollowings({ userId });
    //     const {id, name, account, avatar, introduction, followingId, isFollowed} = data

    //     if (data.status === 'error') {
    //       throw new Error(data.message)
    //     }
    //     this.followings = {
    //     ...this.followings,
    //       id,          
    //       name,
    //       account,
    //       avatar,
    //       introduction,
    //       followingId,
    //       isFollowed
    //     }
    //   } catch(error) {
    //     console.log("error", error);
    //     Toast.fire({
    //       icon: "error",
    //       title: "無法取得使用者資料，請稍後再試",
    //     })
    //   }
    // },
    deleteFollower(followId) {
      this.followers = this.followers.map((follow) => {
        if (follow.id === followId) {
          return {
            ...follow,
            isFollowing: false,
          };
        } else {
          return follow;
        }
      });
    },
    addFollower(followId) {
      this.followers = this.followers.map((follow) => {
        if (follow.id === followId) {
          return {
            ...follow,
            isFollowing: true,
          };
        } else {
          return follow;
        }
      });
    },
    deleteFollowing(followId) {
      this.followings = this.followings.map((follow) => {
        if (follow.id === followId) {
          return {
            ...follow,
            isFollowing: false,
          };
        } else {
          return follow;
        }
      });
    },
    addFollowing(followId) {
      this.followings = this.followings.map((follow) => {
        if (follow.id === followId) {
          return {
            ...follow,
            isFollowing: true,
          };
        } else {
          return follow;
        }
      });
    },

  },
};
</script>

<style lang="scss" scoped>
.follow__card {
  border-top: 1px solid $border;
  .follow__card__content {
    // display: flex;
    padding: 16px 24px;
    .follow__card__avatar {
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
    // .follow__card__right {
    //   padding-left: 8px;
    .follow__card__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .follow__card__title__info {
        display: flex;
      }
      .follow__card__name {
        margin: 0 8px 0 10px;
        font-size: 16px;
        font-weight: 700;
      }
      .follow__card__account {
        margin: 0 8px 0 10px;
        color: $secondary-gray;
        font-size: 14px;
        font-weight: 400;
      }
      .follow__card__btn--following {
        width: 96px;
        height: 40px;
        background-color: $brand-orange;
        border-radius: 50px;
        color: $scale-gray1;
        font-size: 16px;
        font-weight: 400;
      }
      .follow__card__btn--unfollowing {
        width: 64px;
        height: 40px;
        background-color: $scale-gray1;
        border: 1px solid $brand-orange;
        border-radius: 50px;
        color: $brand-orange;
        font-size: 16px;
        font-weight: 400;
      }
      p {
        margin: 0;
      }
    }
    .follow__card__description {
      color: $scale-gray10;
      font-size: 16px;
      font-weight: 400;
      margin: 0;
      padding: 5px 0 5px 60px;
    }
    // }
  }
}
</style>
