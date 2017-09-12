import employee from "../components/employeePages";
import render from "../components/render";
let addEmployee = {
  name: "addEmployee",
  match: text => text == "addEmployee",
  onBeforeEnter: () => {},
  onEnter: () => {
    let renderPage = new render();
    renderPage.renderEmployeePages();
  },
  onLeave: () => {}
};

export { addEmployee };
