<template>
  <div class="login__wrapper">
    <div>
      <img
        src="../assets/image/logo-icon.png"
        alt="log"
      >
    </div>
    <div>
      <h1>後台登入</h1>
    </div>
    <LoginForm />
    <div class="router_wrapper text-right mr-3">
      <router-link to='/signin'>前台登入</router-link>
    </div>
  </div>

</template>

<script>
import LoginForm from '../components/LoginForm.vue'
export default {
  components: {
    LoginForm,
  }
}
</script>

<style lang="scss" scoped>
.login__wrapper {
  width: 400px;
  margin: 0 auto;
  padding: 6vh 0 60vh 0;
  img {
    margin: 0 auto;
    width: 50px;
    height: 50px;
    margin-bottom: 24px
  }
  h1 {
    text-align: center;
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 40px
  }
  .router_wrapper {
    a {
      color: $primary-blue;
      text-decoration: underline;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>