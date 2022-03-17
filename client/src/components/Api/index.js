import axios from "axios";

axios.defaults.withCredentials = true;
// export const API = axios.create({ baseURL: "https://urlstory.herokuapp.com" });
export const API = axios.create({ baseURL: "http://localhost:3001" });
const controller = new AbortController();

export const getAbort = () => controller.abort();
const option = { signal: controller.signal };

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

export const getTotalUrls = () => API.get("/url");

export const getAssignedtags = () => API.get("/hashtag/assigned");

// export const getTotalTags = () => API.get("/hashtag/total");

export const getGuestUrls = () => API.get("/url/guest", option);

export const SearchDeleteAll = () => API.get("/search/delete/all");

export const getFolderItems = () => API.get("/folderItems");

export const addUrl = ({ url, title, hashTags, memo }) =>
  API.post("/url", { url, title, hashTags, memo });

export const addFolder = (folder_name, folder_memo) =>
  API.post("/folder", { folder_name, folder_memo });

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

export const updateUrlLike = (id) => API.put(`/url/like/${id}`);

export const api_updateUrl = (id, url) => API.patch(`/url/${id}`, { url });

export const deleteUrls = (urls) => API.post(`/url/delete`, { urls });

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
