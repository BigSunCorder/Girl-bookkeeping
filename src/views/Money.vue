<template>
  <layout class-prefix="xxx">
    <Footer :value.sync="record.amount" @submit="saveRecord" />

    <div class="note">
      <Notes
        :value="record.notes"
        placeholder=" 写点备注吧~"
        field-name="备注"
        @update:value="onUpdateNotes"
      />
    </div>
    <Header @update:value="record.tags = $event" />
    <Tabs :value.sync="record.type" :data-source="recordTypeList" />
  </layout>
</template>
<script lang="ts">
import Vue from "vue";
import recordTypeList from "@/constants/recordTypeList";
import Layout from "@/components/Layout.vue";
import Footer from "@/components/Money/Footer.vue";
import Tabs from "@/components/Money/Tabs.vue";
import Notes from "@/components/Money/Notes.vue";
import Header from "@/components/Money/Header.vue";
import { Component } from "vue-property-decorator";

type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number; // 数据类型 object | string
  createAt?: Date; // 类 / 构造器
};
@Component({
  components: {
    Layout,
    Footer,
    Notes,
    Header,
    Tabs,
  },
})
export default class Money extends Vue {
  recordTypeList = recordTypeList;
  get recordList() {
    //将computed改成get函数
    return this.$store.state.recordList;
  }
  // 将type进行类型赋值，然后在进行声明初始值
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0 };

  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("已保存");
    }
    this.record.notes = "";
  }
}
</script>

<style lang="scss">
::v-deep .types-item {
}
.xxx-content {
  display: flex;
  flex-direction: column-reverse;
}
.note {
  padding: 12px 0;
}
</style>
