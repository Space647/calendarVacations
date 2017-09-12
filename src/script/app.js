import Router from "./utils/router";
import { index } from "./routes/index";
import { addEmployee } from "./routes/addEmployee";
const routes = [index, addEmployee];
new Router({ routes });
