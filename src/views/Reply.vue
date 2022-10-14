<template>
  <Spinner v-if="isLoading" />
  <div v-else class="reply__container">
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
            <router-link :to="{ name: 'user-tweets', params: {id: tweet.tweetAuthor.id}}">
              <img class="tweet__avatar" :src="tweet.tweetAuthor.avatar | emptyAvatar" alt="avatar" />
            </router-link>

            <div>
              <p class="tweet__name">{{tweet.tweetAuthor.name}}</p>
              <p class="tweet__account">@{{tweet.tweetAuthor.account}}</p>
            </div>            
          </div>
          <div class="tweet__description">
            {{tweet.description}}
          </div>
          <div class="tweet__time">{{tweet.createdAt | timeFormat}}</div>

          <hr />

          <div class="tweet__count"> 
            <p class="tweet__num">{{tweet.replyCounts}}</p><p class="tweet__reply">回覆</p>
            <p class="tweet__num">{{tweet.likeCounts}}</p><p class="tweet__like">喜歡次數</p>
          </div>

          <hr />

          <div class="tweet__card__footer" >
            <img
              src="@/assets/image/reply-icon.png"
              @click="showReplyModal=true"
              alt="reply"
            >
            <img v-if="tweet.isLiked" src="@/assets/image/red-like-icon.png" alt="like" @click.stop.prevent="deleteLike(tweet.id)"/>
            <img v-else src="@/assets/image/like-icon.png" alt="like" @click.stop.prevent="addLike(tweet.id)"/>         
          </div>

          <ReplyModal
            v-if="showReplyModal"
            @close="showReplyModal=false"
            :tweet="tweet"
            :currentUser="currentUser"
            @successReply="successReplyToast"
          />

        </div>
      </div>

      <ReplyCard 
      :newReply="newReply" />

    </div>

    <PopularList />
  </div>
</template>

<script>
import MainNav from "./../components/MainNav.vue";
import ReplyCard from "./../components/ReplyCard.vue";
import PopularList from "./../components/PopularList.vue";
import tweetAPI from "./../apis/tweet";
import { fromNowFilter } from "./../utils/mixins";
import { timeFormatFilter } from "./../utils/mixins";
import { emptyAvatarFilter } from './../utils/mixins';
import { mapState } from 'vuex';
import { Toast } from './../utils/helpers';
import Spinner from './../components/Spinner'
import ReplyModal from '../components/ReplyModal.vue'

export default {
  mixins: [fromNowFilter, timeFormatFilter, emptyAvatarFilter],
  components: {
    MainNav,
    ReplyCard,
    PopularList,
    Spinner,
    ReplyModal,
  },
  data() {
    return {
      tweet: {
        id: -1,
        description: '',
        createdAt: '',
        tweetAuthor: {
          id: -1,
          avatar: '',
          name: '',
          account: ''
        },
        isLiked: false,
        likeCounts: '',
        replyCounts: '',      
      },
      isLoading: true,
      showReplyModal: false,
      newReply: {}
    }
  },
  computed: {
    ...mapState(['currentUser']),
  },
  created() {
    this.fetchTweet(this.$route.params.id)  
  },
  methods: {
    async fetchTweet(tweetId) {
      try {
        const { data } = await tweetAPI.getTweet({ tweetId });

        this.tweet = {
          ...this.tweet,
          ...data
        }

        this.isLoading = false
      } catch(error) {
        this.isLoading = false
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試",
        })
      }
    },
    async addLike(tweetId) {
      try {

        const response = await tweetAPI.addLike({
          tweet_id: tweetId,
          userId: this.currentUser.id
        });
        
        const {data} = response

        if (data.status === 'error') {
          throw new Error(data.message)
        } 

        this.tweet = {
          ...this.tweet,
          isLiked: true,
          likeCounts: this.tweet.likeCounts + 1   
        }

      } catch(error) {
        console.error("error", error);
        Toast.fire({
          icon: "error",
          title: "無法對推文按愛心，請稍後再試",
        })
      }
    },
    async deleteLike(tweetId) {
      try {
        const response = await tweetAPI.deleteLike({
          tweet_id: tweetId,
          userId: this.currentUser.id
        });

        const {data} = response

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.tweet = {
          ...this.tweet,
          isLiked: false,
          likeCounts: this.tweet.likeCounts - 1      
        }

      } catch(error) {
        console.error("error", error);
        Toast.fire({
          icon: "error",
          title: "無法對推文取消愛心，請稍後再試",
        })
      }
    },
    successReplyToast(payload) {

      this.newReply = {
        createdAt: new Date(),
        tweetAuthorAccount: this.tweet.tweetAuthor.account,
        comment: payload.comment,
        replyUser: {
          avatar: this.currentUser.avatar,
          name: this.currentUser.name,
          account: this.currentUser.account
        }
      }

      this.tweet.replyCounts += 1

      Toast.fire({
        icon: 'success',
        title: '回覆發送成功'
      })
      
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
        border-radius: 50%;
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
        cursor: pointer;
      }
    }
    hr {
      color: #e6ecf0;
      width: 99%;
    }
  }
}
</style>
