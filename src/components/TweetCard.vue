<template>
  <Spinner v-if="isLoading" />
  
  <div v-else class="tweet__card__wrapper">    


  <template v-if="isUserLikesPage">
    <div 
      v-for="tweet in tweets"
      :key="tweet.Tweet.id"
      class="tweet__card"
    >
   
      <router-link
        class="tweet__card__content"
        :to="{name: 'reply', params: {id: tweet.Tweet.id}}"
      >
        <div class="tweet__card__title">
          <router-link :to="{name: 'user-tweets', params: {id: tweet.Tweet.tweetAuthor.id}}" class="avatar">
            <img
              class="tweet__card__avatar"
              :src="tweet.Tweet.tweetAuthor.avatar | emptyAvatar"
              alt="avatar"
            />
          </router-link>

          <router-link 
          :to="{name: 'user-tweets', params: {id: tweet.Tweet.tweetAuthor.id}}" 
          class="tweet__card__name"
          >{{ tweet.Tweet.tweetAuthor.name }}
          </router-link>

          <p class="tweet__card__account">@{{ tweet.Tweet.tweetAuthor.account }}</p>
          <p class="tweet__card__time">・{{ tweet.Tweet.createdAt | fromNow }}</p>
        </div>
        <div class="tweet__card__description">
          {{ tweet.Tweet.description }}
        </div>
      </router-link>

      <div class="tweet__card__footer">
      
        <div class="reply-icon">
          <img
            @click="tweet.showReplyModal=true"
            src="@/assets/image/reply-icon.png"
            alt="reply"
          />
        </div>
        <p>{{ tweet.replyCounts }}</p>
      
        <ReplyModal
          v-if="tweet.showReplyModal"
          @close="tweet.showReplyModal=false"
          :tweet="tweet"
        />
      
        <img
          v-if="tweet.isLiked"
          src="@/assets/image/red-like-icon.png"
          alt="like"
          @click.stop.prevent="deleteLike(tweet.Tweet.id)"
          :disabled="isProcessing"
        />
        <img
          v-else
          src="@/assets/image/like-icon.png"
          alt="like"
          @click.stop.prevent="addLike(tweet.Tweet.id)"
          :disabled="isProcessing"
        />
        <p>{{ tweet.likeCounts }}</p>
      
      </div>

    </div>
  </template>

  <template v-else>
    <div 
    v-for="tweet in tweets"
    :key="tweet.id"
    class="tweet__card"
    >
   
      <router-link
        class="tweet__card__content"
        :to="{name: 'reply', params: {id: tweet.id}}"
      >
        <div class="tweet__card__title">
          <router-link :to="{name: 'user-tweets', params: {id: tweet.tweetAuthor.id}}" class="avatar">
            <img
              class="tweet__card__avatar"
              :src="tweet.tweetAuthor.avatar | emptyAvatar"
              alt="avatar"
            />
          </router-link>

          <router-link 
          :to="{name: 'user-tweets', params: {id: tweet.tweetAuthor.id}}" 
          class="tweet__card__name"
          >{{ tweet.tweetAuthor.name }}
          </router-link>

          <p class="tweet__card__account">@{{ tweet.tweetAuthor.account }}</p>
          <p class="tweet__card__time">・{{ tweet.createdAt | fromNow }}</p>
        </div>
        <div class="tweet__card__description">
          {{ tweet.description }}
        </div>
      </router-link>

      <div class="tweet__card__footer">
      
        <div class="reply-icon">
          <img
            @click="tweet.showReplyModal=true"
            src="@/assets/image/reply-icon.png"
            alt="reply"
          />
        </div>
        <p>{{ tweet.replyCounts }}</p>
      
        <ReplyModal
          v-if="tweet.showReplyModal"
          @close="tweet.showReplyModal=false"
          :tweet="tweet"
        />
      
        <img
          v-if="tweet.isLiked"
          src="@/assets/image/red-like-icon.png"
          alt="like"
          @click.stop.prevent="deleteLike(tweet.id)"
          :disabled="isProcessing"
        />
        <img
          v-else
          src="@/assets/image/like-icon.png"
          alt="like"
          @click.stop.prevent="addLike(tweet.id)"
          :disabled="isProcessing"
        />
        <p>{{ tweet.likeCounts }}</p>
      
      </div>

    </div>
  </template>

  </div>
</template>

<script>
import ReplyModal from './ReplyModal.vue';
import { Toast } from '@/utils/helpers'
import { fromNowFilter } from "./../utils/mixins";
import Spinner from './../components/Spinner'
import { mapState } from 'vuex';
import { emptyAvatarFilter } from '../utils/mixins'

import userAPI from "@/apis/user";
import tweetAPI from "@/apis/tweet";

