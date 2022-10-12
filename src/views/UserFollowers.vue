<template>
  <Spinner v-if="isLoading" />
  <div v-else class="follow__container">

    <MainNav />

    <div class="user__follow__wrapper">
      <div class="user__follow__header">
        <router-link :to="{name: 'user-tweets'}">
          <img src="@/assets/image/arrow.png" alt="arrow" />
        </router-link>
        <div>
          <h4 class="header__name">{{user.name}}</h4>
          <p class="header__tweet__count">{{user.tweetCount}}推文</p>
        </div>      
      </div>

      <FollowPills />

      <FollowCard :user="user"/>
    </div>

    <PopularList />

  </div>

</template>


<script>
import MainNav from "./../components/MainNav";
import FollowPills from "./../components/FollowPills";
import FollowCard from "./../components/FollowCard";
import PopularList from "./../components/PopularList";
import userAPI from "@/apis/user";
import { Toast } from '@/utils/helpers';
import Spinner from './../components/Spinner'

// const dummyUser = {
//   user: {
//     id: 1,
//     tweetCount: 25,
//     name: 'John Doe',    
//   }
// }

export default {
  components: {
    MainNav,
    FollowPills,
    FollowCard,
    PopularList,
    Spinner
  },  
  data() {
    return {
      user: {
        id: -1,
        name: '',
        tweetCount: "",        
      },
      isLoading: true
    }
  },
  created() {
    const { id: userId } = this.$route.params
    this.fetchUser(userId)
  },
  methods: {
    async fetchUser(userId) {
      try {
        const { data } = await userAPI.getUser({ userId });
 
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        this.user = {
          ...this.user,
          ...data
        }
        this.isLoading = false
      } catch(error) {
        this.isLoading = false
        console.log("error", error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }      
    }
  }
}
</script>

<style lang="scss" scoped>
.follow__container {
  position: relative;
  margin: auto 9.3vw auto 9.3vw;
  .user__follow__wrapper {
    position: absolute;
    left: 14.4vw;
    right: 21.2vw;
    border: 1px solid $border;
    .user__follow__header {
      display: flex;
      padding: 16px 0;
      img {
        width: 17px;
        height: 14px;
        margin: 14px 20px 14px 28px;
      }
      .header__name {
        color: $scale-gray10;    
        font-size: 18px;
        font-weight: 700;
      }
      .header__tweet__count {
        color: $secondary-gray;    
        font-size: 13px;
        font-weight: 500;
      }
    }
  }
}
</style>
