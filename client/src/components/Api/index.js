import axios from "axios";

export const API = axios.create({ baseURL: "https://urlstory.herokuapp.com" });
// export const API = axios.create({ baseURL: "http://localhost:3001" });
// axios.defaults.withCredentials = true;
const controller = new AbortController();

export const StopAPI = () => controller.abort();

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      req.headers.Authorization = token;

      // req.header["Authorization"] = `Bearer ${token}`;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const GetTotalUrls = () => API.get("/totalURL");

export const TotalAfter = () => API.get("/TotalAfter");

export const SearchDeleteAll = () => API.get("/search/delete/all");

export const Get21Urls = (lastId) => API.post("/get21Urls", { lastId });

export const getFolderItems = () => API.get("/folderItems");

export const AddUrl = (url, title, hashTags, memo) =>
  API.post("/addUrl", { url, title, hashTags, memo });

export const AddFolder = (folder_name) =>
  API.post("/addFolder", { folder_name });

export const DeleteFolder = (idList) => API.post("/deleteFolder", { idList });

export const EditUrlAPI = (url) => API.put("/editUrl", { ...url });

export const ClickUrl = (url) => API.put("/clickedURLInBox", { url });

export const ClickedSeachedUrlAPI = (_id) =>
  API.put(`/clickedSeachedURL/${_id}`);

export const updateFolderContents = (id, folder_contents) =>
  API.patch(`/folder/contents/${id}`, { folder_contents });

export const updateHashtag = (oneLineTags) =>
  API.patch("/hashtag", { oneLineTags });

export const updateFolderName = (folder_name, folder_id) =>
  API.patch(`/updateFolderName/${folder_id}`, { folder_name });

export const updateFolderLike = (folders) =>
  API.put("/FolderLiked", { folders });

export const DeleteUrlAPI = (_id) => API.delete(`/deleteUrl/${_id}`);

export const CrawlingAPI = (url) => API.post("/crawling", { url });

export const LoginApi = (user) => API.post("/login", user);

export const SignUp = (user) => API.post("/signup", user);

// FIXME: api call abort하는 부분
// export const CrawlingAPI = (url) =>
// API.post("/crawling", { url }, { signal: controller.signal });

// FIXME: axios option넣어주는 곳
// const option = {
//   url: `http://localhost3000/test`,
//   method: "POST",
//   header: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
//   data: {
//     name: "sewon",
//     age: 20,
//   },
// };
