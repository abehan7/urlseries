import { combineReducers } from "redux";
import ClickedUrlDetails from "./reducers/ClickedUrlDetails";

import editModalP3 from "./reducers/editModalP3";
import filterdTags from "./reducers/filteredTags";
import folderReducer from "./reducers/Folders";
import SearchResults from "./reducers/SearchResults";

const rootReducer = combineReducers({
  page3Storage: editModalP3,
  edit: filterdTags,
  ClickedUrl: ClickedUrlDetails,
  searchedList: SearchResults,
  folders: folderReducer,
});

export default rootReducer;
