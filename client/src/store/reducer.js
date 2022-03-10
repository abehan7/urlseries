import { combineReducers } from "redux";

import folderReducer from "./reducers/Folders";
import folderItemsReducer from "./reducers/FolderItems";
import tagReducer from "./reducers/Tags";
import urlReducer from "./reducers/urls";
import auth from "../redux/ReducersT/authReducer";
import token from "../redux/ReducersT/tokenReducer";
import users from "../redux/ReducersT/usersReducer";

const rootReducer = combineReducers({
  folders: folderReducer,
  folderItems: folderItemsReducer,
  tags: tagReducer,
  urls: urlReducer,
  auth,
  token,
  users,
});

export default rootReducer;
