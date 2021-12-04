const EditMode_ModalFunc = (value) => {
  console.log("에디터모드입니다");
  var oneLineTags = "";

  if (value.hashTags) {
    value.hashTags.forEach((tag) => {
      oneLineTags += tag;
    });
  }
  var memo = "";
  if (value.memo) {
    memo = value.memo;
  }

  document.querySelector(".editUrl-container").style.display = "block";
  document.querySelector(".editUrl-container .put-url > input").value =
    value.url;
  document.querySelector(".editUrl-container .put-title > input").value =
    value.title;
  document.querySelector(".editUrl-container .put-hashTag > input").value =
    oneLineTags;
  document.querySelector(".editUrl-container .put-memo > input").value = memo;

  console.log(value.hashTags);
};

export default EditMode_ModalFunc;
