<template>
  <div>
    <div class="navBar">
      <Icons class="leftIcon" name="left" @click.native="goBack"></Icons>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class EditLabels extends Vue {
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 20px;
  background: #71ac98;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .leftIcon {
    left: 16px;
    width: 20px;
    height: 20px;
  }
}
</style>
