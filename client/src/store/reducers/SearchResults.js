const initialStates = {
  resultList: [],
  typingNow: "",
};

const ADD_URLS = "ADD_URLS";
const Add_KEYWORD = "Add_KEYWORD";
const ADD_URLS_SUCCESS = "ADD_URLS_SUCCESS";

export const SetResults = (results) => {
  results === undefined && (results = []);
  return {
    type: ADD_URLS,
    payload: results,
  };
};

export const SetTypingNow = (text) => {
  return {
    type: Add_KEYWORD,
    payload: text,
  };
};

const SearchResults = (state = initialStates, action) => {
  switch (action.type) {
    case ADD_URLS:
      return { ...state, resultList: action.payload };
    case ADD_URLS_SUCCESS:
      return { ...state, resultList: action.payload };
    case Add_KEYWORD:
      return { ...state, typingNow: action.payload };

    default:
      return state;
  }
};

export default SearchResults;
