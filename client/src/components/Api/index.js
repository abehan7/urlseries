import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

// const API2 = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("accessToken");
    console.log(token);
    if (token) {
      req.headers.authorization = `Bearer ${JSON.parse(token)}`;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const GetTotalUrls = () => API.get("/totalURL");

export const TotalAfter = () => API.get("/TotalAfter");

export const Get21Urls = (lastId) => API.post("/get21Urls", { lastId });

export const getFolderItems = () => API.get("/folderItems");

export const LikeConfirmPutAPI = (ModifiedList) =>
  API.put("/FolderLiked", { ModifiedList });

export const AddUrl = (url, title, hashTags, memo) =>
  API.post("/addUrl", { url, title, hashTags, memo });

export const AddFolder = (folder_name) =>
  API.post("/addFolder", { folder: { folder_name } });

export const DeleteFolderAPI = (idList) =>
  API.post("/deleteFolder", { idList });

export const EditUrlAPI = (url) => API.put("/editUrl", { ...url });

export const FolderContentsChangedAPI = (nowFolder2) =>
  API.put("/folderContentsChanged", { nowFolder2 });

export const DeleteUrlAPI = (_id) => API.delete(`/deleteUrl/${_id}`);

export const CrawlingAPI = (url) => API.post("/crawling", { url });

export const LoginApi = (user) => API.post("/login", user);

export const SignUp = (user) => API.post("/signup", user);
