import Router from "./utils/router";
import { index } from "./routes/index";
import { addEmployee } from "./routes/addEmployee";
import { addVacation } from "./routes/addVacation";
import { edit } from "./routes/edit";
const routes = [index, addEmployee, addVacation, edit];
new Router({ routes });
