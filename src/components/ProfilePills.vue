<template>
  <ul class="nav">
    <li class="nav-item">
      <a class="nav-link active" href="#">推文</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">回覆</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#">喜歡的內容</a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.nav-link {
  color: #657786;
  font-weight: 700;
  font-size: 15px;
  width: 130px;
  height: 50px;
  text-align: center;
  line-height: 32px;
  &.active {
    color: $brand-orange;
    border-bottom: 2px solid $brand-orange;
  }
}
</style>