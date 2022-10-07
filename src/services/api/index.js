import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL

export const getData = (url) => axios.get(baseURL);

export const postData = (url, obj) => axios.post(baseURL + url, obj);

export const putData = (url, obj) => axios.put(baseURL + url, obj);

export const deleteData = (url) => axios.delete(baseURL + url);
