import db from "./db";
import render from "./render";
class employeePages {
  constructor() {
    this.dataBase = new db();
    this.renderPage = new render();
    this.onClickHandlerBinded = this.onClickHandlerBinded.bind(this);
  }
  workPages() {
    Promise.resolve()
      .then(() => this.renderPage.renderEmployeePages())
      .then(() => this.onClickHandlerBinded())
      .then(() => this.showNowDate());
  }
  onClickHandlerBinded() {
    Promise.resolve();
    document.querySelector(".send").addEventListener("click", () => this.addEmployee());
  }
  addEmployee() {
    Promise.resolve()
      .then(() => this.createStructure())
      .then(obj => this.takeFullNameAndPosition(obj))
      .then(obj => this.dataBase.saveInDb(obj))
      .then(() => this.clearTextBox());
  }
  createStructure() {
    Promise.resolve();
    return {
      fullName: "",
      position: "",
      numberOfDaysOfVacation: 24,
      daysInTheLastVacation: "",
      vacation: [],
      dateOfZeroing: ""
    };
  }
  takeFullNameAndPosition(obj) {
    Promise.resolve();
    obj.fullName = document.querySelector(".fullName").value;
    obj.position = document.querySelector(".position").value;
    if (obj.fullName === "" || obj.position === "") return;
    return obj;
  }
  clearTextBox() {
    Promise.resolve();
    document.querySelector(".fullName").value = "";
    document.querySelector(".position").value = "";
  }
  showNowDate() {
    let date = new Date();
    document.querySelector(
      ".dateNow"
    ).innerHTML = `date now ${date.getDate()} ${date.getMonth()} ${date.getFullYear()}`;
  }
  removeEventOnClick() {
    document
      .querySelector(".send")
      .removeEventListener("click", this.onClickHandlerBinded);
  }
}
export default employeePages;
