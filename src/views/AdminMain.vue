<template>

  <div class="main__container">
    <AdminNav />
    <div class="main">
      <div class="main__title">
        <h4>推文清單</h4>
      </div>
      <div class="main__post">


        <div class="tweet__card__wrapper">
          <div
            v-for="tweet in tweetsArray"
            :key="tweet.id"
            class="tweet__card"
            :to="{name: 'reply', params: {id: tweet.id}}"
          >
            <div class="tweet__card__content">
              <div class="tweet__card__title">
                <img
                  class="tweet__card__avatar"
                  src="@/assets/image/user-avatar.png"
                  alt="avatar"/>
                <p class="tweet__card__name">{{ tweet.user.name }}</p>
                <p class="tweet__card__account">@{{ tweet.user.account }}</p>
                <p class="tweet__card__time">・{{ tweet.createdAt }}</p>
              </div>
              <div class="tweet__card__description">
                {{ tweet.description }}
              </div>
            </div>
            <img 
            @click.stop.prevent="deleteTweet(tweet.id)"
            src="@/assets/image/black-cross.png" 
            class="tweet__card__delete" 
            alt="delete-tweet-icon">
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav.vue';

const dummyData = {
  tweets: [
    {
      id: 1,
      description:
        "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      createdAt: "3小時",
      replyCounts: 13,
      likeCounts: 76,
      isLiked: false,
      user: {
        id: 1,
        account: "apple",
        name: "Apple",
        avatar: "",
      },
    },
    {
      id: 2,
      description:
        "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      createdAt: "3小時",
      replyCounts: 13,
      likeCounts: 76,
      isLiked: true,
      user: {
        id: 2,
        account: "apple",
        name: "Apple",
        avatar: "",
      },
    },
    {
      id: 3,
      description:
        "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      createdAt: "3小時",
      replyCounts: 13,
      likeCounts: 76,
      isLiked: true,
      user: {
        id: 2,
        account: "apple",
        name: "Apple",
        avatar: "",
      },
    },
    {
      id: 4,
      description:
        "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      createdAt: "3小時",
      replyCounts: 13,
      likeCounts: 76,
      isLiked: true,
      user: {
        id: 2,
        account: "apple",
        name: "Apple",
        avatar: "",
      },
    },
    {
      id: 5,
      description:
        "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      createdAt: "3小時",
      replyCounts: 13,
      likeCounts: 76,
      isLiked: true,
      user: {
        id: 2,
        account: "apple",
        name: "Apple",
        avatar: "",
      },
    },
    {
      id: 6,
      description:
        "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      createdAt: "3小時",
      replyCounts: 13,
      likeCounts: 76,
      isLiked: true,
      user: {
        id: 2,
        account: "apple",
        name: "Apple",
        avatar: "",
      },
    },
    {
      id: 7,
      description:
        "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      createdAt: "3小時",
      replyCounts: 13,
      likeCounts: 76,
      isLiked: true,
      user: {
        id: 2,
        account: "apple",
        name: "Apple",
        avatar: "",
      },
    },
    {
      id: 8,
      description:
        "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. ",
      createdAt: "3小時",
      replyCounts: 13,
      likeCounts: 76,
      isLiked: true,
      user: {
        id: 2,
        account: "apple",
        name: "Apple",
        avatar: "",
      },
    },
  ],
};

export default {
  components: {
    AdminNav,
  },
  data() {
    return {
      tweet: {
        id: -1,
        description: "",
        createdAt: "",
        replyCounts: "",
        likeCounts: "",
        isLiked: false,
        user: {
          id: -1,
          account: "",
          name: "",
          avatar: "",
        },
      },
      tweetsArray: []
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    fetchTweets() {
      dummyData.tweets.forEach((tweet) => {
        const {
          id,
          description,
          createdAt,
          replyCounts,
          likeCounts,
          isLiked,
          user,
        } = tweet;

        const { id: userId, account, name, avatar } = user;

        this.tweet = {
          ...this.tweet,
          id,
          description,
          createdAt,
          replyCounts,
          likeCounts,
          isLiked,
          user: {
            id: userId,
            account,
            name,
            avatar,
          },
          showReplyModal: false
        };

        this.tweetsArray.push(this.tweet)
      });
    },
    deleteTweet (tweetId) {
      this.tweetsArray = this.tweetsArray.filter(tweet => (tweet.id !== tweetId))
    }
  },
}
</script>

<style lang="scss" scoped>
.main__container {
  position: relative;
  margin: auto 9.3vw auto 9.3vw;
}

.main {
  position: absolute; //讓 main置於中間
  left: 14.4vw;
  right: 0;

  .main__title {
    position: fixed; //讓 title固定在上面
    top: 0;
    left: 23.7vw;
    right: 9.3vw;
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
    border-left: 1px solid $border;
    border-right: 1px solid $border;
  }

  .tweet__card {
    position: relative;
    .tweet__card__delete {
      position: absolute;
      top: 17px;
      right: 0;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }

  .tweet__card__content {
    padding: 16px 24px;
    border-bottom: 1px solid $border;

    .tweet__card__title {
      display: flex;
      align-items: top;
      height: 40px;

      .tweet__card__avatar {
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }

      .tweet__card__name {
        margin: 2px 8px 0 10px;
        font-size: 16px;
        font-weight: 700;
      }

      .tweet__card__account,
      .tweet__card__time {
        margin: 4px 0 0 0;
        color: $secondary-gray;
        font-size: 14px;
        font-weight: 400;
      }
    }
    .tweet__card__description {
      color: $scale-gray10;
      font-size: 16px;
      font-weight: 400;
      margin: 0;
      padding: 0px 0 5px 60px;
    }
  }
}
</style>