<template>

  <div class="container user__container">

    <MainNav />

    <div class="user__info__wrapper">
      <UserProfile @after-click-button="editUserProfile" />
      
      <ProfilePills :initial-selected="selected"/>

      <TweetCard />
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
      selected: 'likes'
    }    
  },
  methods: {
    editUserProfile() {
      this.isModalVisible = true
    },
    closeUserEditModal() {
      this.isModalVisible = false
    }
  } 
}

</script>

<style lang="scss" scoped>
.user__info__wrapper {
  border: 1px solid $border
}
</style>
