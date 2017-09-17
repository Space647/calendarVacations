import EditPage from "../components/editPage";
let editP = new EditPage();
let edit = {
  name: "edit",
  match: text => text == text,
  onBeforeEnter: () => {},
  onEnter: () => {
    Promise.resolve().then(() => editP.initPage());
  },
  onLeave: () => {
    //Promise.resolve().then(() => vac.removeEventOnClick());
  }
};

export { edit };
