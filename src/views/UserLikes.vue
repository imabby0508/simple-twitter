<template>

  <div class="user__container">

    <MainNav />

    <div class="user__info__wrapper">
      <UserProfile @after-click-button="editUserProfile" :is-updated="isUpdated"/>
      
      <ProfilePills />

      <TweetCard :is-updated="isUpdated"/>
    </div>

    <PopularList />

    <UserEdit v-if="isModalVisible" @after-click-button="closeUserEditModal" />

  </div>

</template>

<script>
import MainNav from "./../components/MainNav";
import UserProfile from "./../components/UserProfile";
import ProfilePills from "./../components/ProfilePills";
import TweetCard from "./../components/TweetCard";
import PopularList from "./../components/PopularList";
import UserEdit from "./../components/UserEdit";

export default {
  components: {
    MainNav,
    UserProfile,
    ProfilePills,
    TweetCard,
    PopularList,
    UserEdit
  },
  data() {
    return {
      isModalVisible: false,
      isUpdated: false
    }    
  },
  methods: {
    editUserProfile() {
      this.isModalVisible = true,
      this.isUpdated = false
    },
    closeUserEditModal() {
      this.isModalVisible = false,
      this.isUpdated = true
    }
  } 
}

</script>

<style lang="scss" scoped>
.user__container {
  position: relative;
  margin: auto 9.3vw auto 9.3vw;
  .user__info__wrapper {
    position: absolute; 
    left: 14.4vw;
    right: 21.2vw;
    border: 1px solid $border
  }
}
</style>
