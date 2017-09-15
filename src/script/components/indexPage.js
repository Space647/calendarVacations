import db from "./db";
import render from "./render";
class indexPage {
  constructor() {
    this.database = new db();
    this.loadDB = this.database.loadInDb();
    this.renderPages = new render();
    this.onClickHandlerBinded = this.onClickHandlerBinded.bind(this);
    this.updateDataOnTable = this.updateDataOnTable.bind(this);
  }
  onClickHandlerBinded() {
    Promise.resolve();
    document
      .querySelector(".fullName")
      .addEventListener("click", () => this.sortFullName());
    let sortVacation = document.querySelectorAll(".sortVacationFrom");
    for (let i = 0; i < sortVacation.length; i++) {
      sortVacation[i].addEventListener("click", () => this.sortVacationFrom());
    }
  }
  removeEventOnClick() {
    document
      .querySelector(".fullName")
      .removeEventListener("click", this.onClickHandlerBinded);
    let sortVacation = document.querySelectorAll(".sortVacationFrom");
    for (let i = 0; i < sortVacation.length; i++) {
      sortVacation[i].removeEventListener("click", this.onClickHandlerBinded);
    }
  }
  workPages() {
    Promise.resolve()
      .then(() => this.renderPages.renderingIndexPages())
      .then(() => this.creteateTable())
      .then(() => this.onClickHandlerBinded())
      .then(() => this.refreshingDateVacations())
      .then(() => this.updateDataOnTable());
  }
  creteateTable(arrObj = this.database.loadInDb()) {
    let table;
    let cont = this;
    table = `<table class="table table-hover">
    <thead>
    <tr>
      <th class="fullName">FullName</th>
      <th>Position</th>
      <th class="sortVacationFrom table-active">Previous vacation from</th>
      <th class="table-active">Previous vacation on</th>
      <th class="sortVacationFrom table-success">Current vacation from</th>
      <th class="table-success">Current vacation on</th>
      <th class="sortVacationFrom table-info">upcoming vacation from</th>
      <th class="table-info">upcoming vacation on</th>
    </tr>
     </thead>`;
    if (this.database.loadInDb() == null) {
      table += "</table>";
      this.renderPages.renderTable(table);
    } else {
      let objList;

      objList = arrObj
        .map(function (employee) {
          let table = `<tr>
          <th>${employee.fullName}</th>
          <th>${employee.position}</th>`;
          if (employee.vacation.length == 1) {
            table += cont.createRow(employee, 0);
          } else if (employee.vacation.length == 2) {
            table += cont.createRow(employee, 0);
          } else if (employee.vacation.length >= 3) {
            table += cont.createRow(employee, employee.vacation.length - 3);
          }
          return table;
        })
        .join(" ");
      table += objList + "</table>";
      this.renderPages.renderTable(table);
    }
  }
  createRowIfCountOne(obj, index) {
    let now = new Date();
    let dateEmployeeFrom = new Date(obj.vacation[index].vacationFrom);
    let dateEmployeeOn = new Date(obj.vacation[index].vacationOn);
    if (dateEmployeeFrom <= now && now <= dateEmployeeOn) {
      return `<th></th><th></th><th>${obj.vacation[index].vacationFrom}</th><th>${obj
        .vacation[index]
        .vacationOn}</th><th class="${obj.fullName}"></th><th class="${obj.fullName}"></th></tr>`;
    } else if (now > dateEmployeeOn) {
      return `<th>${obj.vacation[index].vacationFrom}</th><th>${obj.vacation[index]
        .vacationOn}</th><th></th><th></th><th class="${obj.fullName}"></th><th class="${obj.fullName}"></th></tr>`;
    } else if (dateEmployeeFrom >= now) {
      return `<th></th><th></th><th></th><th></th><th class="${obj.fullName}">${obj
        .vacation[index].vacationFrom}</th><th class="${obj.fullName}">${obj.vacation[
        index
      ].vacationOn}</th>`;
    }
  }
  createRow(obj, startNumber) {
    let now = new Date();
    let past = `<th class="table-active"></th><th class="table-active"></th>`;
    let current = `<th class="table-success"></th><th class="table-success"></th>`;
    let future = `<th class="${obj.fullName} table-info"></th><th class="${obj.fullName} table-info"></th>`;
    for (let i = startNumber; i < obj.vacation.length; i++) {
      let dateEmployeeFrom = new Date(obj.vacation[i].vacationFrom);
      let dateEmployeeOn = new Date(obj.vacation[i].vacationOn);
      if (dateEmployeeFrom <= now && now <= dateEmployeeOn) {
        current = `<th class="table-success">${obj.vacation[i]
          .vacationFrom}</th><th class="table-success">${obj.vacation[i]
          .vacationOn}</th>`;
      } else if (now > dateEmployeeOn) {
        past = `<th class="table-active">${obj.vacation[i]
          .vacationFrom}</th><th class="table-active">${obj.vacation[i].vacationOn}</th>`;
      } else if (dateEmployeeFrom >= now) {
        future = `<th class="${obj.fullName} table-info">${obj.vacation[i]
          .vacationFrom}</th><th class="${obj.fullName} table-info">${obj.vacation[i]
          .vacationOn} <a href="#edit"><button type="button" class="btn btn-light">edit</button></a> <button type="button" class="btn btn-light">Del</button></th>`;
      }
    }
    return past + current + future;
  }
  sortFullName() {
    let arrObj = this.database.loadInDb();
    arrObj.sort(function (a, b) {
      if (a.fullName > b.fullName) {
        return 1;
      }
      if (a.fullName < b.fullName) {
        return -1;
      }
      return 0;
    });
    Promise.resolve()
      .then(() => this.creteateTable(arrObj))
      .then(() => this.removeEventOnClick())
      .then(() => this.onClickHandlerBinded());
  }
  sortVacationFrom() {
    console.log(1);
    let arrObj = this.database.loadInDb();
    arrObj.sort(function (a, b) {
      if (a.vacation[0].vacationFrom > b.vacation[0].vacationFrom) {
        return 1;
      }
      if (a.vacation[0].vacationFrom < b.vacation[0].vacationFrom) {
        return -1;
      }
      return 0;
    });
    Promise.resolve()
      .then(() => this.creteateTable(arrObj))
      .then(() => this.removeEventOnClick())
      .then(() => this.onClickHandlerBinded());
  }
  refreshingDateVacations() {
    Promise.resolve();
    let now = new Date();
    let users = this.database.loadInDb();
    let cont = this;
    let arrUsers = users.map(function (user, index) {
      if (user.dateOfZeroing == "") return;
      let date = new Date(user.dateOfZeroing);
      if (now >= date) {
        user.dateOfZeroing = "";
        user.numberOfDaysOfVacation = 24;
        users[index] = user;
      }
    });
    this.database.saveUpdateInDb(users);
  }
  updateDataOnTable() {
    let cont = this;
    let now = new Date();
    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    let diff = tomorrow - now;
    setInterval(function () {
      Promise.resolve()
        .then(() => cont.removeEventOnClick())
        .then(() => cont.creteateTable())
        .then(() => cont.onClickHandlerBinded());
    }, diff);
  }
}
export default indexPage;