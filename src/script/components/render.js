class render {
  renderingIndexPages() {
    Promise.resolve();
    document.querySelector("header").innerHTML = `
    <div class="container">
    <div class="row">
      <div class="col-md-10">
        <span class="dateNow"></span>
      </div>
      <div class="col-md-2">
      <div class="btn-group" role="group" aria-label="Basic example">
      <a href="#addEmployee"><button type="button" class="btn btn-secondary">add employee</button></a>
      <a href="#addVacation"><button type="button" class="btn btn-secondary">add vacation</button></a>
      </div>
      </div>
    </div>
  </div>`;
  }
  renderTable(table) {
    document.querySelector(".table").innerHTML = table;
  }
  renderEmployeePages() {
    Promise.resolve();
    document.querySelector("header").innerHTML = `
    <div class="container">
    <div class="row">
      <div class="col-md-10">
        <span class="dateNow"></span>
      </div>
      <div class="col-md-2">
      <div class="btn-group" role="group" aria-label="Basic example">
      <a href="#addVacation"><button type="button" class="btn btn-secondary">add vacation</button></a>
      <a href="#"><button type="button" class="btn btn-secondary">Back</button></a>
      </div>
      </div>
    </div>
  </div>`;
    document.querySelector(".workPlace").innerHTML = `
    <form class="employeeForm">
    <div class="form-group">
      <label class="lb1">Full name of the employee</label>
      <input type="text" class="form-control fullName"  placeholder="Enter full name">
    </div>
    <div class="form-group">
      <label class="lb2">Position</label>
      <input type="text" class="form-control position" placeholder="Enter position">
    </div>
    <button type="button" class="btn btn-primary btnCenter send">Submit</button>
    </form>
    `;
  }
  renderVacationPages(arrObj) {
    Promise.resolve();
    document.querySelector("header").innerHTML = `
    <div class="container">
    <div class="row">
      <div class="col-md-10">
        <span class="dateNow"></span>
      </div>
      <div class="col-md-2">
      <div class="btn-group" role="group" aria-label="Basic example">
      <a href="#addEmployee"><button type="button" class="btn btn-secondary">add employee</button></a>
      <a href="#"><button type="button" class="btn btn-secondary">Back</button></a>
      </div>
      </div>
    </div>
    </div>`;
    if (!arrObj) return;
    let placeRenderWorkPlace, seleckMenu;
    placeRenderWorkPlace = document.querySelector(".workPlace");
    seleckMenu = arrObj
      .map(function(obj) {
        return (seleckMenu = `<option selected>${obj.fullName}</option>`);
      })
      .join(" ");
    placeRenderWorkPlace.innerHTML = `
    <div class="container">
      <div class="row">
      <div class="col-md-12">
      <span class="sp1">Full name</span>
      </div>
      <div class="col-md-12">
      <select class="custom-select">${seleckMenu}</select>
      </div>
    </div>
    <div class="row">
    <div class="col-md-12">
    <span class="sp2">Vacation from</span>
    </div>
    </div>
    <div class="row">
    <div class="col-md-12">
    <input type="date" name="calendar" class="vacationFrom">
    </div>
    </div>
    <div class="row">
    <div class="col-md-12">
    <span class="sp3">Vacation on</span>
    </div>
    </div>
    <div class="row">
    <div class="col-md-12">
    <input type="date" name="calendar" class="vacationOn">
    </div>
    </div>
    <div class="row">
    <div class="col-md-12">
    <div class="status"></div>
    <button type="button" class="btn btn-primary btnCenter send">Submit</button>
    </div>
    </div>
    </div>`;
  }
  renderingEditPages() {
    Promise.resolve();
    document.querySelector("header").innerHTML = `
    <div class="container">
    <div class="row">
      <div class="col-md-10">
        <span class="dateNow"></span>
      </div>
      <div class="col-md-2">
      <div class="btn-group" role="group" aria-label="Basic example">
      <a href="#addVacation"><button type="button" class="btn btn-secondary">add vacation</button></a>
      <a href="#"><button type="button" class="btn btn-secondary">Back</button></a>
      </div>
      </div>
    </div>
    </div>`;
    document.querySelector(".workPlace").innerHTML = ` <div class="container">
    <div class="row">
    <div class="col-md-12">
    <span class="sp1">Full name</span>
    </div>
    <div class="col-md-12">
    <span class="fullName"></span>
    </div>
    </div>
    <div class="row">
    <div class="col-md-12">
    <span class="sp2">Vacation from</span>
    </div>
    </div>
    <div class="row">
    <div class="col-md-12">
    <input type="date" name="calendar" class="vacationFrom">
    </div>
    </div>
    <div class="row">
    <div class="col-md-12">
    <span class="sp3">Vacation on</span>
    </div>
    </div>
    <div class="row">
    <div class="col-md-12">
    <input type="date" name="calendar" class="vacationOn">
    </div>
    </div>
    <div class="row">
    <div class="col-md-12">
    <button type="button" class="btn btn-primary btnCenter send">Submit</button>
    </div>
    </div>
    </div>`;
  }
}
export default render;
