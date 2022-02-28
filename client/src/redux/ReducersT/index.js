import { combineReducers } from "redux";
import ClickedUrlDetails from "../../store/reducers/ClickedUrlDetails";
import filterdTags from "../../store/reducers/filteredTags";
import SearchResults from "../../store/reducers/SearchResults";
import auth from "./authReducer";
import token from "./tokenReducer";
import users from "./usersReducer";

export default combineReducers({
  auth,
  token,
  users,
  edit: filterdTags,
  ClickedUrl: ClickedUrlDetails,
  searchedList: SearchResults,
});
