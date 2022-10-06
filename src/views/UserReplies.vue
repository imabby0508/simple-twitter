<template>

  <div class="container user__container">

    <MainNav />

    <div class="user__info__wrapper">
      <UserProfile />
      
      <ProfilePills />

      <ReplyCard />
    </div>

    <PopularList />

    <UserEdit />

  </div>

</template>

<script>
import MainNav from "./../components/MainNav";
import UserProfile from "./../components/UserProfile";
import ProfilePills from "./../components/ProfilePills";
import ReplyCard from "./../components/ReplyCard";
import PopularList from "./../components/PopularList";
import UserEdit from "./../components/UserEdit";

export default {
  components: {
    MainNav,
    UserProfile,
    ProfilePills,
    ReplyCard,
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