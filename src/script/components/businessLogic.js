import db from "./db";
class businessLogic {
  constructor() {
    this.dataBase = new db();
  }
  checkData(arrObj) {
    let array;
    Promise.resolve()
      .then(() => this.checkingTheDateRange(arrObj))
      .then(arr => this.checkForNumberOfDays(arr))
      .then(arr => {
        array = this.checkForTheNumberOfDaysOfVacation(arr);
      })
      .then(() => this.dataBase.loadInDb())
      .then(obj => this.checkForTheNumberOfEmployeesOnVacation(obj, array));
  }
  checkingTheDateRange(arrObj) {
    Promise.resolve();
    if (arrObj == false || arrObj == undefined) return;
    let vacationFrom, vacationOn, days;
    vacationFrom = new Date(`${arrObj[0].vacationFrom}`);
    vacationOn = new Date(`${arrObj[0].vacationOn}`);
    days = vacationOn - vacationFrom;
    days = days / 1000 / 60 / 60 / 24 + 1;
    if (days >= 2 && days <= 15) {
      arrObj.push(days);
      return arrObj;
    }
  }
  checkForNumberOfDays(arrObj) {
    Promise.resolve();
    let lastVacationDate, dateVacationFrom, lastVacation, vacatiFrom, check;
    if (arrObj == false || arrObj == undefined) return;
    if (arrObj[1].daysInTheLastVacation === "") {
      arrObj[1].daysInTheLastVacation = arrObj[3];
      return arrObj;
    } else {
      lastVacation = arrObj[1].vacation[-1].vacationOn;
      lastVacationDate = new Date(`${lastVacation}`);
      dateVacationFrom = new Date(`${arrObj[0].vacationFrom}`);
      lastVacation = lastVacationDate.setDate(
        lastVacationDate.getDate() + Number(arrObj[1].daysInTheLastVacation)
      );
      check = dateVacationFrom >= lastVacation;
      if (check) {
        return arrObj;
      }
      return false;
    }
  }
  checkForTheNumberOfDaysOfVacation(arrObj) {
    Promise.resolve();
    if (arrObj == false || arrObj == undefined) return;
    let days = arrObj[1].numberOfDaysOfVacation - arrObj[1].daysInTheLastVacation;
    if (days < 0) {
      return false;
    }
    arrObj[1].numberOfDaysOfVacation = days;
    return arrObj;
  }
  checkForTheNumberOfEmployeesOnVacation(arrObjAllUsers, arrObj) {
    Promise.resolve();
    if (arrObj == false || arrObj == undefined) return;
    console.log(arrObjAllUsers);
    console.log(arrObj);
    let objSelectpProfession,
      arrayOfObjectsWithYourPeoplePositions,
      countPosition = 0;
    arrayOfObjectsWithYourPeoplePositions = arrObjAllUsers.map(function(user, count) {
      if (user.position == arrObj[1].position) {
        countPosition++;
        return user;
      }
    });
    arrayOfObjectsWithYourPeoplePositions = arrayOfObjectsWithYourPeoplePositions.filter(
      function(x) {
        return x !== undefined && x !== null;
      }
    );
    console.log(countPosition);
    console.log(arrayOfObjectsWithYourPeoplePositions);
  }
}
export default businessLogic;
