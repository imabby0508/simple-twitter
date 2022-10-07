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
              src="../assets/image/user-avatar.png"
              alt=""
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

const dummyData = {
  users: [
    {
      id: 1,
      avatar: '../assets/image/user-avatar.png',
      account: "hinancyjkljlk",
      name: "nancy202222290",
      email: "nancy@example.com",
      password: "$2a$10$4VljBf69Ic.oA3e5jaCDVusjsl5ovB1KbvlvM2FDU/bGlMBxgI6Tm",
      isFollowed: false,
      followerCounts: 20,
    },
    {
      id: 2,
      avatar: '../assets/image/user-avatar.png',
      account: "hellonancykljljjljlk",
      name: "nancyljlkjljkljklk",
      email: "nancy@example.com",
      password: "$2a$10$4VljBf69Ic.oA3e5jaCDVusjsl5ovB1KbvlvM2FDU/bGlMBxgI6Tm",
      isFollowed: true,
      followerCounts: 20,
    },
    {
      id: 3,
      avatar: '../assets/image/user-avatar.png',
      account: "halonancyaaaaaaaaaaaa",
      name: "nancy",
      email: "nancy@example.com",
      password: "$2a$10$4VljBf69Ic.oA3e5jaCDVusjsl5ovB1KbvlvM2FDU/bGlMBxgI6Tm",
      isFollowed: true,
      followerCounts: 20,
    },
    {
      id: 4,
      avatar: '../assets/image/user-avatar.png',
      account: "halonancyaaaaaaaaaaaa",
      name: "nancyjkljlkjl",
      email: "nancy@example.com",
      password: "$2a$10$4VljBf69Ic.oA3e5jaCDVusjsl5ovB1KbvlvM2FDU/bGlMBxgI6Tm",
      isFollowed: true,
      followerCounts: 20,
    },
    {
      id: 5,
      avatar: '../assets/image/user-avatar.png',
      account: "halonancyaaaaaaaaaaaa",
      name: "nancy",
      email: "nancy@example.com",
      password: "$2a$10$4VljBf69Ic.oA3e5jaCDVusjsl5ovB1KbvlvM2FDU/bGlMBxgI6Tm",
      isFollowed: false,
      followerCounts: 20,
    },
    {
      id: 6,
      avatar: '../assets/image/user-avatar.png',
      account: "halonancyaaaaaaaaaaaa",
      name: "nancy",
      email: "nancy@example.com",
      password: "$2a$10$4VljBf69Ic.oA3e5jaCDVusjsl5ovB1KbvlvM2FDU/bGlMBxgI6Tm",
      isFollowed: false,
      followerCounts: 20,
    },
    {
      id: 7,
      avatar: '../assets/image/user-avatar.png',
      account: "halonancyaaaaaaaaaaaa",
      name: "nancybdbdbdbdb",
      email: "nancy@example.com",
      password: "$2a$10$4VljBf69Ic.oA3e5jaCDVusjsl5ovB1KbvlvM2FDU/bGlMBxgI6Tm",
      isFollowed: true,
      followerCounts: 20,
    },
    {
      id: 8,
      avatar: '../assets/image/user-avatar.png',
      account: "halonancyaaaaaaaaaaaa",
      name: "nancy",
      email: "nancy@example.com",
      password: "$2a$10$4VljBf69Ic.oA3e5jaCDVusjsl5ovB1KbvlvM2FDU/bGlMBxgI6Tm",
      isFollowed: false,
      followerCounts: 20,
    },
    {
      id: 9,
      avatar: '../assets/image/user-avatar.png',
      account: "halonancyaaaaaaaaaaaa",
      name: "nancyqpqpqp",
      email: "nancy@example.com",
      password: "$2a$10$4VljBf69Ic.oA3e5jaCDVusjsl5ovB1KbvlvM2FDU/bGlMBxgI6Tm",
      isFollowed: false,
      followerCounts: 20,
    },
    {
      id: 10,
      avatar: '../assets/image/user-avatar.png',
      account: "halonancyaaaaaaaaaaaa",
      name: "nancy",
      email: "nancy@example.com",
      password: "$2a$10$4VljBf69Ic.oA3e5jaCDVusjsl5ovB1KbvlvM2FDU/bGlMBxgI6Tm",
      isFollowed: false,
      followerCounts: 20,
    },
  ]
}

export default {
  data() {
    return {
      users: []
    }
  },
  created() {
    this.fetchPopularList()
  },
  methods: {
    fetchPopularList() {
      this.users = dummyData.users
    },
    deleteFollow (userId) {

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
    },
    addFollow(userId) {

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
    }
  },
}
</script>

<style lang="scss" scoped>
.popularList {
  position: fixed;
  top: 16px;
  right: 9.3vw;
  width: 19.5vw;
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
        width: 96px;
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