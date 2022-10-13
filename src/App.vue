<template>
  <div id="simple-twitter">
    <router-view :key="$route.path" />
  </div>
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  name: "App",
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
