<template>
  <div>
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
          type="button"
          style="width: 88px"
          @click.stop.prevent="submitSetting"
        >儲存</button>
      </div>
    </template>

  </div>
</template>

<script>


export default {
  props: {
    isSignUp: {
      type: Boolean,
      required: true
    },
    initialUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      account: '',
      name: '',
      email: '',
      password: '',
      checkPassword: ''
    }
  },
  // for Setting views only
  mounted () {
    this.renderUser()
  },
  methods: {
    // for Setting views only
    renderUser () {
      this.account = this.initialUser.account
      this.name = this.initialUser.name
      this.email = this.initialUser.email
    },
    submitSignUp() {
      const data = JSON.stringify({
        account: this.account,
        name: this.name,
        email: this.email,
        password: this.password,
        checkPassword: this.checkPassword
      })
      console.log(data)
      // 註冊成功新增到 server後，router轉到 signin
      this.$router.push('/signin')
    },
    submitSetting() {
      const data = JSON.stringify({
        account: this.account,
        name: this.name,
        email: this.email,
        password: this.password,
        checkPassword: this.checkPassword
      })
      console.log(data)

      // setting成功更新到 server後，router轉到 main
      this.$router.push('/main')
    }
  },
  computed: {
    accountThreshold () {
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