import { debounce } from "lodash";

const debounceSomethingFunc = debounce((value) => {
  let BalloonOneLineTags = "";
  value.url_hashTags.forEach((val) => {
    BalloonOneLineTags += val;
    BalloonOneLineTags += " ";
  });

  console.log(value.url_title);
  document.querySelector(".memoContent").innerText = value.url_memo;
  document.querySelector(".tagContent").innerText = BalloonOneLineTags;
}, 2000);

const onDebounceChange = (e) => {
  debounceSomethingFunc(e);
};
