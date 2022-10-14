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
          >
            <div class="tweet__card__content">
              <div class="tweet__card__title">
                <img
                  class="tweet__card__avatar"
                  :src="tweet.tweetAuthor.avatar | emptyAvatar"
                  alt="avatar"/>
                <p class="tweet__card__name">{{ tweet.tweetAuthor.name }}</p>
                <p class="tweet__card__account">@{{ tweet.tweetAuthor.account }}</p>
                <p class="tweet__card__time">・{{ tweet.createdAt | fromNow }}</p>
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
import adminAPI from '../apis/admin'
import { fromNowFilter } from "./../utils/mixins";
import { Toast, ToastError, ToastWarning } from '../utils/helpers'
import { emptyAvatarFilter } from '../utils/mixins'

export default {
  mixins: [fromNowFilter, emptyAvatarFilter],
  components: {
    AdminNav,
  },
  data() {
    return {
      tweetsArray: []
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {

      try {

        const response = await adminAPI.getTweets()
        const { data } = response
        if (data.status === 'error') {
          throw new Error(data.message)
        }
        this.tweetsArray = data
        
      } catch (error) {
        console.error(error)

        ToastError.fire({
          title: '目前無法取得推文清單，請稍後再試'
        })
      }
    },
    async deleteTweet (tweetId) {
      try {

        const { data } = await adminAPI.deleteTweet({ id: tweetId })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.tweetsArray = this.tweetsArray.filter(tweet => (tweet.id !== tweetId))

      } catch (error) {
        console.error(error)

        ToastError.fire({
          title: '目前無法刪除該推文，請稍後再試'
        })
      }
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
  }

  .tweet__card__wrapper {
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