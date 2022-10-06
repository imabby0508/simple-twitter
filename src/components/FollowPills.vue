<template>
  <ul class="nav">
    <li class="nav-item">
      <router-link class="nav-link active" to="/user/followers">追蹤者</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/user/followings">正在追隨</router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.nav {
  border-top: 1px solid $border;
  .nav-link {
    color: #657786;
    font-weight: 700;
    font-size: 15px;
    width: 130px;
    height: 50px;
    text-align: center;
    line-height: 32px;
    &.active {
      color: $brand-orange;
      border-bottom: 2px solid $brand-orange;
    }
  }
}

</style>