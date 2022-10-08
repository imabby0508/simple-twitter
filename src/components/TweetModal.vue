<template>
  <transition name="modal">
    <div class="modal-mask">

      <div class="modal-wrapper">
        <div class="modal-container">
  
          <div class="modal-header">
            <img 
              src="../assets/image/orange-cross.png" 
              @click="$emit('close')"
              alt="close-madal">
          </div>
  
          <div class="modal-body d-flex">
            <img src="../assets/image/avatar-1.png" alt="avatar">
            <textarea 
            name="tweetContent" 
            required
            placeholder="有什麼新鮮事？"
            v-model="tweetContent"
            rows="5"
            ></textarea>
          </div>
  
          <div class="modal-footer">
            <span>{{tweetContentCount > 140 ? '字數不可超過 140 字' : ''}}</span>
            <span>{{!tweetContentCount ? '內容不可空白' : ''}}</span>
            <button
              @click.stop.prevent="submitTweet"
            >
              推文
            </button>
          </div>

        </div>
      </div>
      
    </div>
  </transition>
</template>

<script>
import { Toast } from '../utils/helpers.js'

const dummyUser = {
  currentUser: {
    id: 1,
    avatar: '../assets/image/avatar-1.png',
    name: 'Michael',
  },
}

export default {
  data () {
    return {
      currentUser: {},
      tweetContent: ""
    }
  },
  created () {
    this.fetchCurrentUser()
  },
  methods: {
    fetchCurrentUser () {
      this.currentUser = dummyUser.currentUser
    },
    submitTweet () {

      if (!this.tweetContent) {
        Toast.fire({
          icon: 'warning',
          title: '推文內容不可空白'
        })
        return
      } else if (this.tweetContent.length > 140) {
        Toast.fire({
          icon: 'warning',
          title: '推文內容不可超過 140字'
        })
        return
      }

      this.$emit('close')
    }
  },
  computed: {
    tweetContentCount () {
      const tweetCountLength = this.tweetContent.length
      return tweetCountLength
    }
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
  background-color: rgba(0, 0, 0, .5);
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
  transition: all .2s ease;

  .modal-header {
    padding: 20.5px 16px 20.5px 19.5px;
    img {
      width: 15px;
      height: 15px;
      // padding: 14px 0;
      border-bottom: 1px solid $border;
    }
  }

  .modal-body {
    padding: 16px 0 0 24px;
    img {
      width: 50px;
      height: 50px;
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