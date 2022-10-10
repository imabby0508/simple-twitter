<template>
  <Spinner v-if="isLoading" />
  
  <div v-else class="tweet__card__wrapper">    

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
              src="@/assets/image/user-avatar.png"
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
        />
        <img
          v-else
          src="@/assets/image/like-icon.png"
          alt="like"
          @click.stop.prevent="addLike(tweet.id)"
        />
        <p>{{ tweet.likeCounts }}</p>
      
      </div>

    </div>

  </div>
</template>

<script>
import ReplyModal from './ReplyModal.vue';
import userAPI from "@/apis/user";
import tweetAPI from "@/apis/tweet";
import { Toast } from '@/utils/helpers'
import { fromNowFilter } from "./../utils/mixins";
import Spinner from './../components/Spinner'
import { mapState } from 'vuex'

export default {
  mixins: [fromNowFilter],
  components: {
    ReplyModal,
    Spinner
  },
  data() {
    return {
      tweets: [],
      isLoading: true
      // tweet: {
      //   id: -1,
      //   description: "",
      //   createdAt: "",        
      //   tweetAuthor: {
      //     id: -1,
      //     account: "",
      //     name: "",
      //     avatar: "",
      //   },
      //   replyCounts: "",
      //   likeCounts: "",
      //   isLiked: false,
      // },
      
      // tweetsArray: []
    };
  },
  created() {       
    if(this.$route.name === 'user-tweets' || this.$route.name === 'user-likes' ) {
      const { id: userId } = this.$route.params;     
      this.fetchUserTweets(userId);
    } else if(this.$route.name === 'main') {
      this.fetchTweets();
    }
  },
  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
    async fetchUserTweets(userId) {
      try {
        const { data } = await userAPI.getUserTweets({ userId });
        // console.log('data', data)

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.tweets = Object.values(data).map(ele => ele)

        this.isLoading = false               
      } catch(error) {
        this.isLoading = false
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試",
        })
      }

      // dummyData.tweets.forEach((tweet) => {        
      //   const {
      //     id,
      //     description,
      //     createdAt,
      //     replyCounts,
      //     likeCounts,
      //     isLiked,
      //     user,
      //   } = tweet;
        
      //   const { id: userId, account, name, avatar } = user;

      //   this.tweet = {
      //     ...this.tweet,
      //     id,
      //     description,
      //     createdAt,
      //     replyCounts,
      //     likeCounts,
      //     isLiked,
      //     user: {
      //       id: userId,
      //       account,
      //       name,
      //       avatar,
      //     },
      //     showReplyModal: false
      //   };        
        
      //   this.tweetsArray.push(this.tweet)
      // });   
    },

    async fetchTweets() {
      try {              
        const { data } = await tweetAPI.getTweets();
        // console.log('data', data)

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.tweets = {
          ...this.tweets,
          ...data
        }
               
      } catch(error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得推文，請稍後再試",
        })
      }
    },
    async addLike(tweetId) {
      try {
        const { data } = await tweetAPI.addLike({
          tweet_id: tweetId,
          userId: this.currentUser.id
        });
        console.log(data)

        if (data.status === 'error') {
          throw new Error(data.message)
        }             
  
        this.tweets = this.tweets.map(tweet => {
          // console.log(tweet)
          if(tweet.id === tweetId) {
            return {
              ...tweet,
              isLiked: true
            }            
          } else {
            return tweet
          }
        })

      } catch (error) {
        console.error("error", error);

        Toast.fire({
          icon: "error",
          title: "無法對推文按愛心，請稍後再試",
        })

      }     
      // this.tweetsArray = this.tweetsArray.map(tweetContent => {
      //   if(tweetId === tweetContent.id) {          
      //     return {
      //       ...tweetContent,
      //       isLiked: true,
      //       likeCounts: tweetContent.likeCounts + 1   
      //     }
      //   } else {
      //     return tweetContent
      //   }
      // })  
    },
    async deleteLike(tweetId) {
      try {
        const { data } = await tweetAPI.deleteLike({
          tweet_id: tweetId,
          userId: this.currentUser.id
        });
        console.log(data)

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.tweets = this.tweets.map(tweet => {
          // console.log(tweet)
          if (tweet.id === tweetId) {
            return {
              ...tweet,
              isLiked: false
            }
          } else {
            return tweet
          }
        })

      } catch (error) {
        console.error("error", error);

        Toast.fire({
          icon: "error",
          title: "無法對推文取消愛心，請稍後再試",
        })

      }
    },
    // deleteLike(tweetId) {

      
    //   this.tweetsArray = this.tweetsArray.map(tweetContent => {
    //     if (tweetId === tweetContent.id) {
    //       return {
    //         ...tweetContent,
    //         isLiked: false,
    //         likeCounts: tweetContent.likeCounts - 1
    //       }
    //     } else {
    //       return tweetContent
    //     }
    //   })  
    // },


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
