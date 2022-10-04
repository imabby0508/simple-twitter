<template>

  <div class="container main-container">

    <MainNav />
    <!-- Tweet -->
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


