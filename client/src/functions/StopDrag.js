const StopDrag = () => {
  window.document.onselectstart = (e) => {
    if (
      e.target !== document.querySelectorAll("input")[0] &&
      e.target !== document.querySelectorAll("input")[1] &&
      e.target !== document.querySelectorAll("input")[2] &&
      e.target !== document.querySelectorAll("input")[3] &&
      e.target !== document.querySelectorAll("input")[4] &&
      e.target !== document.querySelectorAll("input")[5] &&
      e.target !== document.querySelectorAll("input")[6] &&
      e.target !== document.querySelectorAll("input")[7] &&
      e.target !== document.querySelectorAll("input")[8]
    ) {
      return false;
    }
  };

  // 우클릭 방지
  window.document.oncontextmenu = (e) => {
    if (
      e.target !== document.querySelectorAll("input")[0] &&
      e.target !== document.querySelectorAll("input")[1] &&
      e.target !== document.querySelectorAll("input")[2] &&
      e.target !== document.querySelectorAll("input")[3] &&
      e.target !== document.querySelectorAll("input")[4] &&
      e.target !== document.querySelectorAll("input")[5] &&
      e.target !== document.querySelectorAll("input")[6] &&
      e.target !== document.querySelectorAll("input")[7] &&
      e.target !== document.querySelectorAll("input")[8]
    ) {
      return false;
    }
  };
};

export default StopDrag;
