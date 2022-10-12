<template>
  <div class="popularList">
    <div class="popularList--title">
      <h1>推薦跟隨</h1>
    </div>
    <div class="popularList--users">

      <div
        class="user--wrapper d-flex justify-content-between align-items-center"
        v-for="user in users"
        :key="user.id"
      >
        <div class="d-flex">
          <div class="user--wrapper--image">
            <img
              :src="user.avatar"
              alt="user-avatar"
            >
          </div>
          <div class="user--wrapper--info d-flex flex-column justify-content-center">
            <h3>{{user.name}}</h3>
            <p>@{{user.account}}</p>
          </div>
        </div>
        <div class="user--wrapper--button d-flex justify-content-end">
          <button
            class="btn btn-follow"
            type="button"
            v-if="user.isFollowed"
            @click.stop.prevent="deleteFollow(user.id)"
          >正在跟隨</button>

          <button
            class="btn btn-unfollow"
            type="button"
            v-else
            @click.stop.prevent="addFollow(user.id)"
          >跟隨</button>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import userAPI from '../apis/user'
import followshipAPI from '../apis/followship'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      users: []
    }
  },
  computed: {
    ...mapState(['currentUser']),
  },
  created() {
    this.fetchPopularList()
  },
  methods: {
    async fetchPopularList() {

      try {

        const response = await userAPI.getPopularUsers()
        const { data } = response

        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.users = response.data

      } catch (error) {

        console.error("error", error);

        Toast.fire({
          icon: "error",
          title: "無法取得熱門使用者，請稍後再試",
        })

      }
      
    },
    async deleteFollow(userId) {

      try {
        const response = await followshipAPI.deleteFollow({
          id: userId
        })

        const { data } = response

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.users = this.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: false
            }
          } else {
            return user
          }
        })

      } catch (error) {

        console.error("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤使用者，請稍後再試",
        })

      }
    },
    async addFollow(userId) {

      try {

        if (this.currentUser.id === userId) {
          Toast.fire({
            icon: "warning",
            title: "無法追蹤自己，謝謝",
          })
          return
        }

        const response = await followshipAPI.addFollow({
          id: userId
        })

        const { data } = response

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.users = this.users.map(user => {
          if (user.id === userId) {
            return {
              ...user,
              isFollowed: true
            }
          } else {
            return user
          }
        })

      } catch (error) {

        console.error("error", error);
        Toast.fire({
          icon: "error",
          title: "無法追蹤使用者，請稍後再試",
        })

      }
    }
  },
}
</script>

<style lang="scss" scoped>
.popularList {
  position: fixed;
  z-index: 990;
  top: 16px;
  right: 9.3vw;
  width: 19.5vw;
  max-width: 350px;
  min-width: 265px;
  background: $scale-gray2;
  border-radius: 16px;

  &--title h1 {
    margin: 24px auto 24px 24px;
    font-weight: 700;
    font-size: 24px;
    line-height: 26px;
  }

  &--users {
    border-top: 1px solid $border;

    .user--wrapper {
      padding: 16px;

      &--image img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      &--info {
        max-width: 6.4vw;
        margin-left: 8px;

        h3 {
          overflow: hidden;
          text-overflow: ellipsis;
          color: $scale-gray10;
          font-weight: 700;
          font-size: 16px;
          line-height: 26px;
          // background: green;
        }

        p {
          overflow: hidden;
          text-overflow: ellipsis;
          color: $scale-gray7;
          font-weight: 500;
          font-size: 14px;
          line-height: 22px;
          // background: blue;
        }
      }

      &--button {
        min-width: 96px;
        height: 40px;

        .btn {
          border-radius: 50px;
          // padding: 8px 1vw;
          margin-left: 5px;
          font-weight: 400;
          font-size: 16px;

          // line-height: 24px;
          &-follow {
            width: 100%;
            background: $brand-orange;
            color: $scale-gray1;
          }

          &-unfollow {
            width: 67%;
            background: $scale-gray1;
            border: 1px solid $brand-orange;
            color: $brand-orange;
          }
        }
      }
    }
  }
}
</style>