<template>
  <div class="tweet__card__wrapper">
    <div class="tweet__card">
      <div class="tweet__card__content">
        <img class="tweet__card__avatar" src="@/assets/image/user-avatar.png" alt="avatar">
        <div class="tweet__card__right">
          <div class="tweet__card__title">
            <p class="tweet__card__name">Apple</p>
            <p class="tweet__card__account">@apple</p>
            <p class="tweet__card__time">・3小時</p>
          </div>
          <p class="tweet__card__description">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. 
          </p>
          <div class="tweet__card__footer" >
            <img src="@/assets/image/reply-icon.png" alt="reply">
            <p>13</p>
            <img src="@/assets/image/like-icon.png" alt="like">
            <p>76</p>
          </div>
        </div>
      </div>
    </div>

    <div class="tweet__card">
      <div class="tweet__card__content">
        <img class="tweet__card__avatar" src="@/assets/image/user-avatar.png" alt="avatar">
        <div class="tweet__card__right">
          <div class="tweet__card__title">
            <p class="tweet__card__name">Apple</p>
            <p class="tweet__card__account">@apple</p>
            <p class="tweet__card__time">・3小時</p>
          </div>
          <p class="tweet__card__description">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. 
          </p>
          <div class="tweet__card__footer" >
            <img src="@/assets/image/reply-icon.png" alt="reply">
            <p>13</p>
            <img src="@/assets/image/like-icon.png" alt="like">
            <p>76</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  
</template>

<style lang="scss" scoped>
.tweet__card { 
  border-top: 1px solid $border;;   
  .tweet__card__content {
    display: flex;
    padding: 16px 24px;
    .tweet__card__avatar {
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }    
    .tweet__card__right {
      padding-left: 8px;
      .tweet__card__title {
        display: flex;
        align-items: center;
        p {
          margin: 0
        }
        .tweet__card__name {
          margin: 0 8px 0 0;
          font-size: 16px;
          font-weight: 700;
        }
        .tweet__card__account, .tweet__card__time {
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
        padding: 10px 0;
      }
    }
  }
  .tweet__card__footer {
    display: flex;
    align-items: center;
    color: $secondary-gray;
    font-size: 14px;
    font-weight: 600;
    font-family: Montserrat;
    img {
      width: 13px;
      height: 13px;        
    }
    p {
      margin: 0 40px 0 10px;
    }
  }    
}
</style>