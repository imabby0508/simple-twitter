<template>
  <div class="login__wrapper">
    <div>
      <img
        src="../assets/logo@2x.png"
        alt="log"
      >
    </div>
    <div>
      <h1>建立你的帳號</h1>
    </div>
    <AccountForm
    :isSignUp="isSignUp"
    />
  </div>
</template>


<script>
import AccountForm from '../components/AccountForm.vue'
export default {
  components: {
    AccountForm,
  },
  data () {
    return {
      isSignUp: true,
    }
  }
}
</script>

<style lang="scss" scoped>
.login__wrapper {
  padding: 6vh 38vw 60vh 38vw;
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