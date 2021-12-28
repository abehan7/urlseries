import Axios from "axios";

const SETNOW = "SETNOW";
const GETFITEM = "GETFITEM";
const GETFITEM_SUCCESS = "GETFITEM_SUCCESS";
const SET_FOLDER = "SET_FOLDER";

const folderItemsAPI = async () => {
  const { data } = await Axios.get("http://localhost:3001/folderItems");
  return data;
};

const initialState = {
  nowPage2: 0,
  folderItems: null,
  nowFolder2: null,
};

const SetNowPage = (nowP) => {
  return {
    type: SETNOW,
    payload: nowP,
  };
};

const GetFolderItems = () => {
  return {
    type: GETFITEM,
    payload: folderItemsAPI,
  };
};

const SetNowFolder = (folder) => {
  return {
    type: SET_FOLDER,
    payload: folder,
  };
};

const editModalP3 = (state = initialState, action) => {
  switch (action.type) {
    case SETNOW:
      return {
        ...state,
        nowPage2: Number(action.payload),
      };
    case GETFITEM_SUCCESS:
      return {
        ...state,
        folderItems: action.payload,
      };

    case SET_FOLDER:
      return {
        ...state,
        nowFolder2: action.payload,
      };

    default:
      return state;
  }
};

export default editModalP3;

export const Page3Actions = {
  SetNowPage,
  GetFolderItems,
  SetNowFolder,
};

// 나중에 구조 복잡해지면 이렇게 사용하기
// function User(name, age, mobile) {
//     this.name = name;
//     this.age = age;
//     this.mobile = mobile;
//   }

// var user1 = new User('Talha', 26, 8801967402131);
// console.log(user1)
// //
// user1 = {
//   age: 26,
//   mobile: 1993,
//   name: "Talha"
// }
