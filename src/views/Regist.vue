<template>
  <div class="login__wrapper">
    <div>
      <img
        src="../assets/image/logo-icon.png"
        alt="logo"
      >
    </div>
    <div>
      <h1>建立你的帳號</h1>
    </div>
    <AccountForm
    :isSignUp="true"
    />
  </div>
</template>


<script>
import AccountForm from '../components/AccountForm.vue'
export default {
  components: {
    AccountForm,
  },
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
}
</style>