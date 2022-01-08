import Axios from "axios";

const API = Axios.create({
  baseURL: `http://localhost:3001/`,
});

export const SignIn = (user) => API.post("/login", user);

export const SignUp = (user) => API.post("/signup", user);
