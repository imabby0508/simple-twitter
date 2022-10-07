<template>

  <div class="main__container">

    <MainNav />

    <div class="tweet">
      <div class="tweet__post">
        <h4 class="tweet__title">首頁</h4>
        
        <div class="tweet__content">
          <div class="tweet__description">
            <img class="tweet__avatar" src="@/assets/image/avatar-1.png" alt="avatar">
            <h5>有什麼新鮮事?</h5>
          </div>
          <button>推文</button>
        </div>
      </div>    
    
      <TweetCard />
    </div>

    <PopularList />

  </div>
</template>

<script>
import MainNav from "./../components/MainNav";
import TweetCard from "./../components/TweetCard";
import PopularList from "./../components/PopularList";

export default {
  components: {
    MainNav,
    TweetCard,
    PopularList
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
    .tweet__description {
      display: flex;
      .tweet__avatar {
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }
      h5 {
        color: $secondary-gray;
        padding-left: 8px;
        line-height: 50px;
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


