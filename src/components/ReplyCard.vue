<template>
  <div class="reply__card__wrapper">
     <!-- <p class="reply__card__name">{{ this.user.name }}</p> -->
    <div v-for="reply in repliesArray" :key="reply.id" class="reply__card">
      <img
        class="reply__card__avatar"
        src="@/assets/image/user-avatar.png"
        alt="avatar"
      />
      <div class="reply__card__right">
        <div class="reply__card__title">
          <p class="reply__card__name">{{ reply.replyUser.name }}</p>
          <p class="reply__card__account"> {{ reply.replyUser.account }}</p>
          <p class="reply__card__time">・{{ reply.createdAt }}</p>
        </div>
        <div class="reply__card__target">
          <p>回覆</p>
          <p class="reply__card__target__account">
            {{ reply.tweetAuthorAccount }}
          </p>
        </div>
        <p class="reply__card__content">
          {{ reply.replyContent }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// const dummyUser = {
//   user: {
//     id: 1,
//     name: "John",
//     account: "@john",
//     avatar: "",
//   },
// };

const dummyData = {
  replies: [
    {
      id: 1,
      replyContent:
        "former apple engineer shares a simple DIY fix to seal your surgical mask",
      createdAt: "3小時",
      tweetId: 1,
      tweetAuthorAccount: '@Daniel',
      replyUser: {
        id: 1,
        account: "@apple",
        avatar: "",
        name: "Apple",
      },
    },
    {
      id: 2,
      replyContent: "Michelin Challenges Creatives to Upcycle",
      createdAt: "12小時",
      tweetId: 2,
      tweetAuthorAccount: '@Daniel',
      replyUser: {
        id: 2,
        account: "@apple",
        avatar: "",
        name: "Apple",
      },
    },
    {
      id: 3,
      replyContent: "Michelin Challenges Creatives to Upcycle",
      createdAt: "12小時",
      tweetId: 2,
      tweetAuthorAccount: '@Daniel',
      replyUser: {
        id: 2,
        account: "@apple",
        avatar: "",
        name: "Apple",
      },
    },
    {
      id: 4,
      replyContent: "Michelin Challenges Creatives to Upcycle",
      createdAt: "12小時",
      tweetId: 2,
      tweetAuthorAccount: '@Daniel',
      replyUser: {
        id: 2,
        account: "@apple",
        avatar: "",
        name: "Apple",
      },
    },
    {
      id: 5,
      replyContent: "Michelin Challenges Creatives to Upcycle",
      createdAt: "12小時",
      tweetId: 2,
      tweetAuthorAccount: '@Daniel',
      replyUser: {
        id: 2,
        account: "@apple",
        avatar: "",
        name: "Apple",
      },
    },
    {
      id: 6,
      replyContent: "Michelin Challenges Creatives to Upcycle",
      createdAt: "12小時",
      tweetId: 2,
      tweetAuthorAccount: '@Daniel',
      replyUser: {
        id: 2,
        account: "@apple",
        avatar: "",
        name: "Apple",
      },
    },
    {
      id: 7,
      replyContent: "Michelin Challenges Creatives to Upcycle",
      createdAt: "12小時",
      tweetId: 2,
      tweetAuthorAccount: '@Daniel',
      replyUser: {
        id: 2,
        account: "@apple",
        avatar: "",
        name: "Apple",
      },
    },
  ],
};
export default {
  data() {
    return {
      // user: {
      //   id,
      //   name,
      //   account,
      //   avatar,
      // },
      reply: {
        id: -1,
        replyContent: "",
        createdAt: "",
        tweetId: "",
        tweetAuthorAccount: '',
        replyUser: {
          id: -1,
          account: "",
          name: "",
          avatar: "",
        },
      },
      repliesArray: [],     
    };
  },
  created() {
    // this.fetchUser();
    this.fetchReplies();  
  }, 
  methods: {
    // fetchUser() {
    //   const { id, name, account, avatar} = dummyUser.user

    //   this.user = {
    //     ...this.user,
    //     id,
    //     name,
    //     account,
    //     avatar,
    //   };
      
    // },
    fetchReplies() {
      dummyData.replies.forEach((reply) => {
        const { id, replyContent, createdAt, tweetId, tweetAuthorAccount, replyUser } = reply;

        const { id: userId, account, name, avatar } = replyUser;

        this.reply = {
          ...this.reply,
          id,
          replyContent,
          createdAt,
          tweetId,
          tweetAuthorAccount,
          replyUser: {
            id: userId,
            account,
            name,
            avatar,
          },
        };

        this.repliesArray.push(this.reply);
      });
    },
    // addUserToReply() {
    //   console.log(this.repliesArray)
    //   this.repliesArray.forEach((reply) => {
    //     reply["user"] = this.user;
    //     this.repliesWithUser.push(reply)
    //   });
    //   console.log(this.repliesWithUser)

    // },
  },
};
</script>

<style lang="scss" scoped>
.reply__card__wrapper {
  .reply__card {
    display: flex;
    border-top: 1px solid #e6ecf0;
    padding: 16px 24px;
    .reply__card__avatar {
      width: 50px;
      height: 50px;
      margin-right: 8px;
    }
    .reply__card__title {
      display: flex;
      align-items: center;
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
      }
    }
    .reply__card__target {
      display: flex;
      color: $secondary-gray;
      font-weight: 400;
      font-size: 14px;
      margin: 8px 0;
      P {
        margin-right: 2px;
      }
      .reply__card__target__account {
        color: $brand-orange;
      }
    }
    .reply__card__content {
      color: $scale-gray10;
      font-weight: 400;
      font-size: 16px;
    }
  }
}
</style>
