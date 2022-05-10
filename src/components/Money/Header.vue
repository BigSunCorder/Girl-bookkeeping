<template>
  <div class="header">
    <ul class="header__current">
      <li v-for="(tag, index) in tagList" :key="index">
        <div
          @click="toggle(tag)"
          :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
          class="detail"
        >
          {{ tag.name }}
        </div>
      </li>
    </ul>
    <div class="header__btn">
      <button @click="create">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({})
export default class Header extends Vue {
  selectedTags: string[] = [];
  get tagList() {
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTag");
  }
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit("update:value", this.selectedTags);
  }
  create() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      return window.alert("标签名不能为空");
    }
    this.$store.commit("createTag", name);
  }
}
</script>

<style lang="scss" scoped>
.header {
  overflow: hidden;
  overflow-y: auto;
  background: white;
  display: flex;
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  flex-direction: column;
  &__current {
    display: flex;
    flex-wrap: wrap;

    // li {
    //   width: 25%;
    //   background-color: #d9d9d9;
    //   $hg: 24px;
    //   height: $hg;
    //   border-radius: $hg/2;
    //   // padding: 0 16px;
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;

    //   margin-top: 5px;
    //   &.selected {
    //     background: yellowgreen;
    //   }
    //   .detail {

    //   }
    // }
    li {
      display: flex;
      padding: 6px 0;
      width: 25%;
      // background: red;
      justify-content: center;
      align-items: center;

      .detail {
        $hg: 28px;
        height: $hg;
        border-radius: $hg/2;
        padding: 0 16px;
        background-color: #f2f2f2;
        line-height: $hg;
        &.selected {
          background: #71ac98;
        }
      }
    }
  }
  &__btn {
    padding-top: 16px;
    button {
      border: none;
      background: transparent;
      border-bottom: 1px solid;
      padding: 0 3px;
      color: #999;
      margin-left: 15px;
    }
  }
}
</style>
