import actionTypes from "../actions/actionTypes";
import { httpCollection } from "../http";

const subURL = "/user/";

//Action Creators
export const getUsers = (obj) => async (dispatch) => {
    try {
      const { data } = await httpCollection.postData(subURL+"get_all", obj);
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
  
//   export const updateUser = (id, obj) => async (dispatch) => {
//     try {
//       const { data } = await api.putData("/user/update/" + id, obj);
//       dispatch({ type: actionTypes.update_user, payload: data.updateUser });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
  
//   export const deleteUser = (id) => async (dispatch) => {
//     try {
//       const { data } = await api.deleteData("/user/delete/" + id);
//       dispatch({ type: actionTypes.delete_user, payload: id });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
  