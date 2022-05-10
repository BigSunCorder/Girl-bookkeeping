<template>
  <Layout>
    <!-- <div class="navBar">
      <Icons class="leftIcon" name="left" @click.native="goBack"></Icons>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div> -->
    <NavBar />
    <div class="form-wrapper">
      <Notes
        :value="tag.name"
        @update:value="update"
        placeholder="请输入标签名"
        field-name="标签名"
      >
      </Notes>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Notes from "@/components/Money/Notes.vue";
import Button from "@/components/Money/Button.vue";
import NavBar from "@/components/NavBar";
import NavBar from "../components/NavBar.vue";
@Component({
  components: { Notes, Button, NavBar },
})
export default class EditLabels extends Vue {
  get tag() {
    return this.$store.state.currentTag;
  }
  created() {
    this.$store.commit("fetchTag");
    const id = this.$route.params.id;
    this.$store.commit("setCurrentTag", id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  update(name: string) {
    if (this.tag) {
      this.$store.commit("updateTag", { id: this.tag.id, name });
    }
  }
  remove() {
    if (this.tag) {
      this.$store.commit("removeTag", this.tag.id);
    }
  }
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
  .title {
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
  padding: 8px 0;
}
.button-wrapper {
  //   text-align: center;
  display: flex;
  justify-content: center;
  padding: 16px;
  margin-top: 28px;
}
</style>
