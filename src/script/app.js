import Router from "./utils/router";
import { index } from "./routes/index";
import { main } from "./routes/main";
const routes = [index, main];
new Router({ routes });
