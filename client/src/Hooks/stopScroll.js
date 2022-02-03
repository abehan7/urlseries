const body = document.querySelector("body");
let scrollPosition = 0;

// 팝업 오픈
export const PopupEnable = () => {
  scrollPosition = window.pageYOffset;
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${scrollPosition}px`;
  body.style.width = "100%";
};
// 팝업 닫기
export const PopupDisable = () => {
  body.style.removeProperty("overflow");
  body.style.removeProperty("position");
  body.style.removeProperty("top");
  body.style.removeProperty("width");
  window.scrollTo(0, scrollPosition);
};
