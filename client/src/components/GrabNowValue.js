import { debounce } from "lodash";

const GrabNowValue = debounce((value) => {
  const circle = document.querySelector(".detail-container");
  circle.style.display = "flex";
  let BalloonOneLineTags = "";
  value.url_hashTags.forEach((val) => {
    BalloonOneLineTags += val;
    BalloonOneLineTags += " ";
  });

  console.log(value.url_title);
  if (value.url_memo.length === 0) {
    document.querySelector(".memoContent").style.display = "none";
  } else {
    document.querySelector(".memoContent").style.display = "-webkit-box";
  }
  document.querySelector(".memoContent").innerText = value.url_memo;
  document.querySelector(".tagContent").innerText = BalloonOneLineTags;
}, 600);

export default GrabNowValue;
