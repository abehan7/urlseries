const ADD = "ADD";
const RESET = "RESET";
const SETNOW = "SETNOW";

const initialState = {
  nowPage2: 0,
};

const AddNowPage = (nowP) => {
  return {
    type: ADD,
    paload: nowP,
  };
};
const ResetNowPage = () => {
  return {
    type: RESET,
  };
};
const SetNowPage = (nowP) => {
  return {
    type: SETNOW,
    payload: nowP,
  };
};

const editModalP3 = (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return { nowPage2: state.nowPage2 + 1 };
    case RESET:
      return { nowPage2: 1 };
    case SETNOW:
      return { nowPage2: Number(action.payload) };
    default:
      return state;
  }
};

export default editModalP3;

export const Page3Actions = {
  AddNowPage,
  ResetNowPage,
  SetNowPage,
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
