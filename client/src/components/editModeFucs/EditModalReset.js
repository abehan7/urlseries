const EditModalReset = () => {
  console.log("추가모드입니다");

  document.querySelector(".modal-window h2").innerText = "URL추가";
  document.querySelector(".addUrl-btn button").innerText = "추가하기";
  document.querySelector(".put-url > input").value = "";
  document.querySelector(".put-title > input").value = "";
  document.querySelector(".put-hashTag > input").value = "";
  document.querySelector(".put-memo > input").value = "";
};

export default EditModalReset;
