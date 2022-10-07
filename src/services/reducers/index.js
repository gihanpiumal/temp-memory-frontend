import { combineReducers } from "redux";

import users from "./userReducer";

export default combineReducers({
  USERS: users,
});
