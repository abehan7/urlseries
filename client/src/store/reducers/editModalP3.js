import { getFolderItems } from "../../components/Api";

const SETNOW = "SETNOW";
const GETFITEM = "GETFITEM";
const EDIT_FITEMS = "EDIT_FITEMS";
const GETFITEM_SUCCESS = "GETFITEM_SUCCESS";
const SET_FOLDER = "SET_FOLDER";

const folderItemsAPI = async () => {
  const { data } = await getFolderItems();
  return data;
};

const initialState = {
  nowPage2: 0,
  folderItems: null,
  nowFolder2: {},
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

const EditFolderItems = (newFolderItems) => {
  return {
    type: EDIT_FITEMS,
    payload: newFolderItems,
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
      // 해쉬모달 현재 페이지
      return {
        ...state,
        nowPage2: Number(action.payload),
      };
    // API CALL 맨 처음에 화면 렌더링 될 때 <전체 폴더 아이템>
    case GETFITEM_SUCCESS:
      return {
        ...state,
        folderItems: action.payload,
      };
    // 여기는 어디서 사용되는지 잘 모르겠어
    // 일단 page2에서 folderItems 추가할 때 사용
    // 그러면 내부 모양이 어떻게 생겼는지 확인해봐야겠다 folderItems 이거
    case EDIT_FITEMS:
      return {
        ...state,
        folderItems: action.payload,
      };
    // 현재 클릭한 폴더
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
  EditFolderItems,
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
