import { combineReducers } from "redux";

import editModalP3 from "./store/reducers/editModalP3";
import filterdTags from "./store/reducers/filteredTags";

const rootReducer = combineReducers({
  page3Storage: editModalP3,
  edit: filterdTags,
});

export default rootReducer;
