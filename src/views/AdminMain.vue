<template>
  <div class="main__container">
    <AdminNav />

    <Spinner v-if="isLoading" />
    <div class="main" v-else>
      <div class="main__title">
        <h4>推文清單</h4>
      </div>
      <div class="main__post">


        <div class="tweet__card__wrapper">
          <div
            v-for="tweet in tweetsCurrentPage"
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

        <nav aria-label="Page navigation" class="my-4">
          <ul class="pagination justify-content-center" id="paginator">
            <li class="page-item" v-for="page in paginator" :key="page" :class="{active: page === currentPage ? true : false}">
              <a class="page-link" href="#" @click.stop.prevent="handlePageChange(page)">{{page}}</a>
            </li>
          </ul>
        </nav>

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
import Spinner from '../components/Spinner.vue'

export default {
  mixins: [fromNowFilter, emptyAvatarFilter],
  components: {
    AdminNav,
    Spinner,
  },
  data() {
    return {
      isLoading: true,
      tweetsTotal: [],
      tweetsCurrentPage: [],
      paginator: [],
      currentPage: 1,
      tweetsPerPage: 10
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
        this.tweetsTotal = data
        this.getTweetByPage(1)
        this.renderPaginator(this.tweetsTotal.length)

        this.isLoading = false
      } catch (error) {
        console.error(error)
        this.isLoading = false
        ToastError.fire({
          title: '無法取得推文清單，請稍後再試'
        })
      }
    },
    async deleteTweet (tweetId) {
      try {

        const { data } = await adminAPI.deleteTweet({ id: tweetId })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.tweetsTotal = this.tweetsTotal.filter(tweet => (tweet.id !== tweetId))
        this.getTweetByPage(this.currentPage)

      } catch (error) {
        console.error(error)

        ToastError.fire({
          title: '無法刪除該推文，請稍後再試'
        })
      }
    },
    getTweetByPage(page) {
      const startIndex = (page - 1) * this.tweetsPerPage
      this.tweetsCurrentPage = this.tweetsTotal.slice(startIndex, startIndex + this.tweetsPerPage)
    },
    renderPaginator(amount) {
      const numOfPages = Math.ceil(amount / this.tweetsPerPage)
      for (let i = 1; i <= numOfPages; i++) {
        this.paginator.push(i)
      }
    },
    handlePageChange (page) {
      this.currentPage = page
      this.getTweetByPage(page)
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
  .page-item.active .page-link {
    background-color: $brand-orange;
    border-color: $border;
    color: $scale-gray2
  }

  .page-link {
    color: $scale-gray8
  }
}
</style>