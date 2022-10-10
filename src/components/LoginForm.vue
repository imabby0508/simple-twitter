<template>
  <div>
    <div class="form-wrapper">
      <label for="account" class="d-block">帳號</label>
      <input
        type="text"
        id="account"
        name="account"
        placeholder="請輸入帳號"
        required
        autofocus
        class="d-block"
        v-model="account"
      >
    </div>

    <div class="form-wrapper">
      <label for="password" class="d-block">密碼</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="請輸入密碼"
        required
        autofocus
        class="d-block"
        v-model="password"
      >
    </div>

    <div v-if="$route.name === 'sign-in'">
      <button
        :class="{disabled: isProcessing}"
        :disabled="isProcessing"
        type="button"
        @click.stop.prevent="submitUserSignIn"
      >登入</button>
    </div>

    <div v-else>
      <button
        :class="{disabled: isProcessing}"
        :disabled="isProcessing"
        type="button"
        @click.stop.prevent="submitAdminSignIn"
      >登入</button>
    </div>

  </div>
</template>

<script>
import authorizationAPI from '@/apis/authorization'
import { Toast } from '@/utils/helpers'

export default {
  data () {
    return {
      account: '',
      password: '',
      isProcessing: false
    }
  },
  methods: {
    async submitUserSignIn () {

      try {

        if (!this.account || !this.password) {
          Toast.fire({
            icon: 'warning',
            title: '請填入帳號和密碼'
          })
          return
        }

        this.isProcessing = true

        const response = await authorizationAPI.signIn({
          account: this.account,
          password: this.password
        })

        const { data } = response

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        localStorage.setItem('token', data.data.token)
        this.$store.commit('setCurrentUser', data.data.user)
        this.$router.push('main')

      } catch (error) {
        this.password = ''

        Toast.fire({
          icon: 'warning',
          title: '請確認您輸入了正確的帳號密碼'
        })

        this.isProcessing = false
        console.log('error', error)

      }
    }
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper {
    margin-bottom: 32px;
    width: 100%;
    height: 54px;
    background-color: $form-bg;
    label {
      padding: 2px 10.55px 2px 10.55px;
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 0px;
      color: $scale-gray8;
    }
    input {
      padding: 2px 10.55px 2px 10.55px;
      width: 100%;
      border: 0px;
      background-color: $form-bg;
      font-size: 16px;
      line-height: 26px;
      color: $scale-gray10;
      border-bottom: 2px solid $form-border;
      &:hover, :focus {
        border-bottom: 2px solid $sider-blue;
      }
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 100px $form-bg inset;
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
    padding: 8px 24px;
    margin: 8px 0 22px 0;
    &.disabled {
      opacity: 0.5;
    }
  }
  ::placeholder {
    color: $scale-gray6;
    opacity: 1;
  }
</style>