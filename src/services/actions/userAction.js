import actionTypes from "../actions/actionTypes";
import { httpCollection } from "../http";

const subURL = "/user/";

//Action Creators
export const getUsers = (obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.postData(subURL + "get_all", obj);
    dispatch({ type: actionTypes.get_all_users, payload: data.details });
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

export const updateUser = (id, obj) => async (dispatch) => {
  try {
    const { data } = await httpCollection.putData(subURL + "update/" + id, obj);
    dispatch({ type: actionTypes.update_user, payload: data.details });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  console.log("1st");
  try {
    console.log(id);
    const { data } = await httpCollection.deleteData(subURL + "delete/" + id);
    console.log(data);
    dispatch({ type: actionTypes.delete_user, payload: id });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
