import IndexPage from "../components/indexPage";
import render from "../components/render";
let indexP = new IndexPage();
let index = {
  name: "index",
  match: "",
  onBeforeEnter: () => {
    document.querySelector(".workPlace").innerHTML = "";
  },
  onEnter: () => {
    indexP.initPage();
  },
  onLeave: () => {
    indexP.removeEventOnClick();
    clearTimeout(indexP.updateDataOnTable);
    document.querySelector(".table").innerHTML = "";
  }
};

export { index };
