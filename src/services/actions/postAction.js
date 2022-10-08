import actionTypes from "../actions/actionTypes";
import { httpCollection } from "../http";

const subURL = "/post/";

//Action Creators
export const getPosts = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "get_all", obj);
    dispatch({ type: actionTypes.get_all_posts, payload: data.details });
  } catch (error) {
    console.log(error.message);
  }
};

//   export const addUser = (obj) => async (dispatch) => {
//     try {
//       const { data } = await api.postData("/user/new/add", obj);
//       dispatch({ type: actionTypes.add_user, payload: data.addedData });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

export const updatePost = (id, obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.putData(subURL + "update/" + id, obj);
    dispatch({ type: actionTypes.update_post, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await httpCollection.deleteData(subURL + "delete/" + id);
    dispatch({ type: actionTypes.delete_post, payload: id });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
