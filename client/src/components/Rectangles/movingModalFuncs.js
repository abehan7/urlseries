import { debounce } from "lodash";

export const grabNowValue = debounce((value) => {
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

export const onMouseLeave = () => {
  const circle = document.querySelector(".detail-container");
  circle.style.display = "none";
  grabNowValue.cancel();
};

export const getMouseLocation = (e) => {
  const circle = document.querySelector(".detail-container");
  // circle.style.display = "flex";

  const mouseX = e.clientX;
  const mouseY = e.pageY;
  // circle.style.left = 520 + "px";
  circle.style.left = mouseX + "px";
  // circle.style.top = 1142 + "px";
  circle.style.top = mouseY - 80 + "px";

  // console.log(mouseY);
};
