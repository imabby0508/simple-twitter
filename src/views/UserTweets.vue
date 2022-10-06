<template>

  <div class="container user__container">

    <MainNav />

    <div class="user__info__wrapper">
      <UserProfile />
      
      <ProfilePills />

      <TweetCard />
    </div>

    <PopularList />

    <UserEdit />

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
}

</script>

<style lang="scss" scoped>
.user__info__wrapper {
  border: 1px solid $border
}
</style>
