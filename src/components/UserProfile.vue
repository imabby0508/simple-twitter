<template>

  <div class="user__profile">

    <div class="user__profile__header">
      <router-link :to="{name: 'main'}">
        <img src="@/assets/image/arrow.png" alt="arrow" />
      </router-link>
      <div>
        <h4 class="header__name">{{this.user.name}}</h4>
        <p class="header__tweet__count">{{this.user.tweetCount}}推文</p>
      </div>      
    </div>

    <div class="user__profile__content">
      <img class="user__cover" src="@/assets/image/user-cover.png" alt="user-cover-img">
      <img class="user__avatar" src="@/assets/image/avatar-1.png" alt="user-avatar">   
      <button @click.stop.prevent="showUserEditModal()">編輯個人資料</button>
      <div class="user__info">
        <div class="user__name">{{this.user.name}}</div>
        <div class="user__account">{{this.user.account}}</div>
        <div class="user__bio">
          {{this.user.bio}}
        </div>
        <div class="user__follow"> 
          <router-link :to="{name: 'user-followers', params: { id: '1'}}" class="user__follow__num">{{this.user.followingCount}}個</router-link><p class="following">跟隨中</p>
          <router-link :to="{name: 'user-followings', params: { id: '1'}}" class="user__follow__num">{{this.user.followerCount}}位</router-link><p class="follower">跟隨者</p>
        </div>
      </div>      
    </div> 
  </div>
</template>

<script>
const dummyUser = {
  user: {
    id: 1,
    tweetCount: 25,
    backgroundImage: '@/assets/image/user-cover.png',
    image: '@/assets/image/avatar-1.png',
    name: 'John Doe',
    account: '@heyjohn',
    bio: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.",
    followingCount: 34,
    followerCount: 59,
  }
}

export default {
  data() {
    return {
      user: {
        id: -1,
        tweetCount: "",
        backgroundImage: '',
        image: '',
        name: '',
        account: '',
        bio: "",
        followingCount: "",
        followerCount: "",
      },
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      this.user = {
        ...this.user,
        ...dummyUser.user
      }
    },
    showUserEditModal() {
      this.$emit("after-click-button")      
    },
  }
}
</script>

<style lang="scss" scoped>
.user__profile__header {
  display: flex;
  padding: 16px 0;
  img {
    width: 17px;
    height: 14px;
    margin: 14px 20px 14px 28px;
  }
  .header__name {
    color: $scale-gray10;    
    font-size: 18px;
    font-weight: 700;
  }
  .header__tweet__count {
    color: $secondary-gray;    
    font-size: 13px;
    font-weight: 500;
  }
}
.user__profile__content {
  position: relative;
  .user__cover {
    height: 200px;
    object-fit: cover;
    object-position: bottom;
  }
  .user__avatar {
    position: absolute;
    top: 124px;
    left: 16px;
    width: 140px;
    height: 140px;
    border: 4px solid $scale-gray1;
    border-radius: 50%;
  }
  button {
    position: absolute;
    top: 216px;
    right: 16px;
    color: $brand-orange;
    border: 1px solid $brand-orange;
    border-radius: 50px;
    width: 128px;
    height: 40px;
    font-size: 16px;
    font-weight: 400;
  } 
  .user__info {
    padding: 72px 16px 16px 16px;
    .user__name {
      color: $scale-gray10;
      font-size: 18px;
      font-weight: 700;
    }
    .user__account {
      color: $secondary-gray;
      font-size: 14px;
      font-weight: 400;
    }
    .user__bio {
      color: $scale-gray10;
      font-size: 14px;
      font-weight: 400;
      margin: 8px 0;
    }
    .user__follow {
      display: flex;
      font-size: 14px;
      font-weight: 400;
      color: $secondary-gray;    
      .user__follow__num {
        color: $scale-gray10;
      }
      .following {
        margin-right: 20px;
      }    
    }
  }   
}
</style>