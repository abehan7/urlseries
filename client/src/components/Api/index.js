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

export const getTotalUrls = () => API.get("/url", option);

export const getAssignedtags = () => API.get("/hashtag/assigned", option);

export const getGuestUrls = () => API.get("/url/guest", option);

export const getFolderItems = () => API.get("/folderItems", option);

export const getShareFolderItems = (id) =>
  API.get(`/folder/${id}/share`, option);

export const addUrl = ({ url, title, hashTags, memo }) =>
  API.post("/url", { url, title, hashTags, memo });

export const addUrls = (urls) => API.post("/url/batch", { urls });

export const addFolder = (folder_name, folder_memo) =>
  API.post("/folder", { folder_name, folder_memo });

export const deleteFolders = (idList) => API.post("/folder/delete", { idList });

export const updateFolderContents = (id, folder_contents) =>
  API.patch(`/folder/${id}/contents`, { folder_contents });

export const updateaAssignedHashtag = (tags) => API.patch("/hashtag", { tags });

export const updateFolder = ({ folder_id, folder_name, folder_memo }) =>
  API.patch(`/folder/${folder_id}`, { folder_name, folder_memo });

export const updateFolderLike = (id) => API.put(`/folder/${id}/like`);

export const updateFolderShare = (id) => API.put(`/folder/${id}/share`);

export const updateUrlLike = (id) => API.put(`/url/like/${id}`);

export const api_updateUrl = (id, url) => API.patch(`/url/${id}`, { url });

export const deleteUrls = (urls) => API.post(`/url/delete`, { urls });

export const CrawlingAPI = (url) => API.post("/crawling", { url });

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
