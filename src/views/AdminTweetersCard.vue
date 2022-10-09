<template>

  <div class="main__container">
    <AdminNav />
    <div class="main">
      <div class="main__title">
        <h4>使用者列表</h4>
      </div>
      <div class="main__post">


        <div class="tweet__card__wrapper">
          <div class="card d-flex flex-column" v-for="user in users" :key="user.id">
            <img class="card--cover" :src="user.backgroundImage" alt="user-cover">
            <img class="card--avatar" :src="user.avatar" alt="user-avatar">

            <div class="card--info text-center">
              <p class="card--info--name">{{user.name}}</p>
              <p class="card--info--account">@{{user.account}}</p>
            </div>

            <div class="card--tweet d-flex justify-content-between">
              <div class="card--tweet--posts d-flex">
                <img class="icon" src="@/assets/image/tweet-icon.png" alt="tweet-icon">
                <p>{{user.tweetCount}}</p>
              </div>
              <div class="card--tweet--likes d-flex">
                <img class="icon" src="@/assets/image/like-icon.png" alt="like-icon">
                <p>{{user.likeCount}}</p>
              </div>
            </div>

            <div class="card--follow d-flex justify-content-center">
              <p>{{user.followerCount}}個 <span>跟隨中</span></p>
              <p>{{user.followingCount}}個 <span>跟隨者</span></p>
            </div>

          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav.vue';

