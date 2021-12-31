const ADD = "ADD";
const DELETE = "DELETE";

// 이거 어디에서 사용되지?
// 필터된 태그들이니까 휴지통에서 사용된거같아
const addFiltered = (url) => {
  return {
    type: ADD,
    payload: url,
  };
};

const deleteFiltered = () => {
  return { type: DELETE };
};

const filterdTags = (state = ["안녕하세여"], action) => {
  switch (action.type) {
    case ADD:
      return action.payload;
    case DELETE:
      return [];
    default:
      return state;
  }
};

export default filterdTags;

export const actionCreators2 = {
  addFiltered,
  deleteFiltered,
};
