<template>
  <div class="footer">
    <div class="footer__num">{{ output }}</div>
    <div class="footer__btn">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="inputContent">+</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="inputContent">-</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>

      <button class="kHight" @click="complete">完成</button>
      <button @click="inputContent">.</button>
      <button @click="inputContent">0</button>
      <button @click="removed">删除</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";
@Component
export default class Types extends Vue {
  @Prop(Number) readonly value!: number;
  output = this.value.toString();

  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent!;
    //判断output的长度
    if (this.output.length === 16) {
      return;
    }
    //output的开头为零的逻辑
    if (this.output === "0") {
      if ("0123456789-+".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    //output.的逻辑
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    }
    //output中的+或—不能放在一起
    if (
      (this.output[this.output.length - 1] === "+" ||
        this.output[this.output.length - 1] === "-") &&
      (input === "+" || input === "-")
    ) {
      return;
    }
    this.output += input;
  }

  removed() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }
  complete() {
    if (
      this.output[this.output.length - 1] === "+" ||
      this.output[this.output.length - 1] === "-"
    ) {
      this.output = this.output.slice(0, -1);
    }
    this.output = eval(this.output);
    this.$emit("update:value", this.output);
    this.$emit("submit", this.output);
    this.output = "0";
    this.$router.replace("/statistics");
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.footer {
  &__num {
    @extend %innerShadow;
    padding: 9px 16px;
    text-align: right;
    font-size: 36px;
    font-family: Consolas, monospace;
    height: 55px;
  }
  &__btn {
    // display: flex;
    @extend %clearfix;
    flex-wrap: wrap;
    button {
      float: left;
      width: 25%;
      height: 64px;
      border: none;
      background: transparent;
      &.kHight {
        height: 64 * 2px;
        float: right;
      }

      $color: #f2f2f2;
      &:nth-child(1) {
        background: $color;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($color, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($color, 4% * 2);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10),
      &:nth-child(13) {
        background: darken($color, 4% * 3);
      }
      &:nth-child(11),
      &:nth-child(8),
      &:nth-child(14) {
        background: darken($color, 4% * 4);
      }
      &:nth-child(15) {
        background: darken($color, 4% * 5);
      }
      &:nth-child(12) {
        background: darken($color, 4% * 6);
      }
    }
  }
}
</style>