const dummyData = {
  users: [
    {
      id: 1,
      account: "root",
      email: "root@example.com",
      passwor: "$2a$10$0svlV32uVwK3XCsCbOnyG.Aphf8NcHVEA9ZNrrlCnKCyVF0GQEUGa",
      name: "root",
      avatar: "https://picsum.photos/150",
      backgroundImage: "https://picsum.photos/300/150",
      introduction: "Repellat ut voluptatem. Natus amet aliquam sint et quae ut fuga aut.",
      role: "admin",
      createdAt: "2022-10-04T10:14:28.000Z",
      updatedAt: "2022-10-04T10:14:28.000Z",
      tweetCount: 10,
      likeCount: 3,
      followerCount: 2,
      followingCount: 2
    },
    {
      id: 2,
      account: "root",
      email: "root@example.com",
      passwor: "$2a$10$0svlV32uVwK3XCsCbOnyG.Aphf8NcHVEA9ZNrrlCnKCyVF0GQEUGa",
      name: "root",
      avatar: "https://picsum.photos/150",
      backgroundImage: "https://picsum.photos/300/150",
      introduction: "Repellat ut voluptatem. Natus amet aliquam sint et quae ut fuga aut.",
      role: "admin",
      createdAt: "2022-10-04T10:14:28.000Z",
      updatedAt: "2022-10-04T10:14:28.000Z",
      tweetCount: 10,
      likeCount: 3,
      followerCount: 2,
      followingCount: 2
    },
    {
      id: 3,
      account: "root",
      email: "root@example.com",
      passwor: "$2a$10$0svlV32uVwK3XCsCbOnyG.Aphf8NcHVEA9ZNrrlCnKCyVF0GQEUGa",
      name: "root",
      avatar: "https://picsum.photos/150",
      backgroundImage: "https://picsum.photos/300/150",
      introduction: "Repellat ut voluptatem. Natus amet aliquam sint et quae ut fuga aut.",
      role: "admin",
      createdAt: "2022-10-04T10:14:28.000Z",
      updatedAt: "2022-10-04T10:14:28.000Z",
      tweetCount: 10,
      likeCount: 3,
      followerCount: 2,
      followingCount: 2
    },
    {
      id: 4,
      account: "root",
      email: "root@example.com",
      passwor: "$2a$10$0svlV32uVwK3XCsCbOnyG.Aphf8NcHVEA9ZNrrlCnKCyVF0GQEUGa",
      name: "root",
      avatar: "https://picsum.photos/150",
      backgroundImage: "https://picsum.photos/300/150",
      introduction: "Repellat ut voluptatem. Natus amet aliquam sint et quae ut fuga aut.",
      role: "admin",
      createdAt: "2022-10-04T10:14:28.000Z",
      updatedAt: "2022-10-04T10:14:28.000Z",
      tweetCount: 10,
      likeCount: 3,
      followerCount: 2,
      followingCount: 2
    },
    {
      id: 5,
      account: "root",
      email: "root@example.com",
      passwor: "$2a$10$0svlV32uVwK3XCsCbOnyG.Aphf8NcHVEA9ZNrrlCnKCyVF0GQEUGa",
      name: "root",
    avatar: "https://picsum.photos/150",
    backgroundImage: "https://picsum.photos/300/150",
      introduction: "Repellat ut voluptatem. Natus amet aliquam sint et quae ut fuga aut.",
      role: "admin",
      createdAt: "2022-10-04T10:14:28.000Z",
      updatedAt: "2022-10-04T10:14:28.000Z",
      tweetCount: 10,
      likeCount: 3,
      followerCount: 2,
      followingCount: 2
    },
    {
      id: 6,
      account: "root",
      email: "root@example.com",
      passwor: "$2a$10$0svlV32uVwK3XCsCbOnyG.Aphf8NcHVEA9ZNrrlCnKCyVF0GQEUGa",
      name: "root",
    avatar: "https://picsum.photos/150",
    backgroundImage: "https://picsum.photos/300/150",
      introduction: "Repellat ut voluptatem. Natus amet aliquam sint et quae ut fuga aut.",
      role: "admin",
      createdAt: "2022-10-04T10:14:28.000Z",
      updatedAt: "2022-10-04T10:14:28.000Z",
      tweetCount: 10,
      likeCount: 3,
      followerCount: 2,
      followingCount: 2
    },
    {
      id: 7,
      account: "root",
      email: "root@example.com",
      passwor: "$2a$10$0svlV32uVwK3XCsCbOnyG.Aphf8NcHVEA9ZNrrlCnKCyVF0GQEUGa",
      name: "root",
      avatar: "https://picsum.photos/150",
      backgroundImage: "https://picsum.photos/300/150",
      introduction: "Repellat ut voluptatem. Natus amet aliquam sint et quae ut fuga aut.",
      role: "admin",
      createdAt: "2022-10-04T10:14:28.000Z",
      updatedAt: "2022-10-04T10:14:28.000Z",
      tweetCount: 10,
      likeCount: 3,
      followerCount: 2,
      followingCount: 2
    },
    {
      id: 8,
      account: "root",
      email: "root@example.com",
      passwor: "$2a$10$0svlV32uVwK3XCsCbOnyG.Aphf8NcHVEA9ZNrrlCnKCyVF0GQEUGa",
      name: "root",
      avatar: "https://picsum.photos/150",
      backgroundImage: "https://picsum.photos/300/150",
      introduction: "Repellat ut voluptatem. Natus amet aliquam sint et quae ut fuga aut.",
      role: "admin",
      createdAt: "2022-10-04T10:14:28.000Z",
      updatedAt: "2022-10-04T10:14:28.000Z",
      tweetCount: 10,
      likeCount: 3,
      followerCount: 2,
      followingCount: 2
    },
    {
      id: 9,
      account: "root",
      email: "root@example.com",
      passwor: "$2a$10$0svlV32uVwK3XCsCbOnyG.Aphf8NcHVEA9ZNrrlCnKCyVF0GQEUGa",
      name: "root",
      avatar: "https://picsum.photos/150",
      backgroundImage: "https://picsum.photos/300/150",
      introduction: "Repellat ut voluptatem. Natus amet aliquam sint et quae ut fuga aut.",
      role: "admin",
      createdAt: "2022-10-04T10:14:28.000Z",
      updatedAt: "2022-10-04T10:14:28.000Z",
      tweetCount: 10,
      likeCount: 3,
      followerCount: 2,
      followingCount: 2
    },
    {
      id: 10,
      account: "root",
      email: "root@example.com",
      passwor: "$2a$10$0svlV32uVwK3XCsCbOnyG.Aphf8NcHVEA9ZNrrlCnKCyVF0GQEUGa",
      name: "root",
      avatar: "https://picsum.photos/150",
      backgroundImage: "https://picsum.photos/300/150",
      introduction: "Repellat ut voluptatem. Natus amet aliquam sint et quae ut fuga aut.",
      role: "admin",
      createdAt: "2022-10-04T10:14:28.000Z",
      updatedAt: "2022-10-04T10:14:28.000Z",
      tweetCount: 10,
      likeCount: 3,
      followerCount: 2,
      followingCount: 2
    },
    {
      id: 11,
      account: "root",
      email: "root@example.com",
      passwor: "$2a$10$0svlV32uVwK3XCsCbOnyG.Aphf8NcHVEA9ZNrrlCnKCyVF0GQEUGa",
      name: "root",
      avatar: "https://picsum.photos/150",
      backgroundImage: "https://picsum.photos/300/150",
      introduction: "Repellat ut voluptatem. Natus amet aliquam sint et quae ut fuga aut.",
      role: "admin",
      createdAt: "2022-10-04T10:14:28.000Z",
      updatedAt: "2022-10-04T10:14:28.000Z",
      tweetCount: 10,
      likeCount: 3,
      followerCount: 2,
      followingCount: 2
    },
    {
      id: 12,
      account: "root",
      email: "root@example.com",
      passwor: "$2a$10$0svlV32uVwK3XCsCbOnyG.Aphf8NcHVEA9ZNrrlCnKCyVF0GQEUGa",
      name: "root",
      avatar: "https://picsum.photos/150",
      backgroundImage: "https://picsum.photos/300/150",
      introduction: "Repellat ut voluptatem. Natus amet aliquam sint et quae ut fuga aut.",
      role: "admin",
      createdAt: "2022-10-04T10:14:28.000Z",
      updatedAt: "2022-10-04T10:14:28.000Z",
      tweetCount: 10,
      likeCount: 3,
      followerCount: 2,
      followingCount: 2
    },
  ]
}

