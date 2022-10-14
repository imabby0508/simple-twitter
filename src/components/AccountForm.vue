<template>
  <form @submit.stop.prevent="submitSetting">
    <div class="form-wrapper">
      <label
        for="account"
        class="d-block"
      >帳號</label>
      <input
        type="text"
        id="account"
        name="account"
        placeholder="請輸入帳號"
        required
        class="d-block"
        v-model="account"
      >
      <div class="d-flex justify-content-between">
        <span class="input__info">{{accountThreshold > 10 ? '字數超出上限！' : ''}}</span>
        <span class="input__counter">{{accountThreshold}}/10</span>
      </div>
    </div>

    <div class="form-wrapper">
      <label
        for="name"
        class="d-block"
      >名稱</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="請輸入使用者名稱"
        required
        class="d-block"
        v-model="name"
      >
      <div class="d-flex justify-content-between">
        <span class="input__info">{{nameThreshold > 50 ? '字數超出上限！' : ''}}</span>
        <span class="input__counter">{{nameThreshold}}/50</span>
      </div>
    </div>

    <div class="form-wrapper">
      <label
        for="email"
        class="d-block"
      >Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="請輸入 Email"
        required
        class="d-block"
        v-model="email"
      >
    </div>

    <div class="form-wrapper">
      <label
        for="password"
        class="d-block"
      >密碼</label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="請設定密碼"
        required
        class="d-block"
        v-model="password"
      >
    </div>

    <div class="form-wrapper">
      <label
        for="checkPassword"
        class="d-block"
      >密碼確認</label>
      <input
        type="password"
        id="checkPassword"
        name="checkPassword"
        placeholder="請再次輸入密碼"
        required
        class="d-block"
        v-model="checkPassword"
      >
    </div>

    <template v-if="isSignUp">
      <div>
        <button
          type="button"
          @click.stop.prevent="submitSignUp"
        >註冊</button>
      </div>
      <div class="router_wrapper text-center">
        <router-link to="/signin">取消</router-link>
      </div>
    </template>

    <template v-else>
      <div class="d-flex justify-content-end">
        <button
          type="submit"
          style="width: 88px"
        >儲存</button>
      </div>
    </template>
  </form>
</template>

<script>
import authorizationAPI from '../apis/authorization'
import userAPI from '../apis/user'
import { Toast } from '../utils/helpers'

export default {
  props: {
    isSignUp: {
      type: Boolean,
      required: true
    },
    initialUser: {
      type: Object,
      default: () => {
        return {
          id: '',
          account: '',
          name: '',
          email: '',
          password: '',
          checkPassword: ''
        }
      }
    }
  },
  data() {
    return {
      id: '',
      account: '',
      name: '',
      email: '',
      password: '',
      checkPassword: '',
    }
  },
  watch: {
    initialUser: {
      handler(newData) {
        this.id = newData.id
        this.account = newData.account
        this.name = newData.name
        this.email = newData.email
        this.password = newData.password
        this.checkPassword = newData.checkPassword
      }
    }
  },
  // for Setting views only
  mounted() {
    this.renderUser()
  },
  methods: {
    // for Setting views only
    renderUser() {
      this.account = this.initialUser.account
      this.name = this.initialUser.name
      this.email = this.initialUser.email
      this.id = this.initialUser.id
    },
    async submitSignUp() {

      try {

        // 擋掉使用者拿掉 input required
        if (!this.account || !this.name || !this.email || !this.password || !this.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '請確認已填寫所有欄位'
          })
          return
        }

        // 擋掉使用者 account超過 10個字
        if (this.account.length > 10) {
          Toast.fire({
            icon: 'warning',
            title: '帳號字數超過上限'
          })
          return
        }

        // 擋掉使用者 name超過 50個字
        if (this.name.length > 50) {
          Toast.fire({
            icon: 'warning',
            title: '名稱字數超過上限'
          })
          return
        }

        // 擋掉使用者密碼設定不一致
        if (this.password !== this.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '密碼確認沒有正確輸入'
          })
          return
        }

        const response = await authorizationAPI.signUp({
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword
        })

        const { data } = response

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        Toast.fire({
          icon: 'success',
          title: '註冊成功了'
        })

        // 註冊成功新增到 server後，router轉到 signin
        this.$router.push('/signin')

      } catch (error) {
        console.error(error)

        // account 和 email 不能與其他人重複，重複時跳 toast
        Toast.fire({
          icon: 'error',
          title: error.response.data.message
        })
      }

    },
    async submitSetting(event) {
      try {

        // 擋掉使用者拿掉 input required
        if (!this.account || !this.name || !this.email || !this.password || !this.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '請確認已填寫所有欄位'
          })
          return
        }

        // 擋掉使用者 account超過 10個字
        if (this.account.length > 10) {
          Toast.fire({
            icon: 'warning',
            title: '帳號字數超過上限'
          })
          return
        }

        // 擋掉使用者 name超過 50個字
        if (this.name.length > 50) {
          Toast.fire({
            icon: 'warning',
            title: '名稱字數超過上限'
          })
          return
        }

        // 擋掉使用者密碼設定不一致
        if (this.password !== this.checkPassword) {
          Toast.fire({
            icon: 'warning',
            title: '密碼確認沒有正確輸入'
          })
          return
        }

        const form = event.target //取得 submit的 form
        const formData = new FormData(form) //透過 new FormData產生物件實例，並存在 變數裡
        const response = await userAPI.updateSetting({
          id: this.id,
          formData
        })
        const { data } = response
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        Toast.fire({
          icon: 'success',
          title: '設定成功了'
        })

        // setting成功更新到 server後，router轉到 main
        this.$router.push('/main')
      } catch (error) {
        console.error(error)
        Toast.fire({
          icon: 'error',
          title: error.response.data.message
        })
      }
    }
  },
  computed: {
    accountThreshold() {
      const accountLength = this.account.length
      return accountLength
    },
    nameThreshold() {
      const nameLength = this.name.length
      return nameLength
    }
  },
  updated() {
    if (this.accountThreshold > 10) {
      document.getElementById("account").style.borderBottomColor = "#FC5A5A";
    } else {
      document.getElementById("account").style.borderBottomColor = null;
    }

    if (this.nameThreshold > 50) {
      document.getElementById("name").style.borderBottomColor = "#FC5A5A";
    } else {
      document.getElementById("name").style.borderBottomColor = null;
    }
  },
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

    &:hover,
    &:focus {
      border-bottom-color: $sider-blue;
    }

    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 100px $form-bg inset;
    }
  }

  .input__info {
    color: $error-red;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
  }

  .input__counter {
    font-size: 12px;
    color: $scale-gray8;
    margin: 0px 0px 0px auto;
    text-align: right;
    padding: 0px;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
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

::placeholder {
  color: $scale-gray6;
  opacity: 1;
}
</style>