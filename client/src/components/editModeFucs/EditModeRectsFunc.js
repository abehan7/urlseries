const EditModeRectsFunc = (editMode) => {
  if (editMode) {
    document.querySelectorAll(".RectColor").forEach((rect) => {
      rect.style.backgroundColor = "#FFE4C4";
    });

    if (document.querySelector(".Big_Rect > div > h3")) {
      document.querySelector(".Big_Rect > div > h3").innerText =
        "에디터모드입니다";
      document.querySelector(".Big_Rect > div > h3").style.color = "red";
    }
  } else {
    document.querySelectorAll(".RectColor").forEach((rect) => {
      rect.style.backgroundColor = "#fafafa";
    });
    document.querySelector(".Big_Rect > h3").innerText = "전체 URL";
    document.querySelector(".Big_Rect > h3").style.color = "black";
  }
};

export default EditModeRectsFunc;
