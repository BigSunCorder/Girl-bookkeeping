import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import router from "@/router";
const localStorageKeyName = "recordList";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    tagList: [],
    currentTag: undefined,
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string) {
      const tag = state.tagList.filter((t) => t.id === id)[0];
      state.currentTag = tag;
    },
    fetchRecords(state) {
      const recordList = JSON.parse(
        window.localStorage.getItem(localStorageKeyName) || "[]"
      ) as RecordItem[];
      state.recordList = recordList;
    },
    saveRecords(state) {
      window.localStorage.setItem(
        localStorageKeyName,
        JSON.stringify(state.recordList)
      );
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record); // 在lib封装的克隆事件
      record2.createAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit("saveRecords");
    },
    saveTag(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    fetchTag(state) {
      const tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
      if (!state.tagList || state.tagList.length === 0) {
        store.commit("createTag", "服饰");
        store.commit("createTag", "餐饮");
        store.commit("createTag", "住宿");
        store.commit("createTag", "旅游");
        store.commit("createTag", "书籍");
        store.commit("createTag", "美妆");
      }
      state.tagList = tagList;
    },
    //其只能接受一个参数，将其后面的参数改成对象
    updateTag(state, payLoad: { id: string; name: string }) {
      const { id, name } = payLoad;
      const idList = state.tagList.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert("标签名重复了");
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0];
          tag.name = name;
          store.commit("saveTag");
        }
      }
    },
    createTag(state, name: string) {
      // 封装createTag API的组件,Labels调用
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        window.alert("标签名重复");
        return "duplicated";
      }
      const id = createId().toString();
      state.tagList.push({ id, name: name });
      store.commit("saveTag");
      // window.alert("添加成功");
      return "success";
    },
    removeTag(state, id: string) {
      //封装removeTag ApI的组件，EditLabels 调用
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        window.alert("删除成功");
        store.commit("saveTag");
        router.back();
      } else {
        window.alert("删除失败");
      }
    },
  },
});

export default store;
