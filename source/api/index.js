
import axios from "axios";

const instance = axios.create({
  baseURL: 'https://autotranslationagl.herokuapp.com/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export default instance;