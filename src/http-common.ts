import axios from "axios";

export default axios.create({
  //Axios api ayarları
  // baseURL: "https://localhost:44305/api",
  baseURL: "http://localhost:3004/classrooms",
  headers: {
    "Content-type": "application/json"
  }
});