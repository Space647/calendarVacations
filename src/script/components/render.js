class render {
  renderingIndexPages() {
    Promise.resolve();
    document.querySelector("header").innerHTML = `
    <div class="container">
    <div class="row">
      <div class="col text-center dateNow">
        <span>текущая дата 09 09 2017</span>
      </div>
      <div class="col text-right">
      <a href="#addEmployee"><button type="button" class="btn btn-outline-success">add employee</button></a>
      </div>
      <div class="col text-right">
      <a href="#add><button type="button" class="btn btn-outline-success">add vacation</button></a>
      </div>
    </div>
  </div>`;
  }
  renderEmployeePages() {
    Promise.resolve();
    document.querySelector("header").innerHTML = `
    <div class="container">
    <div class="row">
      <div class="col-md-10 text-center ">
        <span class="dateNow">текущая дата 09 09 2017</span>
      </div>
      <div class="col-md-2">
      <div class="btn-group" role="group" aria-label="Basic example">
      <a href="#addEmployee"><button type="button" class="btn btn-secondary">add employee</button></a>
      <a href="#add><button type="button" class="btn btn-secondary">add vacation</button></a>
    </div>
      </div>
      </div>
    </div>`;
    document.querySelector(".workPlace").innerHTML = `
    <form class="employeeForm">
    <div class="form-group">
      <label>Full name of the employee</label>
      <input type="text" class="form-control"  placeholder="Enter full name">
    </div>
    <div class="form-group">
      <label>Position</label>
      <input type="text" class="form-control" placeholder="Enter position">
    </div>
    <button type="button" class="btn btn-primary btnCenter">Submit</button>
    </form>
    `;
  }
}
export default render;
