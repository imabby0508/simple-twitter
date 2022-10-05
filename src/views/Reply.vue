<template>
  <div class="container reply-container">
    <MainNav />

    <div class="reply">
      <div class="reply__post">
        <div class="reply__header">
          <img src="@/assets/image/arrow.png" alt="arrow" />
          <h4 class="reply__title">推文</h4>
        </div>
        <div class="tweet__content">
          <div class="tweet__title">
            <img class="tweet__avatar" src="@/assets/image/user-avator.png" alt="avatar" />
            <div>
              <p class="tweet__name">Apple</p>
              <p class="tweet__account">@apple</p>
            </div>            
          </div>
          <div class="tweet__description">XXXXXXXXXXXXXXXXX</div>
          <div class="tweet__time">上午10:05·2021年11月10日</div>

          <hr />

          <div class="tweet__count"> 
            <p class="tweet__num">34</p><p class="tweet__reply">回覆</p>
            <p class="tweet__num">808</p><p class="tweet__like">喜歡次數</p>
          </div>

          <hr />

          <div class="tweet__card__footer" >
            <img src="@/assets/image/reply-icon.png" alt="reply">
            <img src="@/assets/image/like-icon.png" alt="like">            
          </div>
        </div>
      </div>

      <ReplyCard />
    </div>

    <PopularList />
  </div>
</template>

<script>
import MainNav from "./../components/MainNav";
import ReplyCard from "./../components/ReplyCard";
import PopularList from "./../components/PopularList";

export default {
  components: {
    MainNav,
    ReplyCard,
    PopularList,
  },
};
</script>
