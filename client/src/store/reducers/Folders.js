import { createSlice } from "@reduxjs/toolkit";

const folders = [
  {
    _id: "5f0f8f9b9c8f8b3f8c8b8b8b",
    folderName: "crypto",
    folderContents: [
      {
        url_search: {
          url_searchClicked: 0,
          url_searchedDate: "2022-02-12T15:39:57.519Z",
        },
        _id: "6207565d8c5d95a8de4f1c85",
        url: "123123",
        url_title: "123123",
        url_hashTags: [],
        url_memo: "",
        url_likedUrl: 0,
        url_clickedNumber: 0,
        url_firstDate: "2022-02-12T15:39:57.518Z",
        url_updatedDate: "2022-02-12T15:39:57.519Z",
        user_id: "61dab50ad3063e55d1d781c3",
        url_id: 961,
      },
      {
        url_search: {
          url_searchClicked: 0,
          url_searchedDate: "2022-02-10T11:59:21.651Z",
        },
        _id: "6204ff36f18de3b7078077b8",
        url: "https://www.youtube.com/watch?v=kDo_MdyNJzI",
        url_title:
          "Master Blockchain Programming With JavaScript - Web3.js - YouTube",
        url_hashTags: ["#유튜브", "#DappUniversity"],
        url_memo: "",
        url_likedUrl: 0,
        url_clickedNumber: 0,
        url_firstDate: "2022-02-10T11:59:21.650Z",
        url_updatedDate: "2022-02-10T11:59:21.651Z",
        user_id: "61dab50ad3063e55d1d781c3",
        url_id: 960,
      },
      {
        url_search: {
          url_searchClicked: 0,
          url_searchedDate: "2022-02-10T11:59:21.651Z",
        },
        _id: "6204fe21f18de3b7078077b5",
        url: "https://youtu.be/8rhueOcTu8k?t=7199",
        url_title:
          "Code an Instagram Clone with Blockchain - Ethereum, Solidity, Web3.js, React - YouTube",
        url_hashTags: ["#유튜브", "#DappUniversity"],
        url_memo: "",
        url_likedUrl: 0,
        url_clickedNumber: 0,
        url_firstDate: "2022-02-10T11:59:21.650Z",
        url_updatedDate: "2022-02-10T11:59:21.651Z",
        user_id: "61dab50ad3063e55d1d781c3",
        url_id: 959,
      },
      {
        url_search: {
          url_searchClicked: 0,
          url_searchedDate: "2022-02-09T13:27:13.036Z",
        },
        _id: "6203c144230fce28a60c16c9",
        url: "https://www.dappuniversity.com/",
        url_title: "Become An In-Demand Blockchain Master | Dapp University",
        url_hashTags: ["#dappuniversity"],
        url_memo: "",
        url_likedUrl: 0,
        url_clickedNumber: 0,
        url_firstDate: "2022-02-09T13:27:13.035Z",
        url_updatedDate: "2022-02-09T13:27:13.036Z",
        user_id: "61dab50ad3063e55d1d781c3",
        url_id: 958,
      },
      {
        url_search: {
          url_searchClicked: 0,
          url_searchedDate: "2022-02-09T05:01:56.747Z",
        },
        _id: "62034ad350810ea6f5b88fb0",
        url: "https://www.youtube.com/watch?v=61qUZgdH-aI",
        url_title: "Cartoon Character Design for Beginners - YouTube",
        url_hashTags: ["#유튜브", "#ChristopherHart"],
        url_memo: "",
        url_likedUrl: 0,
        url_clickedNumber: 0,
        url_firstDate: "2022-02-09T05:01:56.747Z",
        url_updatedDate: "2022-02-09T05:01:56.747Z",
        user_id: "61dab50ad3063e55d1d781c3",
        url_id: 957,
      },
    ],
  },
  {
    _id: "5f0f8f9b9c8f8b3f8c8b8b8c",
    folderName: "punk",
    folderContents: [
      {
        url_search: {
          url_searchClicked: 0,
          url_searchedDate: "2022-02-13T13:57:04.753Z",
        },
        _id: "620890726874596592b8596b",
        url: "https://youtu.be/a543mfiz4M8",
        url_title:
          "부자 VS 가난한자의 마음가짐 차이 (동기부여, 인생수업, 로버트 기요사키) - YouTube",
        url_hashTags: ["#유튜브", "#죠쓰JAWWS"],
        url_memo: "",
        url_likedUrl: 0,
        url_clickedNumber: 0,
        url_firstDate: "2022-02-13T13:57:04.752Z",
        url_updatedDate: "2022-02-13T13:57:04.753Z",
        user_id: "61dab50ad3063e55d1d781c3",
        url_id: 964,
        __v: 0,
      },
      {
        url_search: {
          url_searchClicked: 0,
          url_searchedDate: "2022-02-13T13:57:04.753Z",
        },
        _id: "620890536874596592b85968",
        url: "https://youtu.be/DoA_D6tmo6o",
        url_title:
          "UI Design a Dark Mode NFT app in Figma from scratch - YouTube",
        url_hashTags: ["#유튜브", "#DesignCode"],
        url_memo: "",
        url_likedUrl: 0,
        url_clickedNumber: 0,
        url_firstDate: "2022-02-13T13:57:04.752Z",
        url_updatedDate: "2022-02-13T13:57:04.753Z",
        user_id: "61dab50ad3063e55d1d781c3",
        url_id: 963,
        __v: 0,
      },
      {
        url_search: {
          url_searchClicked: 0,
          url_searchedDate: "2022-02-13T13:57:04.753Z",
        },
        _id: "620890276874596592b8595e",
        url: "https://youtu.be/eMsko1rvEj4",
        url_title: "NFT로 1,000억 번 사업가가 알려주는 비밀 무기 - YouTube",
        url_hashTags: ["#유튜브", "#게리바이너척GaryVaynerchukKorean"],
        url_memo: "",
        url_likedUrl: 0,
        url_clickedNumber: 0,
        url_firstDate: "2022-02-13T13:57:04.752Z",
        url_updatedDate: "2022-02-13T13:57:04.753Z",
        user_id: "61dab50ad3063e55d1d781c3",
        url_id: 962,
        __v: 0,
      },
      {
        url_search: {
          url_searchClicked: 0,
          url_searchedDate: "2022-02-12T15:39:57.519Z",
        },
        _id: "6207565d8c5d95a8de4f1c85",
        url: "123123",
        url_title: "123123",
        url_hashTags: [],
        url_memo: "",
        url_likedUrl: 0,
        url_clickedNumber: 0,
        url_firstDate: "2022-02-12T15:39:57.518Z",
        url_updatedDate: "2022-02-12T15:39:57.519Z",
        user_id: "61dab50ad3063e55d1d781c3",
        url_id: 961,
        __v: 0,
      },
    ],
  },
  {
    _id: "5f0f8f9b9c8f8b3f8c8b8b8d",
    folderName: "nft",
    folderContents: [],
  },
  {
    _id: "5f0f8f9b9c8f8b3f8c8b8b8e",
    folderName: "bored Apes bored Apes bored Apes",
    folderContents: [],
  },
];

