import actionTypes from "../actions/actionTypes";

export default (users = [], action) => {
  switch (action.type) {
    case actionTypes.get_all_users:
      return action.payload;
    case actionTypes.add_user:
      return [...users, action.payload];
    case actionTypes.update_user:
      return users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    case actionTypes.delete_user:
      return users.filter((user) => user._id !== action.payload);
    default:
      return users;
  }
};
