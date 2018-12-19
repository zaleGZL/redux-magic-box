import { createStore } from "../../lib";
import models from "./models";

export default createStore(
  models,
  {},
  {
    enableDevTools: true
  }
);
