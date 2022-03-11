import { combineReducers } from "redux";

import folderReducer from "./reducers/Folders";
import folderItemsReducer from "./reducers/FolderItems";
import tagReducer from "./reducers/Tags";
import urlReducer from "./reducers/urls";
import authReducer from "../redux/ReducersT/authReducer";
import tokenReducer from "../redux/ReducersT/tokenReducer";
import usersReducer from "../redux/ReducersT/usersReducer";

const rootReducer = combineReducers({
  folders: folderReducer,
  folderItems: folderItemsReducer,
  tags: tagReducer,
  urls: urlReducer,
  auth: authReducer,
  token: tokenReducer,
  users: usersReducer,
});

export default rootReducer;
