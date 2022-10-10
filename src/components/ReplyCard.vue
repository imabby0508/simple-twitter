<template>
  <Spinner v-if="isLoading" />
  <div v-else class="reply__card__wrapper">
    <router-link v-for="reply in replies" :key="reply.id" class="reply__card" :to="{ name: 'reply', params: {id: reply.tweetId}}">
      <div class="reply__card__content">
        <div class="reply__card__title">
          <router-link :to="{ name: 'user-tweets', params: {id: reply.replyUser.id}}">
            <img
              class="reply__card__avatar"
              :src="reply.replyUser.avatar"
              alt="avatar"
            />
          </router-link>
          <div>
            <div class="reply__card__info">
              <p class="reply__card__name">{{ reply.replyUser.name }}</p>
              <p class="reply__card__account"> @{{ reply.replyUser.account }}</p>
              <p class="reply__card__time">・{{ reply.createdAt | fromNow }}</p>
            </div>
            <div class="reply__card__target">
              <p>回覆</p>
              <p class="reply__card__target__account">
                @{{ reply.tweetAuthorAccount }}
              </p>
            </div>
          </div>
        </div>      
      
        <div class="reply__card__description">
          {{ reply.comment }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import userAPI from "@/apis/user";
import tweetAPI from "@/apis/tweet";
import { Toast } from '@/utils/helpers'
import { fromNowFilter } from "./../utils/mixins";
import Spinner from './../components/Spinner'

// const dummyData = {
//   replies: [
//     {
//       id: 1,
//       replyContent:
//         "former apple engineer shares a simple DIY fix to seal your surgical mask",
//       createdAt: "3小時",
//       tweetId: 1,
//       tweetAuthorAccount: 'Daniel',
//       replyUser: {
//         id: 1,
//         account: "apple",
//         avatar: "",
//         name: "Apple",
//       },
//     },
//     {
//       id: 2,
//       replyContent: "Michelin Challenges Creatives to Upcycle",
//       createdAt: "12小時",
//       tweetId: 2,
//       tweetAuthorAccount: 'Daniel',
//       replyUser: {
//         id: 2,
//         account: "apple",
//         avatar: "",
//         name: "Apple",
//       },
//     },
//     {
//       id: 3,
//       replyContent: "Michelin Challenges Creatives to Upcycle",
//       createdAt: "12小時",
//       tweetId: 2,
//       tweetAuthorAccount: 'Daniel',
//       replyUser: {
//         id: 2,
//         account: "apple",
//         avatar: "",
//         name: "Apple",
//       },
//     },
//     {
//       id: 4,
//       replyContent: "Michelin Challenges Creatives to Upcycle",
//       createdAt: "12小時",
//       tweetId: 2,
//       tweetAuthorAccount: 'Daniel',
//       replyUser: {
//         id: 2,
//         account: "apple",
//         avatar: "",
//         name: "Apple",
//       },
//     },
//     {
//       id: 5,
//       replyContent: "Michelin Challenges Creatives to Upcycle",
//       createdAt: "12小時",
//       tweetId: 2,
//       tweetAuthorAccount: 'Daniel',
//       replyUser: {
//         id: 2,
//         account: "apple",
//         avatar: "",
//         name: "Apple",
//       },
//     },
//     {
//       id: 6,
//       replyContent: "Michelin Challenges Creatives to Upcycle",
//       createdAt: "12小時",
//       tweetId: 2,
//       tweetAuthorAccount: 'Daniel',
//       replyUser: {
//         id: 2,
//         account: "apple",
//         avatar: "",
//         name: "Apple",
//       },
//     },
//     {
//       id: 7,
//       replyContent: "Michelin Challenges Creatives to Upcycle",
//       createdAt: "12小時",
//       tweetId: 2,
//       tweetAuthorAccount: 'Daniel',
//       replyUser: {
//         id: 2,
//         account: "apple",
//         avatar: "",
//         name: "Apple",
//       },
//     },
//   ],
// };
export default {
  mixins: [fromNowFilter],
  components: {
    Spinner
  },
  data() {
    return {
      replies: [],
      isLoading: true,
      // reply: {
      //   id: -1,
      //   replyContent: "",
      //   createdAt: "",
      //   tweetId: "",
      //   tweetAuthorAccount: '',
      //   replyUser: {
      //     id: -1,
      //     account: "",
      //     name: "",
      //     avatar: "",
      //   },
      // },
      // repliesArray: [],     
    };
  },
  created() {
    if(this.$route.name === 'user-replies') {
      const { id: userId } = this.$route.params;     
      this.fetchUserReplies(userId);
    } else if(this.$route.name === 'reply') {
      const { id: tweetId } = this.$route.params;  
      this.fetchReplies(tweetId);
    }
  }, 
  methods: {
    async fetchUserReplies(userId) {
      try {
        const { data } = await userAPI.getUserReplies({ userId });
        console.log('data', data)

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.replies = {
          ...this.replies,
          ...data
        }
        this.isLoading = false         
      } catch(error) {
        this.isLoading = false         
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得回覆，請稍後再試",
        })
      }
    },

    async fetchReplies(tweetId) {
      try {
        const { data } = await tweetAPI.getReplies({ tweetId });
        console.log('data', data)

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.replies = {
          ...this.replies,
          ...data
        }
               
      } catch(error) {
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得回覆，請稍後再試",
        })
      }
    },

    // fetchReplies() {
    //   dummyData.replies.forEach((reply) => {
    //     const { id, replyContent, createdAt, tweetId, tweetAuthorAccount, replyUser } = reply;

    //     const { id: userId, account, name, avatar } = replyUser;

    //     this.reply = {
    //       ...this.reply,
    //       id,
    //       replyContent,
    //       createdAt,
    //       tweetId,
    //       tweetAuthorAccount,
    //       replyUser: {
    //         id: userId,
    //         account,
    //         name,
    //         avatar,
    //       },
    //     };

    //     this.repliesArray.push(this.reply);
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.reply__card__wrapper {
  .reply__card {  
    .reply__card__content {
      border-top: 1px solid #e6ecf0;
      padding: 16px 24px;
      .reply__card__title {
        display: flex;
        align-items: top;
        .reply__card__avatar {
          width: 50px;
          height: 50px;
          margin-top: 0;
          border-radius: 50%;
        }
        .reply__card__info {
          display: flex;
          align-items: top; 
          margin: 2px 0 0 10px;
          .reply__card__name {
            color: $scale-gray10;
            font-weight: 700;
            font-size: 16px;
            margin-right: 8px;
          }
          .reply__card__account,
          .reply__card__time {
            color: $secondary-gray;
            font-weight: 400;
            font-size: 14px;
            margin: 2px 0 0 0;
          }
        }
        .reply__card__target {
          display: flex;
          color: $secondary-gray;
          font-weight: 400;
          font-size: 14px;
          margin: 8px 0 8px 10px;
          P {
            margin-right: 2px;
          }
          .reply__card__target__account {
            color: $brand-orange;
          }
        } 
      }
      .reply__card__description {
        color: $scale-gray10;
        font-weight: 400;
        font-size: 16px;
        margin: 0 0 8px 60px;
      }
    }
  }
}
</style>
