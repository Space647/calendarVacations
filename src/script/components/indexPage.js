import db from "../utils/db";
import render from "./render";
class IndexPage {
  constructor() {
    this.database = new db();
    this.loadDB = this.database.loadInDb();
    this.renderPages = new render();
    this.onClickHandlerBinded = this.onClickHandlerBinded.bind(this);
    this.updateDataOnTable = this.updateDataOnTable.bind(this);
    this.removeVacationBinded = this.removeVacationBinded.bind(this);
  }
  onClickHandlerBinded() {
    Promise.resolve();
    document
      .querySelector(".fullName")
      .addEventListener("click", () => this.sortFullName());
    document
      .querySelector(".sortPreviousVacationFrom")
      .addEventListener("click", () => this.sortVacationFrom(3));
    document
      .querySelector(".sortCurrentVacationFrom")
      .addEventListener("click", () => this.sortVacationFrom(2));
    document
      .querySelector(".sortUpcomimgVacationFrom")
      .addEventListener("click", () => this.sortVacationFrom(1));
  }
  removeEventOnClick() {
    document
      .querySelector(".fullName")
      .removeEventListener("click", this.onClickHandlerBinded);
    document
      .querySelector("table")
      .removeEventListener("click", this.removeVacationBinded);
    // document
    //   .querySelector(".sortPreviousVacationFrom")
    //   .addEventListener("click", () => this.sortVacationFrom(-3));
    // document
    //   .querySelector(".sortCurrentVacationFrom")
    //   .addEventListener("click", () => this.sortVacationFrom(-2));
    // document
    //   .querySelector(".sortUpcommingVacationFrom")
    //   .addEventListener("click", () => this.sortVacationFrom(-1));
  }
  initPage() {
    Promise.resolve()
      .then(() => this.renderPages.renderingIndexPages())
      .then(() => this.creteateTable())
      .then(() => this.onClickHandlerBinded())
      .then(() => this.refreshVacationDates())
      .then(() => this.updateDataOnTable())
      .then(() => this.removeVacationBinded());
  }
  creteateTable(arrObj = this.database.loadInDb()) {
    let table;
    let cont = this;
    table = `<table class="table table-hover">
    <thead>
    <tr>
      <th class="fullName">FullName</th>
      <th>Position</th>
      <th class="sortPreviousVacationFrom table-active">Previous vacation from</th>
      <th class="table-active">Previous vacation on</th>
      <th class="sortCurrentVacationFrom table-success">Current vacation from</th>
      <th class="table-success">Current vacation on</th>
      <th class="sortUpcomimgVacationFrom table-info">upcoming vacation from</th>
      <th class="table-info">upcoming vacation on</th>
    </tr>
     </thead>`;
    if (this.database.loadInDb() == null) {
      table += "</table>";
      this.renderPages.renderTable(table);
    } else {
      let objList;

      objList = arrObj
        .map(function(employee) {
          let table = `<tr>
          <th>${employee.fullName}</th>
          <th>${employee.position}</th>`;
          if (employee.vacation.length == 1) {
            table += cont.createRow(employee, 0);
          } else if (employee.vacation.length == 2) {
            table += cont.createRow(employee, 0);
          } else if (employee.vacation.length >= 3) {
            table += cont.createRow(employee, employee.vacation.length - 3);
          } else {
            table += cont.createRow(false, false);
          }
          return table;
        })
        .join(" ");
      table += objList + "</table>";
      this.renderPages.renderTable(table);
    }
  }

