<template>
  <div class="reply__card__wrapper">
    <div class="reply__card">
      <img class="reply__card__avatar" src="@/assets/image/user-avatar.png" alt="avatar">
      <div class="reply__card__right">
        <div class="reply__card__title">
          <p class="reply__card__name">Devon Lane</p>
          <p class="reply__card__account">@devon-lane</p>
          <p class="reply__card__time">・12小時</p>
        </div>
        <div class="reply__card__target">
          <p>回覆</p>
          <p class="reply__card__target__account">@apple</p>
        </div>
        <p class="reply__card__content">
          former apple engineer shares a simple DIY fix to seal your surgical mask
        </p>
      </div>
    </div>

    <div class="reply__card">
      <img class="reply__card__avatar" src="@/assets/image/user-avatar.png" alt="avatar">
      <div class="reply__card__right">
        <div class="reply__card__title">
          <p class="reply__card__name">Devon Lane</p>
          <p class="reply__card__account">@devon-lane</p>
          <p class="reply__card__time">・12小時</p>
        </div>
        <div class="reply__card__target">
          <p>回覆</p>
          <p class="reply__card__target__account">@apple</p>
        </div>
        <p class="reply__card__content">
          Michelin Challenges Creatives to Upcycle
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.reply__card__wrapper {
  .reply__card {
    display: flex;
    border-top: 1px solid #e6ecf0;
    padding: 16px 24px;
    .reply__card__avatar {
      width: 50px;
      height: 50px;
      margin-right: 8px;
    }
    .reply__card__title {
      display: flex;
      align-items: center;
      .reply__card__name {
        color: $scale-gray10;
        font-weight: 700;
        font-size: 16px;
        margin-right: 8px;
      }
      .reply__card__account,
      .reply__card__time {
        color: $secondary-gray;
        font-weight: 400;
        font-size: 14px;
      }
    }
    .reply__card__target {
      display: flex;
      color: $secondary-gray;
      font-weight: 400;
      font-size: 14px;
      margin: 8px 0;
      P {
        margin-right: 2px;
      }
      .reply__card__target__account {
        color: $brand-orange;
      }
    }
    .reply__card__content {
      color: $scale-gray10;
      font-weight: 400;
      font-size: 16px;
    }
  }
}
</style>