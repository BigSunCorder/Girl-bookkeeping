import clone from "@/lib/clone";
const localStorageKeyName = "recordList";
const recordStore = {
  //record store
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(
      window.localStorage.getItem(localStorageKeyName) || "[]"
    ) as RecordItem[];
    return this.recordList;
  },
  saveRecords() {
    window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(this.recordList)
    );
  },
  createRecord(record: RecordItem) {
    const record2: RecordItem = clone(record); // 在lib封装的克隆事件
    record2.createAt = new Date().toISOString();
    this.recordList && this.recordList.push(record2); //data存在才能往里面push
    recordStore.saveRecords();
    window.alert("已保存");
  },
};
recordStore.fetchRecords();
export default recordStore;
