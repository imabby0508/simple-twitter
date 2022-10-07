<template>


  <div class="main__container">

    <MainNav />

    <div class="tweet">

      <div class="tweet__title">
        <h4>首頁</h4>
      </div>

      <div class="tweet__post">
        <div class="tweet__content">
          <div class="tweet__description">
            <img
              class="tweet__avatar"
              src="@/assets/image/avatar-1.png"
              alt="avatar"
            >
            <h5>有什麼新鮮事?</h5>
          </div>
          <button>推文</button>
        </div>
        <TweetCard />
        <TweetCard />
        <TweetCard />
        <TweetCard />
        <TweetCard />
        <TweetCard />
        <TweetCard />
        <TweetCard />
        <TweetCard />
        <TweetCard />
        <TweetCard />
      </div>


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

  .tweet__title {
    position: fixed; //讓 title固定在上面
    top: 0;
    left: 23.7vw;
    right: 30.5vw;
    z-index: 99;
    padding: 24px;
    margin-bottom: 0;
    background: $scale-gray1;
    border: 1px solid $border;
  }

  .tweet__post {
    position: absolute; //讓 post排在 title下面
    top: 80px;
    border: 1px solid $border;
    border-top: 0px solid $border;
  }

  .tweet__content {
    position: relative;

    height: 136px;
    padding: 16px 24px;
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