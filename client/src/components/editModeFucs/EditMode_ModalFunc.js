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

  document.querySelector(".modal-window h2").innerText = "에디터모드";
  document.querySelector(".addUrl-btn button").innerText = "변경하기";
  document.querySelector(".addUrl-container").style.display = "block";
  document.querySelector(".put-url > input").value = value.url;
  document.querySelector(".put-title > input").value = value.title;
  document.querySelector(".put-hashTag > input").value = oneLineTags;
  document.querySelector(".put-memo > input").value = memo;

  console.log(value.hashTags);
};

export default EditMode_ModalFunc;
