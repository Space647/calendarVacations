import editPages from "../components/editPages";
let editP = new editPages();
let edit = {
  name: "edit",
  match: text => text == "edit",
  onBeforeEnter: () => {},
  onEnter: () => {
    Promise.resolve().then(() => editP.workPages());
  },
  onLeave: () => {
    // Promise.resolve().then(() => vac.removeEventOnClick());
  }
};

export { edit };
