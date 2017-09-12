class db {
  saveInDb(obj) {
    Promise.resolve();
    let data = JSON.parse(localStorage.getItem("db")) || [];
    data.push(obj);
    localStorage.setItem("db", JSON.stringify(data));
  }
  loadInDb() {}
}
export default db;
