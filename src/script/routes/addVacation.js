import vacation from "../components/vacationPages";
let addVacation = {
  name: "addVacatin",
  match: text => text == "addVacation",
  onBeforeEnter: () => {},
  onEnter: () => {
    let vac = new vacation();
    Promise.resolve().then(() => vac.workPages());
  },
  onLeave: () => {}
};

export { addVacation };
