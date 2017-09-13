class db {
  saveInDb(obj) {
    Promise.resolve();
    if (obj.fullName === "" || obj.position === "") return;
    let data = JSON.parse(localStorage.getItem("db")) || [];
    data.push(obj);
    localStorage.setItem("db", JSON.stringify(data));
  }
  loadInDb() {
    Promise.resolve();
    return JSON.parse(localStorage.getItem("db"));
  }
}
export default db;