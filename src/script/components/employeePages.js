import db from "./db";
class employeePages {
  constructor() {
    this.dataBase = new db();
  }
  addHandlers() {
    Promise.resolve();
    document.querySelector(".send").addEventListener("click", () => this.addEmployee());
  }
  addEmployee() {
    Promise.resolve()
      .then(() => this.createStructure())
      .then(obj => this.takeFullNameAndPosition(obj))
      .then(obj => this.dataBase.saveInDb(obj));
  }
  createStructure() {
    Promise.resolve();
    return {
      fullName: "",
      position: "",
      previousVacationFrom: "",
      previousVacationOn: "",
      currentVacationFrom: "",
      currentVacationOn: "",
      upcomingVacationFrom: "",
      upcomingVacationOn: "",
      daysOnVacation: "",
      daysInTheFirstVacation: "",
      updateDate: ""
    };
  }
  takeFullNameAndPosition(obj) {
    Promise.resolve();
    obj.fullName = document.querySelector(".fullName").value;
    obj.position = document.querySelector(".position").value;
    console.log(obj);
    return obj;
  }
  showNowDate() {
    document.querySelector(".nowDate");
  }
}
export default employeePages;