export default {
  components: {
    AdminNav,
  },
  data() {
    return {
      users: []
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.users = dummyData.users
    },
  },
}
</script>

<style lang="scss" scoped>
.main__container {
  position: relative;
  margin: auto 0 auto 9.3vw;
}

.main {
  position: absolute; //讓 main置於中間
  left: 14.4vw;
  right: 0;

  .main__title {
    position: fixed; //讓 title固定在上面
    top: 0;
    left: 23.7vw;
    right: 0;
    z-index: 99;
    padding: 24px;
    margin-bottom: 0;
    background: $scale-gray1;
    border: 1px solid $border;
  }

  .main__post {
    position: absolute; //讓 setting排在 title下面
    width: 100%;
    height: 100vh;
    top: 80px;
    bottom: 0;
    right: 0;
    padding: 16px 8px 0 8px;
    border-left: 1px solid $border;
    border-right: 1px solid $border;
  }

  .tweet__card__wrapper {
    // padding: 16px 8px 0px 15px;
    display: grid;
    grid-template-columns: repeat(auto-fit, 249px);
    width: 100%;
    grid-gap: 16px;
    justify-content: center;
    .card {
      position: relative;
      background: #f6f7f8;
      border-radius: 10px;
      width: 249px;
      height: 314px;
      &--cover {
        object-fit: cover;
        width: 100%;
        height: 140px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }
      &--avatar {
        object-fit: cover;
        position: absolute;
        top: 64px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 6px solid $scale-gray1;
      }
      &--info {
        margin-top: 32px;
        text-align: center;
        &--name {
          color: $modal-black;
          font-weight: 700;
          font-size: 16px;
          line-height: 26px;
        }
        &--account {
          color: $secondary-gray;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
        }
      }
      &--tweet {
        margin: 16px auto 8px auto;
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 26px;
        &--posts {
          margin-right: 16px;
        }
      }
      &--follow {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        p:first-child {
          margin-right: 8px;
        }
        span {
          color: $secondary-gray;
        }
      }
    }
    .icon {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }


}
</style>