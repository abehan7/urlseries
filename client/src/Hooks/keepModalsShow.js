export const clickOutSide = (e, clickedSearchInput, setClickedSearchInput) => {
  var target = e.target;

  if (
    target === document.querySelector(".search-box").firstChild ||
    target === document.querySelector(".Search-balloon") ||
    target === document.querySelector(".Search-balloon-title") ||
    target === document.querySelector(".notSearched") ||
    target === document.querySelector(".Searched-Stuffs-Container") ||
    target === document.querySelector(".delete-recent-searched") ||
    target === document.querySelector(".recent-serached-title")
  ) {
    return;
  }

  // =============== 모달 안에 검색어 클릭해도 모달 안사라지게 하는기능 start ===============
  var oneSearchedStuff;
  document.querySelectorAll(".searched-Stuff").forEach((val) => {
    if (target === val) {
      return (oneSearchedStuff = true);
    }
  });

  document.querySelectorAll(".recent-searched-Stuff").forEach((val) => {
    if (target === val) {
      return (oneSearchedStuff = true);
    }
  });

  document.querySelectorAll(".Searched-url-Title").forEach((val) => {
    if (target === val) {
      return (oneSearchedStuff = true);
    }
  });

  document.querySelectorAll(".delete-url").forEach((val) => {
    if (target === val) {
      return (oneSearchedStuff = true);
    }
  });

  document.querySelectorAll("svg").forEach((val) => {
    if (target === val) {
      return (oneSearchedStuff = true);
    }
  });

  document.querySelectorAll("path").forEach((val) => {
    if (target === val) {
      return (oneSearchedStuff = true);
    }
  });

  if (oneSearchedStuff) {
    return;
  }
  // =============== 모달 안에 검색어 클릭해도 모달 안사라지게 하는 기능 end ===============

  document.querySelector(".search-box > svg").style.display = "block";

  if (clickedSearchInput) {
    document.querySelector(".Search-balloon").style.opacity = "0";
    // 위로 -10픽셀만큼 서서히 올라가는거
    document.querySelector(".Search-balloon").style.transform =
      "translateY(-20px)";

    setTimeout(() => {
      document.querySelector(".Search-balloon").style.display = "none";
      setClickedSearchInput(!clickedSearchInput);
      // console.log(clickedSearchInput);
    }, 100);
  }
};
