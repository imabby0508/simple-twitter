<template>

  <div class="main__container">
    <AdminNav />
    <div class="main">
      <div class="main__title">
        <h4>推文清單</h4>
      </div>
      <div class="main__post">
        <div class=""></div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav.vue';

export default {
  components: {
    AdminNav,
  }
}
</script>

<style lang="scss" scoped>
.main__container {
  position: relative;
  margin: auto 9.3vw auto 9.3vw;
}

.main {
  position: absolute; //讓 setting置於 nav, popularlist 中間
  left: 14.4vw;
  right: 21.2vw;

  .main__title {
    position: fixed; //讓 title固定在上面
    top: 0;
    left: 23.7vw;
    right: 30.5vw;
    z-index: 99;
    padding: 24px;
    margin-bottom: 0;
    background: $scale-gray1;
    border: 1px solid $border;
  }

  .main__post {
    position: absolute; //讓 setting排在 title下面
    width: 100%;
    height: 90vh;
    top: 80px;
    padding: 24px 23px 0 23px;
    border-left: 1px solid $border;
    border-right: 1px solid $border;
  }
}
</style>