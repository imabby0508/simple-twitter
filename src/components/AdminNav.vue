<template>
  <nav class="sidebar">

    <div>

      <div class="sidebar--logo">
        <img
          src="../assets/image/logo-icon.png"
          alt="logo"
          class="icon-logo"
        >
      </div>

      <div class="sidebar--menu">

        <router-link
          to="/admin/main"
          class="d-flex align-items-center"
        >
          <img
            src='../assets/image/home-icon_active.png'
            alt="home-page"
            class="icon"
            v-if="$route.name === 'admin-main'"
          >
          <img
            src='../assets/image/home-icon.png'
            alt="home-page"
            class="icon"
            v-else
          >
          <span>推文清單</span>
        </router-link>

        <router-link
          to="/admin/users"
          class="d-flex align-items-center"
        >
          <img
            src="../assets/image/profile-icon_active.png"
            alt="profile-page"
            class="icon"
            v-if="$route.name === 'admin-users'"
          >
          <img
            src="../assets/image/profile-icon.png"
            alt="profile-page"
            class="icon"
            v-else
          >
          <span>使用者列表</span>
        </router-link>

      </div>

    </div>

    <div class="sidebar--menu">
      <router-link
        to="/signin"
        class="d-flex align-items-center"
      >
        <img
          src="../assets/image/logout-icon.png"
          alt="setting-page"
          class="icon"
        >
        <span>登出</span>
      </router-link>
    </div>

  </nav>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 9.3vw;
  z-index: 999;
  width: 12.7vw;
  max-width: 178px;
  min-width: 160px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 16px;
  background: $scale-gray1;

  .sidebar--logo {
    padding: 8px 0 0 8px;
    margin-bottom: 30px;
  }

  .sidebar--menu {
    padding-left: 16px;

    a:not(:last-child) {
      margin-bottom: 40px;
    }

    img {
      margin-right: 16px;
    }

    span {
      color: $scale-gray9;
      font-weight: 700;
      font-size: 18px;
      line-height: 26px;
    }
  }

  .icon-logo {
    width: 50px;
    height: 50px;
  }

  .icon {
    width: 24px;
    height: 24px;
  }

  .router-link-exact-active {
    span {
      color: $brand-orange;
    }
  }

}
</style>