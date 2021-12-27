const ADD = "ADD";
const DELETE = "DELETE";

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
