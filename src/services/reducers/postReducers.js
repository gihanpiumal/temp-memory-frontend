import actionTypes from "../actions/actionTypes";

export default (posts = [], action) => {
  switch (action.type) {
    case actionTypes.get_all_posts:
      return action.payload;
    case actionTypes.add_post:
      return [...posts, action.payload];
    case actionTypes.update_post:
      return posts.map((post) =>
      post._id === action.payload._id ? action.payload : post
      );
    case actionTypes.delete_post:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};