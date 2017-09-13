import Router from "./utils/router";
import { index } from "./routes/index";
import { addEmployee } from "./routes/addEmployee";
import { addVacation } from "./routes/addVacation";
const routes = [index, addEmployee, addVacation];
new Router({ routes });
