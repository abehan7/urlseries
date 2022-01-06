const initialStates = {
  resultList: [],
};

const ADD_URLS = "ADD_URLS";
const ADD_URLS_SUCCESS = "ADD_URLS_SUCCESS";
export const SetResults = (results) => {
  results === undefined && (results = []);
  return {
    type: ADD_URLS,
    payload: results,
  };
};

const SearchResults = (state = initialStates, action) => {
  switch (action.type) {
    case ADD_URLS:
      return action.payload;
    case ADD_URLS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
};

export default SearchResults;
