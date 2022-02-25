import { combineReducers } from "redux";

import ClickedUrlDetails from "./reducers/ClickedUrlDetails";
import filterdTags from "./reducers/filteredTags";
import folderReducer from "./reducers/Folders";
import folderItemsReducer from "./reducers/FolderItems";
import SearchResults from "./reducers/SearchResults";
import folderConditionsReducer from "./reducers/FolderConditions";
import modalReducer from "./reducers/Modal";
import tagReducer from "./reducers/Tags";
import urlReducer from "./reducers/urls";

const rootReducer = combineReducers({
  edit: filterdTags,
  ClickedUrl: ClickedUrlDetails,
  searchedList: SearchResults,
  folders: folderReducer,
  folderItems: folderItemsReducer,
  folderConditions: folderConditionsReducer,
  modal: modalReducer,
  tags: tagReducer,
  urls: urlReducer,
});

export default rootReducer;
