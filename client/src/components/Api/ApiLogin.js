import Axios from "axios";

const api = Axios.create({
  baseURL: `http://localhost:3001/`,
});

export const ApiLogin = async (user) => {
  await api.post("/login", user).then((response) => {
    return response.data;
  });
};
