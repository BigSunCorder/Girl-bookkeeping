<template>
  <layout>
    <!-- <Types class-prefix="zzz" :value.sync="y"></Types> -->
    <Tabs
      class-prefix="types"
      :data-source="recordTypeList"
      :value.sync="type"
    />
    <!-- <Tabs
      class-prefix="interval"
      :data-source="intervalList"
      :value.sync="interval"
    /> -->
    <div>
      <ul v-if="groupList.length > 0">
        <li v-for="(group, index) in groupList" :key="index">
          <h3 class="title">
            {{ beautiful(group.title) }} <span>￥{{ group.total }}</span>
          </h3>
          <ul>
            <li class="record" v-for="item in group.items" :key="item.id">
              <span>{{ tagString(item.tags) }}</span>
              <span class="notes">{{ item.notes }}</span>
              <span>￥{{ item.amount }}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="recordNotes" v-else>
        <div class="icons">
          <Icons name="record" />
        </div>
        <span>暂时还没有记录快去记一笔吧~</span>
      </div>
    </div>
  </layout>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Layout from "@/components/Layout.vue";
import Tabs from "@/components/Money/Tabs";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone.ts";

const oneDay = 86400 * 1000;
@Component({
  components: {
    Layout,
    Tabs,
  },
})
export default class Statistics extends Vue {
  tagString(tags: tag[]) {
    return tags.length === 0 ? "无" : tags.map((t) => t.name).join("，");
  }
  beautiful(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    console.log(day.isSame(now, "day")); //判断其和今天是不是同一天
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("MM月D日");
    } else {
      return day.format("YYYY年MM月D日");
    }
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get groupList() {
    const { recordList } = this;
    type HashTableValue = { title: string; items: RecordItem[] };
    const newList = clone(recordList)
      .filter((t) => t.type === this.type)
      .sort(
        (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
      );
    if (newList.length === 0) {
      return [];
    }
    type Result = {
      title: string;
      total?: number;
      items: RecordItem[];
    }[];
    const result: Result = [
      {
        title: dayjs(newList[0].createAt).format("YYYY-MM-DD"),
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createAt).format("YYYY-MM-DD"),
          items: [current],
        });
      }
    }
    // const x = result.map((group) => {
    //   group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    // });
    const x = result.map((group) => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }
  created() {
    this.$store.commit("fetchRecords");
  }
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
// ::v-deep找到其里面的组件，并更改其中的样式
::v-deep .types-item {
  background: white;
  &.selected {
    background: #71ac98;
    &::after {
      display: none;
    }
  }
}
::v-deep li.interval-item {
  height: 48px;
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.title {
  @extend %item;
}
.record {
  @extend %item;

  background: white;
}
.recordNotes {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;

  .icon {
    width: 80px;
    height: 80px;
  }
  span {
    color: #999;
    font-size: 12px;
  }
}
</style>
