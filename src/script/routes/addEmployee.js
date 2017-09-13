import employee from "../components/employeePages";
let addEmployee = {
  name: "addEmployee",
  match: text => text == "addEmployee",
  onBeforeEnter: () => {},
  onEnter: () => {
    let worker = new employee();
    Promise.resolve().then(() => worker.workPages());
  },
  onLeave: () => {}
};

export { addEmployee };