export const folderSlice = createSlice({
  name: "folders",
  initialState: { folders },
  reducers: {
    ADD_FOLDER: (state, action) => {
      state.folders = [action.payload, ...state.folders];
    },
    REMOVE_FOLDER: (state, action) => {
      state = state.filter((folder) => folder.folderName !== action.payload);
    },

    // 이거 하나로 끝내기? ok
    SET_FOLDER_CONTENTS: (state, action) => {
      const { folderId, urls } = action.payload;
      const folder = state.folders.find((folder) => folder._id === folderId);
      folder.folderContents = urls;
    },
    // setContent 테스트 후 지우기
    // 굳이 여기서 실시간으로 넣고 빼고 할 필요는 없을 듯
    // 아래도 같은 이유
    // 위에 AddFolder쪽도 여기랑 동일하게 만들기
    ADD_CONTENT: (state, action) => {
      const { folderId, urlId } = action.payload;
      const folder = state.folders.find((folder) => folder._id === folderId);
      folder.folderContents = [...urlId, ...folder.folderContents];
    },
    // setContent 테스트 후 지우기
    REMOVE_CONTENT: (state, action) => {
      const { folderId, urlId } = action.payload;
      const folder = state.folders.find((folder) => folder._id === folderId);
      folder.folderContents = folder.folderContents.filter(
        (url) => url !== urlId
      );
    },
  },
});

export const { SET_FOLDER_CONTENTS, ADD_FOLDER } = folderSlice.actions;

export default folderSlice.reducer;
