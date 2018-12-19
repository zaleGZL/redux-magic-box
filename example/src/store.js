import { createStore } from "redux-magic-box";
import models from "./models";

export default createStore(
  models,
  {},
  {
    enableDevTools: true
  }
);
