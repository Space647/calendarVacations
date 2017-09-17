import render from "./render";
import db from "../utils/db";
import businessLogic from "../utils/businessLogic";
class EditPage {
  constructor() {
    this.dataBase = new db();
    this.renderPages = new render();
    this.checkBusinessLogic = new businessLogic();
    this.onClickHandlerBinded = this.onClickHandlerBinded.bind(this);
  }
  initPage() {
    let users, value;
    Promise.resolve()
      .then(() => this.renderPages.renderingEditPages())
      .then(() => this.onClickHandlerBinded())
      .then(() => this.takeFullNameFromUrl())
      .then(fullName => this.renderFullName(fullName));
  }
  renderFullName(fullName) {
    document.querySelector(".name").innerHTML = fullName;
    return fullName;
  }
  takeValueFromPage() {
    Promise.resolve();
    let fullName, vacationOn, vacationFrom;
    fullName = document.querySelector(".name").innerText;
    vacationFrom = document.querySelector(".vacationFrom").value;
    vacationOn = document.querySelector(".vacationOn").value;
    if (fullName === "" || vacationFrom === "" || vacationOn === "") return false;
    return {
      fullName: fullName,
      vacationFrom: vacationFrom,
      vacationOn: vacationOn
    };
  }
  takeFullNameFromUrl() {
    let fullName = window.location.hash;
    fullName = fullName.split("");
    fullName.splice(0, 1);
    return Promise.resolve((fullName = fullName.join("")));
  }
  onClickHandlerBinded() {
    document.querySelector(".send").addEventListener("click", () => this.editDate());
  }
  editDate() {
    let objValue, users;
    return Promise.resolve()
      .then(() => {
        objValue = this.takeValueFromPage();
      })
      .then(() => {
        users = this.dataBase.loadInDb();
      })
      .then(() => this.takeFullNameFromUrl())
      .then(fullName => this.editVacation(fullName, users, objValue));
  }
  editVacation(fullName, users, objValue) {
    let index;
    users.filter((user, i) => {
      if (user.fullName == fullName) {
        index = i;
        return user;
      }
    });
    let arr = this.removeVacation(users, index);
    let arrObj = [];
    arrObj.push(objValue, users[index], index);
    let placeRender = document.querySelector(".status");
    this.checkBusinessLogic.checkData(arrObj).then(status => {
      console.log(status);
      if (status) {
        arrObj = this.addEmployee(arrObj);
        arrObj = this.addVacationUpdateDate(arrObj);
        arrObj = this.updateNumberOfVacationDays(arrObj);
        this.saveEmployee(arrObj);
        return (placeRender.innerHTML = `<span class="alert alert-success">GL in vacation</span>`);
      }
      placeRender.innerHTML = `<span class="alert alert-danger">Check date</span>`;
    });
  }
  updateNumberOfVacationDays(arrObj) {
    let lng = arrObj[1].vacation.length;
    let dateFrom, dateOn;
    dateFrom = new Date(arrObj[1].vacation[lng - 1].vacationFrom);
    dateOn = new Date(arrObj[1].vacation[lng - 1].vacationOn);
    let days = dateOn - dateFrom;
    days = days / 1000 / 60 / 60 / 24 + 1;
    arrObj[1].numberOfDaysOfVacation -= days;
    return arrObj;
  }
  addEmployee(arrObj) {
    let saveObj, obj;
    obj = {
      vacationFrom: arrObj[0].vacationFrom,
      vacationOn: arrObj[0].vacationOn
    };
    arrObj[1].vacation.push(obj);
    return arrObj;
  }
  addVacationUpdateDate(arrObj) {
    Promise.resolve();
    if (arrObj == undefined || arrObj == false) {
      return;
    } else if (arrObj[1].dateOfZeroing == "") {
      let date = new Date(arrObj[1].vacation[0].vacationFrom);
      let year = date.getFullYear() + 1;
      let month = date.getMonth() + 1;
      let day = date.getDate();
      arrObj[1].dateOfZeroing = `${year}-${month}-${day}`;
      return arrObj;
    }
    return arrObj;
  }
  saveEmployee(arrObj) {
    if (arrObj == undefined) return;
    let allEmployee = this.dataBase.loadInDb();
    allEmployee[arrObj[2]] = arrObj[1];
    this.dataBase.saveUpdateInDb(allEmployee);
  }
  removeVacation(users, index) {
    let lng = users[index].vacation.length;
    users[index].numberOfDaysOfVacation += users[index].daysInTheLastVacation;
    if (lng == 1) {
      let dateVacationFrom = new Date(users[index].vacation[lng - 1].vacationFrom);
      let dateVacationOn = new Date(users[index].vacation[lng - 1].vacationOn);
      users[index].dateOfZeroing = "";
      users[index].daysInTheLastVacation = "";
      users[index].numberOfDaysOfVacation = 24;
    } else {
      let dateVacationFrom = new Date(users[index].vacation[lng - 2].vacationFrom);
      let dateVacationOn = new Date(users[index].vacation[lng - 2].vacationOn);
      let daysInVacation = dateVacationOn - dateVacationFrom;
      daysInVacation = daysInVacation / 1000 / 60 / 60 / 24 + 1;
      users[index].daysInTheLastVacation = daysInVacation;
    }
    users[index].vacation.splice(-1, 1);
    return users;
  }
}
export default EditPage;
