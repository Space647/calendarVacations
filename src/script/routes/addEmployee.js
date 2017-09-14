import employee from "../components/employeePages";
let worker = new employee();
let addEmployee = {
  name: "addEmployee",
  match: text => text == "addEmployee",
  onBeforeEnter: () => {},
  onEnter: () => {
    Promise.resolve().then(() => worker.workPages());
  },
  onLeave: () => {
    Promise.resolve().then(() => worker.removeEventOnClick());
  }
};

export { addEmployee };
