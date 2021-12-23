const EditModeRectsFunc = (editMode) => {
  if (editMode) {
    document.querySelectorAll(".RectColor").forEach((rect) => {
      rect.style.backgroundColor = "#FFE4C4";
    });

    document.querySelector(".Big_Rect > h3").innerText = "에디터모드입니다";
    document.querySelector(".Big_Rect > h3").style.color = "red";
    document.querySelector(".editUrl-icon").style.color = "tomato";

    document.querySelectorAll(".aside-tags").forEach((aside) => {
      // console.log(aside);
      aside.style.padding = "5px";
      //   aside.style.border = "3px dashed white";
      //   aside.style.border = "5px dotted #c4c4c462";
      //   aside.style.border = "5px dotted #91919162";
      aside.style.border = "4px dashed #52525262"; // 색깔은 이게 괜찮아
      // aside.style.border = "10px dotted #52525262"; // 색깔은 이게 괜찮아
    });
  } else {
    document.querySelectorAll(".RectColor").forEach((rect) => {
      rect.style.backgroundColor = "#fafafa";
    });
    document.querySelector(".Big_Rect > h3").innerText = "전체 URL";
    document.querySelector(".Big_Rect > h3").style.color = "black";
    document.querySelector(".editUrl-icon").style.color = "black";

    document.querySelectorAll(".aside-tags").forEach((aside) => {
      aside.style.padding = "0px";
      aside.style.border = "none";
    });
  }
};

export default EditModeRectsFunc;
