<template>
  <nav class="nav">
    <router-link class="nav__item" to="/money" active-class="selected">
      <Icons name="money" />
      记账
    </router-link>
    <router-link class="nav__item" to="/labels" active-class="selected"
      ><Icons name="label" />标签
    </router-link>
    <router-link class="nav__item" to="/statistics" active-class="selected">
      <Icons name="statistic" />统计</router-link
    >
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  @extend %outerShadow;
  display: flex;
  .nav__item {
    padding: 2px 0;
    display: flex;
    width: 33.3333%;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 30px;
      height: 30px;
    }
    &.selected {
      color: #268c6a;
    }
  }
}
</style>
