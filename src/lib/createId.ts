let id: number = parseInt(window.localStorage.getItem("_idMax") || "0") | 0;
function createId() {
  id++;

  //   把id存到localStorage中;
  window.localStorage.setItem("_idMax", id.toString());
  return id;
}

export default createId;
