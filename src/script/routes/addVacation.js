import vacation from "../components/vacationPages";
let vac = new vacation();
let addVacation = {
  name: "addVacatin",
  match: text => text == "addVacation",
  onBeforeEnter: () => {},
  onEnter: () => {
    Promise.resolve().then(() => vac.workPages());
  },
  onLeave: () => {
    Promise.resolve().then(() => vac.removeEventOnClick());
  }
};

export { addVacation };
