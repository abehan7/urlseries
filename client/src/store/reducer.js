import { combineReducers } from "redux";

import ClickedUrlDetails from "./reducers/ClickedUrlDetails";
import filterdTags from "./reducers/filteredTags";
import folderReducer from "./reducers/Folders";
import folderItemsReducer from "./reducers/FolderItems";
import folderConditionsReducer from "./reducers/FolderConditions";
import modalReducer from "./reducers/Modal";
import tagReducer from "./reducers/Tags";
import urlReducer from "./reducers/urls";
import auth from "../redux/ReducersT/authReducer";
import token from "../redux/ReducersT/tokenReducer";
import users from "../redux/ReducersT/usersReducer";

const rootReducer = combineReducers({
  edit: filterdTags,
  ClickedUrl: ClickedUrlDetails,
  folders: folderReducer,
  folderItems: folderItemsReducer,
  folderConditions: folderConditionsReducer,
  modal: modalReducer,
  tags: tagReducer,
  urls: urlReducer,
  auth,
  token,
  users,
});

export default rootReducer;
