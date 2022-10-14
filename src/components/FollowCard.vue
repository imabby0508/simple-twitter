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
                  :src="follower.avatar | emptyAvatar"
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
              :disabled="isProcessing"
            >
              正在跟隨
            </button>

            <button
              @click.stop.prevent="addFollower(follower.id)"
              v-else
              class="follow__card__btn--unfollowing"
              :disabled="isProcessing"
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
                  :src="following.avatar | emptyAvatar"
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
              :disabled="isProcessing"
            >
              正在跟隨
            </button>

            <button
              @click.stop.prevent="addFollowing(following.id)"
              v-else
              class="follow__card__btn--unfollowing"
              :disabled="isProcessing"
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
import followshipAPI from "./../apis/followship";
import { mapState } from 'vuex';
import { Toast, ToastError, ToastWarning } from '../utils/helpers'
import { emptyAvatarFilter } from '../utils/mixins'

export default {
  mixins: [emptyAvatarFilter],
  data() {
    return {
      followers: [],
      followings: [],
      isProcessing: false
    };
  },
  computed: {
    ...mapState(['currentUser']),
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

        this.followers = [
          ...data
        ]

      } catch(error) {
        console.log("error", error);
        ToastError.fire({
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

        this.followings = [
          ...data
        ]

      } catch(error) {
        console.log("error", error);
        ToastError.fire({
          title: "無法取得使用者資料，請稍後再試",
        })
      }
    },
  
    async deleteFollower(followerId) {
      try {
        this.isProcessing = true

        const { data } = await followshipAPI.deleteFollow({ followingId: followerId });

        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.followers = this.followers.map((follower) => {
          if (follower.id === followerId) {
            return {
              ...follower,
              isFollowed: false,
            }
          } else {
            return follower;
          }
        })

        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.error("error", error);
        ToastError.fire({
          title: "無法取消追蹤使用者，請稍後再試",
        });
      }
    },
    async addFollower(followerId) {
      try {
        this.isProcessing = true

        if (this.currentUser.id === followerId) {
          ToastWarning.fire({
            title: "無法追蹤自己，謝謝",
          })
          this.isProcessing = false
          return
        }

        const { data } = await followshipAPI.addFollow({ id: followerId });
       
        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.followers = this.followers.map((follower) => {
          if (follower.id === followerId) {
            return {
              ...follower,
              isFollowed: true,             
            };
          } else {
            return follower;
          }
        });

        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.error("error", error);
        ToastError.fire({
          title: "無法追蹤使用者，請稍後再試",
        });
      }      
    },
    async deleteFollowing(followingId) {
      try {
        this.isProcessing = true

        const { data } = await followshipAPI.deleteFollow({ followingId: followingId });

        if (data.status === "error") {
          throw new Error(data.message);
        }
  
        this.followings = this.followings.map((following) => {
          if (following.id === followingId) {
            return {
              ...following,
              isFollowed: false,
            }
          } else {
            return following;
          }
        })
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.error("error", error);
        ToastError.fire({
          title: "無法取消追蹤使用者，請稍後再試",
        });
      }  
    },
    async addFollowing(followingId) {
      try {
        this.isProcessing = true

        if (this.currentUser.id === followingId) {
          ToastWarning.fire({
            title: "無法追蹤自己，謝謝",
          })
          this.isProcessing = false
          return
        }

        const { data } = await followshipAPI.addFollow({ id: followingId });
        
        if (data.status === "error") {
          throw new Error(data.message);
        }

        this.followings = this.followings.map((following) => {
          if (following.id === followingId) {
            return {
              ...following,
              isFollowed: true,              
            };
          } else {
            return following;
          }
        });
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.error("error", error);
        ToastError.fire({
          title: "無法追蹤使用者，請稍後再試",
        });
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.follow__card {
  border-top: 1px solid $border;
  .follow__card__content {
    padding: 16px 24px;
    .follow__card__avatar {
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
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
