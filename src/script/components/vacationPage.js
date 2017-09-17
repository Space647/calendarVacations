import render from "./render";
import db from "../utils/db";
import businessLogic from "../utils/businessLogic";
class VacationPage {
  constructor() {
    this.renderPage = new render();
    this.dataBase = new db();
    this.checkBusinessLogic = new businessLogic();
    this.onClickHandlerBinded = this.onClickHandlerBinded.bind(this);
  }
  initPage() {
    Promise.resolve()
      .then(() => this.dataBase.loadInDb())
      .then(ArrObj => this.renderPage.renderVacationPages(ArrObj))
      .then(() => this.onClickHandlerBinded())
      .then(() => this.showNowDate());
  }
  onClickHandlerBinded() {
    Promise.resolve();
    if (document.querySelector(".send") == null) return;
    document.querySelector(".send").addEventListener("click", () => this.addVacation());
  }
  addVacation() {
    let arr;
    Promise.resolve()
      .then(() => this.takeValueFromPage())
      .then(obj => this.searchEmployee(obj))
      .then(arrObj => {
        arr = arrObj;
        return this.checkBusinessLogic.checkData(arrObj);
      })
      .then(status => this.showStatus(status))
      .then(status => this.addEmployee(status, arr))
      .then(arrObj => this.addVacationUpdateDate(arrObj))
      .then(arrObj => this.saveEmployee(arrObj));
  }
  showStatus(status) {
    Promise.resolve();
    let placeRender = document.querySelector(".status");
    if (!status) {
      placeRender.innerHTML = `<span class="alert alert-danger">Check date</span>`;
      return status;
    }
    placeRender.innerHTML = `<span class="alert alert-success">GL in vacation</span>`;
    return status;
  }

  addVacationUpdateDate(arrObj) {
    Promise.resolve();
    if (arrObj == undefined || arrObj == false) return;
    else if (arrObj[1].dateOfZeroing == "") {
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
    Promise.resolve();
    if (arrObj == undefined) return;
    let allEmployee = this.dataBase.loadInDb();
    allEmployee[arrObj[2]] = arrObj[1];
    this.dataBase.saveUpdateInDb(allEmployee);
  }
  addEmployee(state, arrObj) {
    Promise.resolve();
    if (state == false) return undefined;
    let saveObj, obj;
    obj = {
      vacationFrom: arrObj[0].vacationFrom,
      vacationOn: arrObj[0].vacationOn
    };
    arrObj[1].vacation.push(obj);
    return arrObj;
  }

  takeValueFromPage() {
    Promise.resolve();
    let fullName, vacationOn, vacationFrom;
    fullName = document.querySelector(".custom-select");
    fullName = fullName.options[fullName.selectedIndex].value;
    vacationFrom = document.querySelector(".vacationFrom").value;
    vacationOn = document.querySelector(".vacationOn").value;
    if (fullName === "" || vacationFrom === "" || vacationOn === "") return false;
    return {
      fullName: fullName,
      vacationFrom: vacationFrom,
      vacationOn: vacationOn
    };
  }
  searchEmployee(obj) {
    Promise.resolve();
    if (obj == false || obj == undefined) return;
    let employee, arrObj, selectedEmployee;
    arrObj = this.dataBase.loadInDb();
    selectedEmployee = arrObj.map(function(selectedPeople, index) {
      if (selectedPeople.fullName == obj.fullName) return [selectedPeople, index];
    });
    selectedEmployee = selectedEmployee.filter(function(x) {
      return x !== undefined && x !== null;
    });
    return [obj, selectedEmployee[0][0], selectedEmployee[0][1]];
  }
  removeEventOnClick() {
    document
      .querySelector(".send")
      .removeEventListener("click", this.onClickHandlerBinded);
  }
  showNowDate() {
    Promise.resolve();
    let date = new Date();
    document.querySelector(
      ".dateNow"
    ).innerHTML = `date now ${date.getDate()} ${date.getMonth() +
      1} ${date.getFullYear()}`;
  }
}
export default VacationPage;
