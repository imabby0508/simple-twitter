<template>
  <div class="reply__container">
    <MainNav />

    <div class="reply">
      <div class="reply__post">
        <div class="reply__header">
          <img src="@/assets/image/arrow.png" alt="arrow" />
          <h4 class="reply__title">推文</h4>
        </div>
        <div class="tweet__content">
          <div class="tweet__title">
            <img class="tweet__avatar" src="@/assets/image/user-avatar.png" alt="avatar" />
            <div>
              <p class="tweet__name">Apple</p>
              <p class="tweet__account">@apple</p>
            </div>            
          </div>
          <div class="tweet__description">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt.
          </div>
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

<style lang="scss" scoped>
.reply__container {
  position: relative;
  margin: auto 9.3vw auto 9.3vw;
}
.reply {
  position: absolute;
  left: 14.4vw;
  right: 21.2vw;
  border: 1px solid #e6ecf0;
  .reply__header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e6ecf0;
    padding: 24px 28px;
    img {
      width: 17px;
      height: 14px;
      margin-right: 20px;
    }
  }
  .tweet__content {
    padding: 16px;
    .tweet__title {
      display: flex;
      .tweet__avatar {
        width: 50px;
        height: 50px;
        margin-right: 8px;
      }
      .tweet__name {
        color: $scale-gray10;
        font-weight: 700;
        font-size: 16px;
      }
      .tweet__account {
        color: $secondary-gray;
        font-weight: 400;
        font-size: 14px;
      }
    }
    .tweet__description {
      color: $scale-gray10;
      font-weight: 400;
      font-size: 24px;
      margin: 8px 0;
    }
    .tweet__time {
      color: $secondary-gray;
      font-weight: 500;
      font-size: 14px;
    }
    .tweet__count {
      display: flex;
      line-height: 23px;
      color: $secondary-gray;
      font-weight: 500;
      font-size: 19px;
      .tweet__num {
        color: $scale-gray10;
        font-weight: 700;
        font-family: Montserrat;
        margin-right: 3px;
        line-height: 28px;
      }
      .tweet__reply {
        margin-right: 24px;
      }
    }
    .tweet__card__footer {
      display: flex;
      img {
        width: 25px;
        height: 23px;
        margin-right: 134px;
      }
    }
    hr {
      color: #e6ecf0;
      width: 99%;
    }
  }
}
</style>
