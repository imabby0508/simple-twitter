<template>
  <nav class="sidebar">
    <div class="sidebar--logo">
      <img
        src="../assets/image/logo-icon.png"
        alt="logo"
      >
    </div>

    <div class="sidebar--menu">
      <div class="sidebar--menu--link d-flex align-items-center">
        <img
          src="../assets/image/home-icon.png"
          alt="home-page"
          class="mx-4"
        >
        <span>首頁</span>
      </div>
      <div class="sidebar--menu--link d-flex align-items-center">
        <img
          src="../assets/image/profile-icon.png"
          alt="profile-page"
          class="mx-4"
        >
        <span>個人資料</span>
      </div>
      <div class="sidebar--menu--link d-flex align-items-center">
        <img
          src="../assets/image/setting-icon.png"
          alt="setting-page"
          class="mx-4"
        >
        <span>設定</span>
      </div>
    </div>
    
    <div>
      <button>推文</button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.sidebar {
  background: #ccc;
  width: 100%;
  height: 100%;
  .sidebar--logo {
    padding: 13px 0 0 13px;
    img {
        width: 50px;
        height: 50px;
    }
  }
  .sidebar--menu{
    padding-top: 29px;

    .sidebar--menu--link:not(:last-child) {
      margin-bottom: 40px;
    }
    
    .sidebar--menu--link {
      img {
        width: 24px;
        height: 24px;
              &:hover {
                  color: $brand-orange
                }
      }
      span {
        color: $scale-gray9;
        font-weight: 700;
        font-size: 18px;
        line-height: 26px;
              &:hover {
                  color: $brand-orange
                }
      }

    }

  }
  button {
    width: 100%;
    height: 46px;
    border-radius: 50px;
    background: $brand-orange;
    font-size: 20px;
    color: $scale-gray1;
    padding: 8px 0;
    margin-top: 24px;
  }

}
</style>