export default {
  mixins: [fromNowFilter, emptyAvatarFilter],
  components: {
    ReplyModal,
    Spinner
  },
  data() {
    return {
      tweets: [],
      isLoading: true,
      isProcessing: false,
      isUserLikesPage: false
    };
  },
  created() {      
    const { id: userId } = this.$route.params;

    if(this.$route.name === 'user-tweets') {
      this.fetchUserTweets(userId);
    } else if (this.$route.name === 'user-likes') {
      this.isUserLikesPage = true;
      this.fetchUserLikes(userId);
    }

    if(this.$route.name === 'main') {
      this.fetchTweets();
    }        
  },
  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
    // 在首頁瀏覽所有推文
    async fetchTweets() {
      try {
        const response = await tweetAPI.getTweets();
        let { data }  =response

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        data = data.filter(item => item.tweetAuthor !== null)

        // data的格式是陣列，把 data裡一個一個值放進 tweets陣列
        this.tweets = [
          ...data
        ]

        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        console.error("error", error);

        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試",
        })

      }
    },
    // 使用者查看個人檔案並看到該使用者的推文
    async fetchUserTweets(userId) {
      try {
        const response = await userAPI.getUserTweets({ id: userId });
        const { data } = response

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.tweets = [
          ...data
        ]

        this.isLoading = false               
      } catch(error) {
        this.isLoading = false
        console.error("error", error);

        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試",
        })
      } 
    },
    // 使用者查看個人檔案並看到該使用者按讚的推文
    async fetchUserLikes(userId) {
      try {
        const response = await userAPI.getUserLikes({ id: userId });
        const { data } = response

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.tweets = [
          ...data
        ]

        this.isLoading = false               
      } catch(error) {
        this.isLoading = false
        console.error("error", error);

        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試",
        })
      }
    },
    async addLike(tweetId) {
      try {
        this.isProcessing = true
        const response = await tweetAPI.addLike({
          tweet_id: tweetId,
          userId: this.currentUser.id
        });

        const { data } = response

        if (data.status === 'error') {
          throw new Error(data.message)
        }  
        
        if (this.isUserLikesPage) {
          this.tweets = this.tweets.map(tweet => {
            if (tweet.Tweet.id === tweetId) {
              return {
                ...tweet,
                isLiked: true,
                likeCounts: tweet.likeCounts + 1
              }
            } else {
              return tweet
            }
          })
        } else {
          this.tweets = this.tweets.map(tweet => {
            if(tweet.id === tweetId) {
              return {
                ...tweet,
                isLiked: true,
                likeCounts: tweet.likeCounts + 1
              }            
            } else {
              return tweet
            }
          })
        }
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.error("error", error);

        Toast.fire({
          icon: "error",
          title: "無法對推文按愛心，請稍後再試",
        })

      }     
    },
    async deleteLike(tweetId) {
      try {
        this.isProcessing = true
        const response = await tweetAPI.deleteLike({
          tweet_id: tweetId,
          userId: this.currentUser.id
        });

        const { data } = response

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        if (this.isUserLikesPage) {
          this.tweets = this.tweets.map(tweet => {
            if (tweet.Tweet.id === tweetId) {
              return {
                ...tweet,
                isLiked: false,
                likeCounts: tweet.likeCounts - 1
              }
            } else {
              return tweet
            }
          })
        } else {
          this.tweets = this.tweets.map(tweet => {
            if (tweet.id === tweetId) {
              return {
                ...tweet,
                isLiked: false,
                likeCounts: tweet.likeCounts - 1
              }
            } else {
              return tweet
            }
          })
        }        
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.error("error", error);

        Toast.fire({
          icon: "error",
          title: "無法對推文取消愛心，請稍後再試",
        })

      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tweet__card {
  position: relative;
  display: block;
  &:hover {
      background-color: $scale-gray3;
    }
  .router-link-active {
    text-decoration: none; 
    color: $scale-gray10;
  }
  a {
    text-decoration: none;
    color: $scale-gray10;
  }
  .tweet__card__content {
    display: block;
    border-top: 1px solid $border;
    padding: 16px 24px 40px 24px;
    .tweet__card__title {
      display: flex;
      align-items: top;
      height: 40px;
      .tweet__card__avatar {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        &:hover {
          opacity: 0.7
        }
      }
      .tweet__card__name {
        margin: 2px 8px 0 10px;
        font-size: 16px;
        font-weight: 700;
        &:hover {
          text-decoration: solid underline $modal-black 1.5px;
        }
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
  .tweet__card__footer {
    position: absolute;
    bottom: 16px;
    left: 82px;
    width: 120px;
    height: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $secondary-gray;
    font-size: 14px;
    font-weight: 600;
    font-family: Montserrat;
    img {
      position: relative;
      display: block;
      width: 13px;
      height: 13px;
      cursor: pointer;
      // &:hover {
      //   border: 10px solid rgba(255, 102, 0, 0.2);
      // }
    }
    p {
      margin: 0 40px 0 10px;
      &:hover {
        color: $brand-orange;
      }
    }
  }
}
</style>