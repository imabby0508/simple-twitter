<template>
  <ul class="nav">
    <li class="nav-item">
      <router-link :class="{active: $route.name === 'user-tweets'}" class="nav-link" :to="{ name: 'user-tweets'}">推文</router-link>
       
    </li>
    <li class="nav-item">
      <router-link :class="{active: $route.name === 'user-replies'}" class="nav-link" :to="{ name: 'user-replies'}">回覆</router-link>
    </li>
    <li class="nav-item">
      <router-link :class="{active: $route.name === 'user-likes'}" class="nav-link" :to="{ name: 'user-likes'}">喜歡的內容</router-link>
    </li>
  </ul>
  
</template>

<script>
export default {

}

</script>

<style lang="scss" scoped>
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
</style>