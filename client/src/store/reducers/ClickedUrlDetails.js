const url = {
  url: "",
  title: "",
  hashTags: "",
  memo: "",
};

const SET_CLICKED = "SET_CLICKED";

const SetClickedUrl = (url) => {
  return { type: SET_CLICKED, payload: url };
};

const ClickedUrlDetails = (state = url, action) => {
  switch (action.type) {
    case SET_CLICKED:
      return { ...action.payload };
    default:
      return state;
  }
};

export default ClickedUrlDetails;

export const UrlDetailActions = {
  SetClickedUrl,
};

// Slice

// const
