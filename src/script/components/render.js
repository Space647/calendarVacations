class render {
  renderingIndexPages () {
    Promise.resolve()
    document.querySelector('header').innerHTML = `
    <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-md-11 text-center dateNow">
        <span>текущая дата 09 09 2017</span>
      </div>
      <div class="col-md-1 text-right">
      <a href="#addNewEmployee"><button type="button" class="btn btn-outline-success">Добавить сотрудника</button></a>
      </div>
    </div>
  </div>`
  }
}
export default render
