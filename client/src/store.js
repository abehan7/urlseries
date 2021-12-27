import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (url) => {
  return {
    type: ADD,
    payload: url,
  };
};

const deleteToDo = () => {
  return { type: DELETE };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...action.payload];
    case DELETE:
      return [];
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export default store;
