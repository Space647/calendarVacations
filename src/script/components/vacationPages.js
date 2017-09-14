import render from "./render";
import db from "./db";
import businessLogic from "./businessLogic";
class vacation {
  constructor() {
    this.renderPage = new render();
    this.dataBase = new db();
    this.checkBusinessLogic = new businessLogic();
    this.onClickHandlerBinded = this.onClickHandlerBinded.bind(this);
  }
  workPages() {
    Promise.resolve()
      .then(() => this.dataBase.loadInDb())
      .then(ArrObj => this.renderPage.renderVacationPages(ArrObj))
      .then(() => this.onClickHandlerBinded());
  }
  onClickHandlerBinded() {
    document.querySelector(".send").addEventListener("click", () => this.addVacation());
  }
  addVacation() {
    Promise.resolve()
      .then(() => this.takeValueFromPage())
      .then(obj => this.searchEmployee(obj))
      .then(arrObj => this.checkBusinessLogic.checkData(arrObj));
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
    if (obj == false) return;
    let employee, arrObj, selectEmployee;
    arrObj = this.dataBase.loadInDb();
    selectEmployee = arrObj.map(function(selectPeople, index) {
      if (selectPeople.fullName == obj.fullName) return [selectPeople, index];
    });
    selectEmployee = selectEmployee.filter(function(x) {
      return x !== undefined && x !== null;
    });
    return [obj, selectEmployee[0][0], selectEmployee[0][1]];
  }
  removeEventOnClick() {
    document
      .querySelector(".send")
      .removeEventListener("click", this.onClickHandlerBinded);
  }
}
export default vacation;
