<template>
  <layout>
    <div>
      <div class="navBar">
        <span class="title">标签明细</span>
      </div>
    </div>
    <div class="tags">
      <router-link
        to=""
        class="tag"
        v-for="(tag, index) in tags"
        :key="index.index"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span> <Icons name="right" />
      </router-link>
    </div>
    <div class="btn">
      <Button class="createTags" @click="createTag">新建标签</Button>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import Layout from "@/components/Layout.vue";
import { Component } from "vue-property-decorator";
@Component({
  components: {
    Layout,
  },
})
export default class Labels extends Vue {
  get tags() {
    return this.$store.state.tagList;
  }
  beforeCreate() {
    this.$store.commit("fetchTag"); //每个页面进入之前要重新fetch
  }
  createTag() {
    const name = window.prompt("请输入标签名");
    if (!name) {
      return window.alert("标签名不能为空");
    }
    this.$store.commit("createTag", name);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  padding: 0 10px;
  background: white;
  font-size: 16px;
  .tag {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e6e5e8;
  }
}
.createTags {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
}
.btn {
  text-align: center;
  padding: 16px;
  margin-top: 28px;
}
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 20px;
  background: #71ac98;
  display: flex;
  align-items: center;
  justify-content: center;

  .leftIcon {
    left: 16px;
    width: 20px;
    height: 20px;
  }
}
</style>
