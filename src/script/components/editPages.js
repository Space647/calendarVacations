import render from "./render";
import db from "./db";
class editPages {
  constructor() {
    this.database = new db();
    this.renderPages = new render();
    this.onClickHandlerBinded = this.onClickHandlerBinded.bind(this);
  }
  workPages() {
    Promise.resolve()
      .then(() => this.renderPages.renderingEditPages())
      .then(() => onClickHandlerBinded());
  }
  onClickHandlerBinded() {
    document.querySelector(".send").addEventListener("click", () => {});
  }
}
export default editPages;
