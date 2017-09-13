import render from "./render";
import db from "./db";
class vacation {
  constructor() {
    this.renderPage = new render();
    this.dataBase = new db();
  }
  workPages() {
    Promise.resolve()
      .then(() => this.dataBase.loadInDb())
      .then(ArrObj => this.renderPage.renderVacationPages(ArrObj));
  }
}
export default vacation;
