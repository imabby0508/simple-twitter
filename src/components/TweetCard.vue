<template>
  <div class="tweet__card__wrapper">
    <div v-for="tweet in tweetsArray" :key="tweet.id" class="tweet__card" :to="{name: 'reply', params: {id: tweet.id}}">
      <div class="tweet__card__content">
        <router-link :to="{name: 'user-tweets', params: {id: tweet.user.id}}">
          <img
            class="tweet__card__avatar"
            src="@/assets/image/user-avatar.png"
            alt="avatar"
          />
        </router-link>
        <div class="tweet__card__right">
          <div class="tweet__card__title">
            <router-link :to="{name: 'user-tweets', params: {id: tweet.user.id}}" class="tweet__card__name">{{ tweet.user.name }}</router-link>
            <p class="tweet__card__account">{{ tweet.user.account }}</p>
            <p class="tweet__card__time">・{{ tweet.createdAt }}</p>
          </div>
          <p class="tweet__card__description">
            {{ tweet.description }}
          </p>
          <div class="tweet__card__footer">
            <img src="@/assets/image/reply-icon.png" alt="reply" />
            <p>{{ tweet.replyCounts }}</p>
            <img v-if="tweet.isLiked" src="@/assets/image/red-like-icon.png" alt="like" />
            <img v-else src="@/assets/image/like-icon.png" alt="like"/>
            <p>{{ tweet.likeCounts }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

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
        account: "@apple",
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
        account: "@apple",
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
        account: "@apple",
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
        account: "@apple",
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
        account: "@apple",
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
        account: "@apple",
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
        account: "@apple",
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
        account: "@apple",
        name: "Apple",
        avatar: "",
      },
    },
  ],
};

export default {
  // props: {
  //   tweetContent: {
  //     type: String,
  //     required: true
  //   },
  //   isSubmit: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
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
        };        
        
        this.tweetsArray.push(this.tweet)
      });      
    },


    // afterCreateTweet() {
    //   if(this.isSubmit) {
    //     this.tweetsArray.push(this.tweetContent)
    //   }
      
    //   console.log(this.tweetsArray)
    // }
  },
};
</script>

<style lang="scss" scoped>

.tweet__card {
  border-top: 1px solid $border;
  .router-link-active {
    text-decoration: none; 
    color: $scale-gray10
  }
  a {
    text-decoration: none;
    color: $scale-gray10
  }
  .tweet__card__content {
    display: flex;
    padding: 16px 24px;
    .tweet__card__avatar {
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }
    .tweet__card__right {
      padding-left: 8px;
      .tweet__card__title {
        display: flex;
        align-items: center;
        p {
          margin: 0;
        }
        .tweet__card__name {
          margin: 0 8px 0 0;
          font-size: 16px;
          font-weight: 700;
        }
        .tweet__card__account,
        .tweet__card__time {
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
        padding: 10px 0;
      }
    }
  }
  .tweet__card__footer {
    display: flex;
    align-items: center;
    color: $secondary-gray;
    font-size: 14px;
    font-weight: 600;
    font-family: Montserrat;
    img {
      width: 13px;
      height: 13px;
    }
    p {
      margin: 0 40px 0 10px;
    }
  }
}
</style>
