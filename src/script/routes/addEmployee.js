import employee from "../components/employeePages";
import render from "../components/render";
let addEmployee = {
  name: "addEmployee",
  match: text => text == "addEmployee",
  onBeforeEnter: () => {},
  onEnter: () => {
    let renderPage = new render();
    let worker = new employee();
    Promise.resolve()
      .then(() => renderPage.renderEmployeePages())
      .then(() => worker.addHandlers());
  },
  onLeave: () => {}
};

export { addEmployee };
