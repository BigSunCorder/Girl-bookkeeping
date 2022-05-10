<template>
  <div>
    <label class="notes">
      <span class="notes__name">{{ this.fieldName }}</span>
      <input
        type="text"
        :placeholder="placeholder"
        :value="value"
        @input="onValueChanged($event.target.value)"
    /></label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  display: flex;
  &__name {
    padding: 0 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  input {
    height: 30px;
    flex-grow: 1;
    border: none;
    background: transparent;
  }
}
</style>
