import { createStore } from "redux";
import rootReducer from "./reducer";

const store2 = createStore(rootReducer);
export default store2;
