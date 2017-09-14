import db from "./db";
import render from "./render";
class indexPage {
  constructor() {
    this.database = new db();
    this.loadDB = this.database.loadInDb();
    this.renderPages = new render();
  }
  workPages() {
    Promise.resolve()
      .then(() => this.renderPages)
      .then();
  }
  creteateTable() {
    let table;
    table = `<table class="table table-hover">
    <thead>
    <tr>
      <th>FullName</th>
      <th>Position</th>
      <th>Previous vacation from</th>
      <th>Previous vacation on</th>
      <th>Current vacation from</th>
      <th>Current vacation on</th>
      <th>upcoming vacation from</th>
      <th>upcoming vacation on</th>
    </tr>
     </thead>`;
    if (this.database.loadInDb() == null) {
      table += "</table>";
      this.renderPages.renderTable(table);
    } else {
      let objList, arrObj;
      arrObj = this.database.loadInDb();
      objList = arrObj
        .map(function(employee) {
          return `<tr>
          <th>${employee.fullName}</th>
          <th>${employee.position}</th>
          <th>${employee.previousVacationFrom}</th>
          <th>${employee.previousVacationOn}</th>
          <th>${employee.currentVacationFrom}</th>
          <th>${employee.currentVacationOn}</th>
          <th class="${employee.fullName}">${employee.upcomingVacationFrom}</th>
          <th class="${employee.fullName}">${employee.upcomingVacationFrom}</th>
          </tr>`;
        })
        .join(" ");
      table += objList + "</table>";
      this.renderPages.renderTable(table);
    }
  }
  sortFullName() {
    arrObj = this.database.loadInDb();
    arrObj.sort(function(a, b) {
      if (a.fullName > b.fullName) {
        return 1;
      }
      if (a.fullName < b.fullName) {
        return -1;
      }
      return 0;
    });
  }
}
export default indexPage;
