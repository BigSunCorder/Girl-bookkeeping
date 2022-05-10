const localStorageKeyName = "tagList";
import createId from "@/lib/createId";
const tagStore = {
  // tag store
  tagList: [] as Tag[], //使money和label请求的是同一个数据
  fetchTag() {
    this.tagList = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    );
    return this.tagList;
  },
  createTag(name: string) {
    // 封装createTag API的组件,Labels调用

    const names = this.tagList.map((item) => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert("标签名重复");
      return "duplicated";
    }
    const id = createId().toString();
    this.tagList.push({ id, name: name });
    this.saveTags();
    window.alert("添加成功");
    return "success";
  },
  removeTag(id: string) {
    //封装removeTag ApI的组件，EditLabels 调用
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },
  updateTag(id: string, name: string) {
    const idList = this.tagList.map((item) => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        return "duplicated";
      } else {
        const tag = this.tagList.filter((item) => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return "success";
      }
    } else {
      return "not found";
    }
  },

  saveTags() {
    window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(this.tagList)
    );
  },
};
tagStore.fetchTag();
export default tagStore;
