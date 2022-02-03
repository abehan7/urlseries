import { PopupEnable } from "../../Hooks/stopScroll";

const EditMode_ModalFunc = (value, setUrlDetail) => {
  PopupEnable();
  console.log("에디터모드입니다");
  var oneLineTags = "";

  if (value.url_hashTags) {
    value.url_hashTags.forEach((tag) => {
      oneLineTags += tag;
    });
  }

  // 리덕스로 클릭한거 넣기
  setUrlDetail({
    url: value.url,
    title: value.url_title,
    hashTags: value.url_hashTags,
    memo: value.url_memo,
  });

  document.querySelector(".editUrl-container").style.display = "block";
  document.querySelector(".editUrl-container .put-url > input").value =
    value.url;
  document.querySelector(".editUrl-container .put-title > input").value =
    value.url_title;
  document.querySelector(".editUrl-container .put-hashTag > input").value =
    oneLineTags;
  document.querySelector(".editUrl-container .put-memo > textarea").value =
    value.url_memo;
  document.querySelector(".url_id").innerText = value._id;
  document.querySelector(".url_likedUrl").innerText = value.url_likedUrl;
  console.log(value);
};

export default EditMode_ModalFunc;
