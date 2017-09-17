import VacationPage from "../components/vacationPage";
let vac = new VacationPage();
let addVacation = {
  name: "addVacatin",
  match: text => text == "addVacation",
  onBeforeEnter: () => {},
  onEnter: () => {
    Promise.resolve().then(() => vac.initPage());
  },
  onLeave: () => {
    Promise.resolve().then(() => vac.removeEventOnClick());
  }
};

export { addVacation };
