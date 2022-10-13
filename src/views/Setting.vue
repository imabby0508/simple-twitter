<template>

  <div class="setting__container">
    <MainNav />
    <div class="setting">
      <div class="setting__title">
        <h4>帳戶設定</h4>
      </div>
      <div class="setting__post">
        <AccountForm
        :isSignUp="false"
        :initialUser = "currentUser"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MainNav from "./../components/MainNav.vue";
import AccountForm from "@/components/AccountForm.vue";
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['currentUser'])
  },
  components: {
    MainNav,
    AccountForm,
  },
}

</script>

<style lang="scss" scoped>
.setting__container {
  position: relative;
  margin: auto 9.3vw auto 9.3vw;
}

.setting {
  position: absolute; //讓 setting置於 nav, popularlist 中間
  left: 14.4vw;
  right: 21.2vw;

  .setting__title {
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

  .setting__post {
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