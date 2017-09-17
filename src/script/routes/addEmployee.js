import EmployeePage from "../components/employeePage";
let worker = new EmployeePage();
let addEmployee = {
  name: "addEmployee",
  match: text => text == "addEmployee",
  onBeforeEnter: () => {},
  onEnter: () => {
    Promise.resolve().then(() => worker.initPage());
  },
  onLeave: () => {
    Promise.resolve().then(() => worker.removeEventOnClick());
  }
};

export { addEmployee };
