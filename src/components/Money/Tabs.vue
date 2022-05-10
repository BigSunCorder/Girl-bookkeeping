<template>
  <div>
    <ul class="tabs">
      <li
        :class="{
          [classPrefix + '-item']: classPrefix,
          selected: item.value === value,
        }"
        v-for="(item, index) in dataSource"
        :key="item.index"
        @click="selected(item)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
type DataSourceItem = {
  text: "string";
  value: "string";
}[];
@Component({})
export default class Statistics extends Vue {
  @Prop({ required: true, type: Array }) dataSource!: DataSourceItem;
  @Prop() readonly value!: string;
  @Prop() classPrefix?: string;
  @Prop() classPrefix?: string;
  selected(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  background: #71ac98;
  li {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    height: 64px;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>
