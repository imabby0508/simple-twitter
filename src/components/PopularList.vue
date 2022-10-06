<template>
  <div>
    <div>
      <h1>推薦跟隨</h1>
    </div>
    <div class="popularUsers--wrapper">
      <div>
        <div>
          <img
            src=""
            alt=""
          >
        </div>
        <div>
          <h3>name</h3>
          <p>@name</p>
        </div>
        <div>
          <button>正在跟隨</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const dummyData = {
  topUsers: {
    user: {
      id: 14,
      image: '../assets/image/user-avatar.png',
      account: "nancy",
      name: "nancy",
      email: "nancy@example.com",
      password: "$2a$10$4VljBf69Ic.oA3e5jaCDVusjsl5ovB1KbvlvM2FDU/bGlMBxgI6Tm",
    },
    user: {
      id: 14,
      image: '../assets/image/user-avatar.png',
      account: "nancy",
      name: "nancy",
      email: "nancy@example.com",
      password: "$2a$10$4VljBf69Ic.oA3e5jaCDVusjsl5ovB1KbvlvM2FDU/bGlMBxgI6Tm",
    },
    user: {
      id: 14,
      image: '../assets/image/user-avatar.png',
      account: "nancy",
      name: "nancy",
      email: "nancy@example.com",
      password: "$2a$10$4VljBf69Ic.oA3e5jaCDVusjsl5ovB1KbvlvM2FDU/bGlMBxgI6Tm",
    }
  }
}



export default {
  data () {
    return {
      users: ''
    }
  }
}
</script>

<style lang="scss" scoped>
div {
    position: fixed;
    top: 0;
    right: 154px;
    width: 19.5vw;
    background: $sider-green;
  }
</style>