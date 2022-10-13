<template>

  <div class="main__container">

    <MainNav />

    <div class="tweet">
      <div class="tweet__post">
        <h4 class="tweet__title">首頁</h4>

        <div class="tweet__content">

          <div class="content d-flex">
            <img
              :src="currentUser.avatar | emptyAvatar"
              alt="avatar"
            >
            <textarea
              name="tweetContent"
              required
              placeholder="有什麼新鮮事？"
              v-model="tweetContent"
              rows="3"
            ></textarea>
          </div>
            
          <button @click.stop.prevent="showTweetModal = true">推文</button>

        </div>
      </div>

      <TweetCard />

      <TweetModal
        v-if="showTweetModal"
        @close="showTweetModal = false"
        @successTweet="successTweetModal"
      />

    </div>

    <PopularList />

  </div>
</template>

<script>
import MainNav from "./../components/MainNav";
import TweetCard from "./../components/TweetCard";
import PopularList from "./../components/PopularList";
import TweetModal from "./../components/TweetModal";
import { Toast } from "./../utils/helpers"
import { mapState } from 'vuex'
import { emptyAvatarFilter } from '../utils/mixins'

export default {
  name: "Main",
  mixins: [emptyAvatarFilter],
  computed: {
    ...mapState(['currentUser'])
  },
  components: {
    MainNav,
    TweetCard,
    PopularList,
    TweetModal
  },
  data() {
    return {
      user: {},
      showTweetModal: false,
    }
  },
  methods: {
    successTweetModal() {
      Toast.fire({
        icon: 'success',
        title: '推文發送成功'
      })
    }
  },
}

</script>

<style lang="scss" scoped>
.main__container {
  position: relative;
  margin: auto 9.3vw auto 9.3vw;
}

.tweet {
  position: absolute; //讓 tweet置於 nav, popularlist 中間
  left: 14.4vw;
  right: 21.2vw;
  border: 1px solid $border;

  .tweet__title {
    padding: 24px;
    margin-bottom: 0;
  }

  .tweet__content {
    position: relative;
    height: 136px;
    padding: 16px 24px;
    border-top: 1px solid $border;
    border-bottom: 10px solid $border;

    .content {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      textarea {
        width: 100%;
        height: 100%;
        padding: 12px 24px 12px 8px;
        border: none;
        color: $scale-gray10;
        font-weight: 400;
        font-size: 18px;
        line-height: 26px;
        resize: none;
        overflow-y: scroll;

        &::placeholder {
          color: $secondary-gray;
          font-weight: 400;
          font-size: 18px;
          line-height: 26px;
        }
      }
    }

    button {
      position: absolute;
      right: 40px;
      bottom: 16px;
      width: 64px;
      height: 40px;
      border-radius: 50px;
      border: none;
      background: $brand-orange;
      color: $scale-gray1
    }
  }
}
</style>