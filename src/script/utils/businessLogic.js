import db from "./db";
class businessLogic {
  constructor() {
    this.dataBase = new db();
  }
  checkData(arrObj) {
    let array;
    return Promise.resolve()
      .then(() => this.checkFor(arrObj))
      .then(arr => this.checkForMoreThanOneFutureVacation(arr))
      .then(arr => this.checkingTheDateRange(arr))
      .then(arr => this.checkForNumberOfDays(arr))
      .then(arr => {
        array = this.checkForTheNumberOfDaysOfVacation(arr);
      })
      .then(() => this.dataBase.loadInDb())
      .then(obj => this.checkForTheNumberOfEmployeesOnVacation(obj, array));
  }
  checkFor(arrObj) {
    Promise.resolve();
    let dataNextVacation = new Date(arrObj[0].vacationFrom);
    let now = new Date();
    if (dataNextVacation < now) {
      return false;
    }
    return arrObj;
  }
  checkForMoreThanOneFutureVacation(arrObj) {
    Promise.resolve();
    if (arrObj == false || arrObj == undefined) return false;
    let dataNextVacation;
    let lng = arrObj[1].vacation.length;
    if (lng == 0) {
      return arrObj;
    } else if (lng == 1) {
      dataNextVacation = new Date(arrObj[1].vacation[0].vacationFrom);
    } else {
      dataNextVacation = new Date(arrObj[1].vacation[lng - 2].vacationFrom);
    }
    let now = new Date();
    if (dataNextVacation > now) {
      return false;
    }
    return arrObj;
  }
  checkingTheDateRange(arrObj) {
    Promise.resolve();
    if (arrObj == false || arrObj == undefined) return false;
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
    if (arrObj == false || arrObj == undefined) return false;
    let lastVacationDate, dateVacationFrom, lastVacation, vacatiFrom, check;
    if (arrObj[1].daysInTheLastVacation === "") {
      arrObj[1].daysInTheLastVacation = arrObj[3];
      return arrObj;
    } else {
      let lng = arrObj[1].vacation.length;
      lastVacation = arrObj[1].vacation[lng - 1].vacationOn;
      lastVacationDate = new Date(lastVacation);
      dateVacationFrom = new Date(arrObj[0].vacationFrom);

      lastVacation = lastVacationDate.setDate(
        lastVacationDate.getDate() + arrObj[1].daysInTheLastVacation
      );
      arrObj[1].daysInTheLastVacation = arrObj[3];
      check = dateVacationFrom >= lastVacation;
      if (check) {
        return arrObj;
      }
      return false;
    }
  }
  checkForTheNumberOfDaysOfVacation(arrObj) {
    Promise.resolve();
    if (arrObj == false || arrObj == undefined) return false;
    let days = arrObj[1].numberOfDaysOfVacation - arrObj[1].daysInTheLastVacation;
    if (days < 0) {
      return false;
    }
    arrObj[1].numberOfDaysOfVacation = days;
    return arrObj;
  }
  checkForTheNumberOfEmployeesOnVacation(arrObjAllUsers, arrObj) {
    Promise.resolve();
    if (arrObj == false || arrObj == undefined) return false;
    let objSelectpProfession,
      arrayOfPositions,
      countPosition = 0;
    arrayOfPositions = arrObjAllUsers.map(function(user, count) {
      if (user.position == arrObj[1].position) {
        return user;
      }
    });
    arrayOfPositions = arrayOfPositions.filter(function(x) {
      return x !== undefined && x !== null;
    });
    let firstVacationPosition = this.checkFirstVacationFromPosition(arrayOfPositions);
    if (firstVacationPosition) {
      return true;
    } else {
      return this.checkVacationAvailability(arrayOfPositions, arrObj);
    }
  }
  checkVacationAvailability(arrayOfPositions, arrObj) {
    let count = 0;
    let arr = arrayOfPositions.map(function(employee) {
      if (employee.fullName == arrObj[0].fullName) {
        count++;
      } else if (employee.vacation.length == 0) {
      } else {
        for (let i = 0; i < employee.vacation.length; i++) {
          let selectDateFrom = new Date(arrObj[0].vacationFrom);
          let selectDateOn = new Date(arrObj[0].vacationOn);
          let dateEmployeeFrom = new Date(employee.vacation[i].vacationFrom);
          let dateEmployeeOn = new Date(employee.vacation[i].vacationOn);
          if (
            (dateEmployeeFrom <= selectDateFrom && selectDateFrom <= dateEmployeeOn) ||
            (dateEmployeeFrom <= selectDateOn && selectDateOn <= dateEmployeeOn)
          ) {
            count++;
          }
        }
      }
    });
    let percent = count * 100 / arrayOfPositions.length;
    if (percent > 50) {
      return false;
    }
    return true;
  }
  checkFirstVacationFromPosition(arrObj) {
    let answer, arr;
    let allVacationCount = arrObj.length;
    arr = arrObj.map(function(employee) {
      if (employee.vacation.length == 0) return employee;
    });
    arr = arr.filter(function(x) {
      return x !== undefined && x !== null;
    });
    if (allVacationCount === arr.length) return true;
    return false;
  }
}
export default businessLogic;
