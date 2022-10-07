<template>
  <div class="reply__container">
    <MainNav />

    <div class="reply">
      <div class="reply__post">
        <div class="reply__header">
          <router-link :to="{name: 'main'}">
            <img src="@/assets/image/arrow.png" alt="arrow" />
          </router-link>
          <h4 class="reply__title">推文</h4>
        </div>
        <div class="tweet__content">
          <div class="tweet__title">
            <router-link :to="{ name: 'user-tweets', params: {id: tweet.user.id}}">
              <img class="tweet__avatar" src="@/assets/image/user-avatar.png" alt="avatar" />
            </router-link>

            <div>
              <p class="tweet__name">{{this.tweet.user.name}}</p>
              <p class="tweet__account">{{this.tweet.user.account}}</p>
            </div>            
          </div>
          <div class="tweet__description">
            {{this.tweet.content}}
          </div>
          <div class="tweet__time">{{this.tweet.crearedAt}}</div>

          <hr />

          <div class="tweet__count"> 
            <p class="tweet__num">{{this.tweet.replyCounts}}</p><p class="tweet__reply">回覆</p>
            <p class="tweet__num">{{this.tweet.likeCounts}}</p><p class="tweet__like">喜歡次數</p>
          </div>

          <hr />

          <div class="tweet__card__footer" >
            <img src="@/assets/image/reply-icon.png" alt="reply">
            <img v-if="this.tweet.isLiked" src="@/assets/image/red-like-icon.png" alt="like" @click.stop.prevent="deleteLike(tweet.id)"/>
            <img v-else src="@/assets/image/like-icon.png" alt="like" @click.stop.prevent="addLike(tweet.id)"/>         
          </div>
        </div>
      </div>

      <ReplyCard />
    </div>

    <PopularList />
  </div>
</template>

<script>
import MainNav from "./../components/MainNav";
import ReplyCard from "./../components/ReplyCard";
import PopularList from "./../components/PopularList";

const dummyData = {
  tweet: {
    id: 1,
    crearedAt: '上午10:05·2021年11月10日',
    content: 'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt.',
    replyCounts: 34,
    likeCounts: 808,
    isLiked: true,
    user: {
      id: 1,
      image: '',
      name: 'Apple',
      account: '@apple'
    }
  }
}

export default {
  components: {
    MainNav,
    ReplyCard,
    PopularList,
  },
  data() {
    return {
      tweet: {
        id: -1,
        crearedAt: '',
        content: '',
        replyCounts: '',
        likeCounts: '',
        isLiked: false,
        user: {
          id: -1,
          image: '',
          name: '',
          account: ''
        }
      }
    }
  },
  created() {
    this.fetchTweet()
  },
  methods: {
    fetchTweet() {
      const {id, crearedAt, content, replyCounts, likeCounts, isLiked, user} = dummyData.tweet
      this.tweet = {
        ...this.tweet,
        id,
        crearedAt,
        content,
        replyCounts,
        likeCounts,
        isLiked,
        user,
      }
    },
    addLike(tweetId) {
      this.tweet = {
        ...this.tweet,
        isLiked: true,
        likeCounts: this.tweet.likeCounts + 1   
      }

    },
    deleteLike(tweetId) {
      this.tweet = {
        ...this.tweet,
        isLiked: false,
        likeCounts: this.tweet.likeCounts - 1      
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.reply__container {
  position: relative;
  margin: auto 9.3vw auto 9.3vw;
}
.reply {
  position: absolute;
  left: 14.4vw;
  right: 21.2vw;
  border: 1px solid #e6ecf0;
  .reply__header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e6ecf0;
    padding: 24px 28px;
    img {
      width: 17px;
      height: 14px;
      margin-right: 20px;
    }
  }
  .tweet__content {
    padding: 16px;
    .tweet__title {
      display: flex;
      .tweet__avatar {
        width: 50px;
        height: 50px;
        margin-right: 8px;
      }
      .tweet__name {
        color: $scale-gray10;
        font-weight: 700;
        font-size: 16px;
      }
      .tweet__account {
        color: $secondary-gray;
        font-weight: 400;
        font-size: 14px;
      }
    }
    .tweet__description {
      color: $scale-gray10;
      font-weight: 400;
      font-size: 24px;
      margin: 8px 0;
    }
    .tweet__time {
      color: $secondary-gray;
      font-weight: 500;
      font-size: 14px;
    }
    .tweet__count {
      display: flex;
      line-height: 23px;
      color: $secondary-gray;
      font-weight: 500;
      font-size: 19px;
      .tweet__num {
        color: $scale-gray10;
        font-weight: 700;
        font-family: Montserrat;
        margin-right: 3px;
        line-height: 23px;
      }
      .tweet__reply {
        margin-right: 24px;
      }
    }
    .tweet__card__footer {
      display: flex;
      img {
        width: 25px;
        height: 23px;
        margin-right: 134px;
      }
    }
    hr {
      color: #e6ecf0;
      width: 99%;
    }
  }
}
</style>
