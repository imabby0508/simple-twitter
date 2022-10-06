<template>
  <div class="follow__card__wrapper">
    <div class="follow__card">
      <div class="follow__card__content">
        <img class="follow__card__avatar" src="@/assets/image/user-avatar.png" alt="avatar">
        <div class="follow__card__right">
          <div class="follow__card__title">
            <div>
              <p class="follow__card__name">Apple</p>
              <p class="follow__card__account">@apple</p>
            </div>
            <button class="follow__card__btn--following">正在跟隨</button>
          </div>
          <p class="follow__card__description">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. 
          </p>          
        </div>
      </div>
    </div>

    <div class="follow__card">
      <div class="follow__card__content">
        <img class="follow__card__avatar" src="@/assets/image/user-avatar.png" alt="avatar">
        <div class="follow__card__right">
          <div class="follow__card__title">
            <div>
              <p class="follow__card__name">Apple</p>
              <p class="follow__card__account">@apple</p>
            </div>
            <button class="follow__card__btn--unfollowing">跟隨</button>
          </div>
          <p class="follow__card__description">
            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum. 
          </p>          
        </div>
      </div>
    </div>
  </div>  
</template>

<script>


export default {
  data() {
    return {
      id: -1,
      name: "",
      account: "",
      image: "",
      bio: "",
      isFollowing: false,
      isFollowed: false,
    }
  },
  methods: {
    fetchFollower() {

    }
  }
}
</script>

<style lang="scss" scoped>
.follow__card { 
  border-top: 1px solid $border;;   
  .follow__card__content {
    display: flex;
    padding: 16px 24px;
    .follow__card__avatar {
      border-radius: 50%;
      width: 50px;
      height: 50px;
    }    
    .follow__card__right {
      padding-left: 8px;
      .follow__card__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .follow__card__btn--following {
          width: 96px;
          height: 40px;
          background-color: $brand-orange;
          border-radius: 50px;
          color: $scale-gray1;
          font-size: 16px;
          font-weight: 400;
        }
        .follow__card__btn--unfollowing {
          width: 64px;
          height: 40px;
          background-color: $scale-gray1;
          border: 1px solid $brand-orange;
          border-radius: 50px;          
          color: $brand-orange;
          font-size: 16px;
          font-weight: 400;
        }
        p {
          margin: 0
        }
        .follow__card__name {
          margin: 0 8px 0 0;
          font-size: 16px;
          font-weight: 700;
        }
        .follow__card__account {
          color: $secondary-gray;
          font-size: 14px;
          font-weight: 400;
        }
      }
      .follow__card__description {
        color: $scale-gray10;
        font-size: 16px;
        font-weight: 400;
        margin: 0;
        padding: 10px 0;
      }
    }
  }
}
</style>