<template>

  <div class="user__profile">

    <div class="user__profile__header">
      <img src="@/assets/image/arrow.png" alt="arrow" />
      <div>
        <h4 class="header__name">John Doe</h4>
        <p class="header__tweet__count">25推文</p>
      </div>      
    </div>

    <div class="user__profile__content">
      <img class="user__cover" src="@/assets/image/user-cover.png" alt="user-cover-img">
      <img class="user__avatar" src="@/assets/image/avatar-1.png" alt="user-avatar">   
      <button>編輯個人資料</button>
      <div class="user__info">
        <div class="user__name">John Doe</div>
        <div class="user__account">@heyjohn</div>
        <div class="user__bio">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
        </div>
        <div class="user__follow"> 
          <p class="user__follow__num">34個</p><p class="following">跟隨中</p>
          <p class="user__follow__num">59位</p><p class="follower">跟隨者</p>
        </div>
      </div>      
    </div>  

  </div>

</template>

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
    padding: 7px 15px;
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