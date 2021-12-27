const BoxTagControler = ({
  e,
  BoxTags_First,
  setBoxTags_First,
  BoxTags,
  setBoxTags,
}) => {
  var currentList = [];

  // ====================================== 처음에 한번 누르면 전체 투명도 낮아지는 거 START ======================================

  if (BoxTags_First) {
    document.querySelectorAll(".tag").forEach((one) => {
      one.style.opacity = "0.3";
    });
    setBoxTags_First(false);
  }
  // ====================================== 처음에 한번 누르면 전체 투명도 낮아지는 거 END ======================================

  // ====================================== 선택에 따라서 색깔변화 START ======================================
  if (e.target.style.opacity === "0.3") {
    e.target.style.opacity = "1";
    setBoxTags([...BoxTags, e.target.textContent]);
    // console.log(BoxTags);
    currentList = [...BoxTags, e.target.textContent];
    // console.log(currentList);
  } else {
    e.target.style.opacity = "0.3";
    setBoxTags(BoxTags.filter((oneTag) => oneTag !== e.target.textContent));
    currentList = BoxTags.filter((oneTag) => oneTag !== e.target.textContent);
    // console.log(currentList);
    // console.log(currentList.length);
  }
  // ====================================== 선택에 따라서 색깔변화 END ======================================

  // ====================================== 선택된거가 하나도 없으면 전체 색깔 찐하게 START ======================================
  if (currentList.length === 0) {
    document.querySelectorAll(".tag").forEach((one) => {
      one.style.opacity = "1";
    });
    setBoxTags_First(true);
  }
  console.log(currentList);

  // ====================================== 선택된거가 하나도 없으면 전체 색깔 찐하게 END ======================================
};

export const RefreshBtn = ({ setBoxTags_First, setBoxTags }) => {
  document.querySelectorAll(".tag").forEach((one) => {
    one.style.opacity = "1";
  });
  setBoxTags_First(true);
  setBoxTags([]);
};
export default BoxTagControler;
