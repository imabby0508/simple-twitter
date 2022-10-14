<template>
  <transition name="modal">
    <div class="modal-mask">

      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <img
              class="cursor-pointer"
              src="../assets/image/orange-cross.png"
              @click="$emit('close')"
              alt="close-madal"
            >
          </div>

          <div class="modal-body">

            <div
              class="tweet--card d-flex"
              v-if="$route.name === 'user-likes'"
            >
              <img
                :src="tweet.Tweet.tweetAuthor.avatar | emptyAvatar"
                alt="tweet-avatar"
              >
              <div class="tweet--card--connectline"></div>
              <div class="tweet--card--content">
                <div class="tweet--card--title d-flex align-items-center">
                  <p class="name">{{tweet.Tweet.tweetAuthor.name}}</p>
                  <p class="accounttime">@{{tweet.Tweet.tweetAuthor.account}}・{{tweet.Tweet.createdAt | fromNow}}</p>
                </div>
                <p class="tweet--card--description">{{tweet.Tweet.description}}</p>
                <p class="tweet--card--target">回覆給 <span>@{{tweet.Tweet.tweetAuthor.account}}</span></p>
              </div>
            </div>

            <div
              class="tweet--card d-flex"
              v-else
            >
              <img
                :src="tweet.tweetAuthor.avatar | emptyAvatar"
                alt="tweet-avatar"
              >
              <div class="tweet--card--connectline"></div>
              <div class="tweet--card--content">
                <div class="tweet--card--title d-flex align-items-center">
                  <p class="name">{{tweet.tweetAuthor.name}}</p>
                  <p class="accounttime">@{{tweet.tweetAuthor.account}}・{{tweet.createdAt | fromNow}}</p>
                </div>
                <p class="tweet--card--description">{{tweet.description}}</p>
                <p class="tweet--card--target">回覆給 <span>@{{tweet.tweetAuthor.account}}</span></p>
              </div>
            </div>

            <div class="reply--card d-flex">
              <img
                :src="currentUser.avatar | emptyAvatar"
                alt="reply-avatar"
              >
              <textarea
                name="replyContent"
                required
                placeholder="推你的回覆"
                v-model="replyContent"
                rows="5"
              ></textarea>
            </div>
          </div>

          <div class="modal-footer">
            <span>{{replyContentCount > 140 ? '字數不可超過 140 字' : ''}}</span>
            <span>{{!replyContentCount ? '內容不可空白' : ''}}</span>
            <button
              @click.stop.prevent="submitReply(tweet.TweetId)"
              v-if="$route.name === 'user-likes'"
            >
              回覆
            </button>
            <button
              @click.stop.prevent="submitReply(tweet.id)"
              v-else
            >
              回覆
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import replyAPI from '../apis/reply'
import { Toast, ToastError, ToastWarning } from '../utils/helpers'
import { mapState } from 'vuex'
import { emptyAvatarFilter } from '../utils/mixins'
import { fromNowFilter } from "./../utils/mixins";

export default {
  mixins: [emptyAvatarFilter, fromNowFilter],
  props: {
    tweet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      replyContent: ""
    }
  },
  methods: {
    async submitReply(tweetId) {

      try {

        if (!this.replyContent) {
          ToastWarning.fire({
            title: '回覆內容不可空白'
          })
          return
        } else if (this.replyContent.length > 140) {
          ToastWarning.fire({
            title: '回覆內容不可超過140字'
          })
          return
        }

        const { data } = await replyAPI.addReply({
          TweetId: tweetId,
          comment: this.replyContent
        })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.$emit('close')
        this.$emit('successReply', {
          TweetId: tweetId,
          comment: this.replyContent
        })

      } catch (error) {
        console.error(error)
        ToastWarning.fire({
          title: '目前無法回復該推文，請稍後再試'
        })

      }
    }
  },
  computed: {
    replyContentCount() {
      const replyCountLength = this.replyContent.length
      return replyCountLength
    },
    ...mapState(['currentUser'])
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity .4s ease;
  padding: 56px 30.5vw 300px 23.7vw;
}

.modal-wrapper {
  padding: 56px 30.5vw auto 23.7vw;
}

.modal-container {
  width: 45.7vw;
  background-color: $scale-gray1;
  border-radius: 14px;
  height: 100%;
  transition: all .2s ease;

  .modal-header {
    padding: 20.5px 16px 20.5px 19.5px;

    img {
      width: 15px;
      height: 15px;
      border-bottom: 1px solid $border;
    }
  }

  .modal-body {
    font-family: "Noto Sans TC";
    padding: 15px;

    img {
      max-width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .tweet--card {
      position: relative;

      img {
        margin-right: 10px;
      }

      &--connectline {
        position: absolute;
        top: calc(50px + 16px);
        left: calc(25px - 1px);
        bottom: calc(16px - 23px);
        background-color: $scale-gray6;
        width: 2px;
      }

      &--title {
        .name {
          color: $modal-black;
          font-weight: 700;
          font-size: 16px;
          line-height: 26px;
          margin-right: 8px;
        }

        .accounttime {
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
        }
      }

      &--description {
        margin-top: 8px;
        color: $modal-black;
        font-weight: 400;
        font-size: 16px;
        line-height: 26px;
      }

      &--target {
        margin-top: 11px;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;

        span {
          color: $brand-orange;
        }
      }
    }

    .reply--card {
      margin-top: 23px;

      img {
        margin-right: 2px;
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
  }

  .modal-footer {
    border-top: none;

    button {
      height: 46px;
      border-radius: 50px;
      background: $brand-orange;
      font-size: 20px;
      color: $scale-gray1;
      padding: 8px 24px;
      margin: 0 16px 16px 0;
    }

    span {
      color: $error-red;
      font-weight: 500;
      margin: 0 16px 16px 0;
      font-size: 15px;
      line-height: 15px;
    }
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}
</style>