const BoxTagControler = (
  e,
  { BoxTags_First, setBoxTags_First, BoxTags, setBoxTags }
) => {
  console.log(BoxTags_First);
  console.log(e.target);
  if (BoxTags_First) {
    document.querySelectorAll(".tag").forEach((one) => {
      one.style.opacity = "0.3";
    });
    setBoxTags_First(false);
  }

  if (e.target.style.opacity == 0.3) {
    e.target.style.opacity = "1";
    setBoxTags([...BoxTags, e.target.textContent]);
    // console.log(BoxTags);
    console.log(BoxTags[0]);
  } else {
    e.target.style.opacity = "0.3";
    setBoxTags(BoxTags.filter((oneTag) => oneTag !== e.target.textContent));
  }
  // 한박자가 느린데 이유를 잘 모르겠어 그거 하나 고쳐야할듯
  //   if (BoxTags[0] == undefined) {
  //     document.querySelectorAll(".tag").forEach((one) => {
  //       one.style.opacity = "1";
  //     });
  //     setBoxTags_First(true);
  //   }
};
export default BoxTagControler;
