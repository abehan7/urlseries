import { combineReducers } from "redux";
import ClickedUrlDetails from "../../store/reducers/ClickedUrlDetails";
import editModalP3 from "../../store/reducers/editModalP3";
import filterdTags from "../../store/reducers/filteredTags";
import SearchResults from "../../store/reducers/SearchResults";
import auth from "./authReducer";
import token from "./tokenReducer";
import users from "./usersReducer";

export default combineReducers({
  auth,
  token,
  users,
  page3Storage: editModalP3,
  edit: filterdTags,
  ClickedUrl: ClickedUrlDetails,
  searchedList: SearchResults,
});