  createRow(obj, startNumber) {
    let now = new Date();
    let past = `<th class="table-active"></th><th class="table-active"></th>`;
    let current = `<th class="table-success"></th><th class="table-success"></th>`;
    let future = `<th class="table-info"></th><th class="table-info"></th>`;
    if (!obj && !startNumber) {
      return past + current + future;
    }
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
          .vacationOn} <a href="#${obj.fullName}"><button type="button" class="btn btn-light ${obj.fullName}">edit</button></a> <button type="button" class="btn btn-light remove ${obj.fullName}">Del</button></th>`;
      }
    }
    return past + current + future;
  }
  sortFullName() {
    let arrObj = this.database.loadInDb();
    arrObj.sort(function(a, b) {
      if (a.fullName > b.fullName) {
        return 1;
      }
      if (a.fullName < b.fullName) {
        return -1;
      }
      return 0;
    });
    return Promise.resolve()
      .then(() => this.creteateTable(arrObj))
      .then(() => this.removeEventOnClick())
      .then(() => this.onClickHandlerBinded());
  }
  sortVacationFrom(i) {
    let arrObj = this.database.loadInDb();
    let j;
    if (!arrObj[0].vacation.length) {
      for (let k = 1; k < arrObj.length; k++) {
        if (arrObj[k].vacation.length != undefined) {
          j = k;
          break;
        }
      }
    }
    arrObj.sort(function(a, b) {
      try {
        let lng = arrObj[j].vacation.length;
        let dateA = new Date(a.vacation[lng - 1].vacationFrom);
        let dateB = new Date(b.vacation[lng - 1].vacationFrom);
        if (dateA > dateB) {
          return 1;
        }
        if (dateA < dateB) {
          return -1;
        }
        return 0;
      } catch (e) {
        return -1;
      }
    });
    return Promise.resolve()
      .then(() => this.creteateTable(arrObj))
      .then(() => this.removeEventOnClick())
      .then(() => this.onClickHandlerBinded())
      .then(() => this.removeVacationBinded());
  }
  refreshVacationDates() {
    let now = new Date();
    let users = this.database.loadInDb();
    if (users == undefined) return;
    let cont = this;
    let arrUsers = users.map(function(user, index) {
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
    setInterval(function() {
      return Promise.resolve()
        .then(() => cont.removeEventOnClick())
        .then(() => cont.creteateTable())
        .then(() => cont.onClickHandlerBinded())
        .then(() => cont.removeVacationBinded());
    }, diff);
  }
  removeVacationBinded() {
    document.querySelector("table").addEventListener("click", e => {
      let target = e.target;
      let user = [];
      if (target.classList.contains("remove")) {
        let nameUser = e.target.classList;
        let users = this.database.loadInDb();
        users.map(function(people, index) {
          let fullName = `${nameUser[3]} ${nameUser[4]}`;
          if (people.fullName == fullName) {
            user.push(people, index);
          }
        });
        Promise.resolve(this.removeVacation(user, users));
      }
    });
  }
  removeVacation(user, users) {
    let lng = user[0].vacation.length;
    user[0].numberOfDaysOfVacation += user[0].daysInTheLastVacation;
    if (lng == 1) {
      let dateVacationFrom = new Date(user[0].vacation[lng - 1].vacationFrom);
      let dateVacationOn = new Date(user[0].vacation[lng - 1].vacationOn);
      user[0].dateOfZeroing = "";
      user[0].daysInTheLastVacation = "";
      user[0].numberOfDaysOfVacation = 24;
    } else {
      let dateVacationFrom = new Date(user[0].vacation[lng - 2].vacationFrom);
      let dateVacationOn = new Date(user[0].vacation[lng - 2].vacationOn);
      let daysInVacation = dateVacationOn - dateVacationFrom;
      daysInVacation = daysInVacation / 1000 / 60 / 60 / 24 + 1;
      user[0].daysInTheLastVacation = daysInVacation;
    }
    user[0].vacation.splice(-1, 1);
    return Promise.resolve()
      .then(() => this.database.saveUpdateInDb(users))
      .then(() => this.removeEventOnClick())
      .then(() => this.creteateTable())
      .then(() => this.onClickHandlerBinded())
      .then(() => this.removeVacationBinded());
  }
}
export default IndexPage;
