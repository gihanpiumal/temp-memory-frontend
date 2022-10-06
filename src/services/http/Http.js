import axios from "axios";
import { getAccessToken } from "../../config/LocalStorage";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

const http = {
  login_Registration_Data: async function (url, data) {
    let response;
    await instance({
      method: "POST",
      url: url,
      data: data,
    })
      .then((res) => {
        response = res.data;
      })
      .catch(async (err) => {
        response = { err };
      });
    return response;
  },
};

export default http;
