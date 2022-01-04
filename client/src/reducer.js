import { combineReducers } from "redux";
import ClickedUrlDetails from "./store/reducers/ClickedUrlDetails";

import editModalP3 from "./store/reducers/editModalP3";
import filterdTags from "./store/reducers/filteredTags";

const rootReducer = combineReducers({
  page3Storage: editModalP3,
  edit: filterdTags,
  ClickedUrl: ClickedUrlDetails,
});

export default rootReducer;
