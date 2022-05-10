type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number; // 数据类型 object | string
  createAt?: string; // 类 / 构造器
};
type RootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
  createRecordError: Error | null;
};
type Tag = {
  id: string;
  name: string;
};
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => "success" | "duplicated";
  update: (id: string, name: string) => "success" | "not found" | "duplicated";
  remove: (id: string) => boolean;
  save: () => void;
};

//store中的数据会推测类型，故不用写
interface Window {}
