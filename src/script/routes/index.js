import indexPage from "../components/indexPage";
import render from "../components/render";
let indexP = new indexPage();
let index = {
  name: "index",
  match: "",
  onBeforeEnter: () => {
    document.querySelector(".workPlace").innerHTML = "";
  },
  onEnter: () => {
    indexP.workPages();
  },
  onLeave: () => {
    indexP.removeEventOnClick();
    document.querySelector(".table").innerHTML = "";
  }
};

export { index };
