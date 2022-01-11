import { PopupEnable } from "../../functions/stopScroll";

const EditMode_ModalFunc = (value) => {
  PopupEnable();
  console.log("에디터모드입니다");
  var oneLineTags = "";

  if (value.url_hashTags) {
    value.url_hashTags.forEach((tag) => {
      oneLineTags += tag;
    });
  }

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
