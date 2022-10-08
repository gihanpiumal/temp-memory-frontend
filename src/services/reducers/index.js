import { combineReducers } from "redux";

import users from "./userReducer";
import posts from "./postReducers";

export default combineReducers({
  USERS: users,
  POSTS: posts,
});
