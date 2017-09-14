import indexPage from "../components/indexPage";
import render from "../components/render";
var index = {
  name: "index",
  match: "",
  onBeforeEnter: () => {},
  onEnter: () => {
    let renderPage = new render();
    let index = new indexPage();
    renderPage.renderingIndexPages();
    index.creteateTable();
  },
  onLeave: () => {}
};

export { index };
