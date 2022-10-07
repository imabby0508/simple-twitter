<template>

  <div class="follow__container">

    <MainNav />

    <div class="user__follow__wrapper">
      <div class="user__follow__header">
        <router-link :to="{name: 'user-tweets'}">
          <img src="@/assets/image/arrow.png" alt="arrow" />
        </router-link>
        <div>
          <h4 class="header__name">{{this.user.name}}</h4>
          <p class="header__tweet__count">{{this.user.tweetCount}}推文</p>
        </div>      
      </div>

      <FollowPills />

      <FollowCard />
    </div>

    <PopularList />

  </div>

</template>


<script>
import MainNav from "./../components/MainNav";
import FollowPills from "./../components/FollowPills";
import FollowCard from "./../components/FollowCard";
import PopularList from "./../components/PopularList";

const dummyUser = {
  user: {
    id: 1,
    tweetCount: 25,
    name: 'John Doe',    
  }
}

export default {
  components: {
    MainNav,
    FollowPills,
    FollowCard,
    PopularList
  },  
  data() {
    return {
      user: {
        id: -1,
        tweetCount: "",        
        name: ''
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
    }
  }
}

</script>

<style lang="scss" scoped>
.follow__container {
  position: relative;
  margin: auto 9.3vw auto 9.3vw;
  .user__follow__wrapper {
    position: absolute;
    left: 14.4vw;
    right: 21.2vw;
    border: 1px solid $border;
    .user__follow__header {
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
  }
}
</style>
