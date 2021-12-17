import Axios from "axios";

export const toggleFunc = (e, val, setAssignedTags, assignedTags) => {
  e.target.classList.toggle("clicked");
  if (e.target.classList[2] === "clicked") {
    val.assigned = 1;
    setAssignedTags((tag) => [...tag, val]);

    console.log("클릭됨");
  } else {
    val.assigned = 0;
    setAssignedTags(
      assignedTags.filter((tag2) => {
        return tag2 !== val;
      })
    );
  }
};

export const removeToggle = (val, setAssignedTags, assignedTags) => {
  val.assigned = 0;
  setAssignedTags(
    assignedTags.filter((tag2) => {
      return tag2 !== val;
    })
  );
};

export const closeFunc = (setAssignedTags, totalTags, setTagSearch) => {
  document.querySelector(".hashtagModal-container").style.display = "none";
  setAssignedTags([]);

  totalTags.forEach((val) => {
    if (val.assigned !== val.assignedOrigin) {
      val.assigned = val.assignedOrigin;
    }
    if (val.assignedOrigin === 1) {
      setAssignedTags((tag) => [...tag, val]);
    }
  });
  setTagSearch("");
};

export const closeFuncInShare = (setAssignedTags, totalTags, setTagSearch) => {
  document.querySelector(".shareUrl-container").style.display = "none";
  setAssignedTags([]);

  totalTags.forEach((val) => {
    if (val.assigned !== val.assignedOrigin) {
      val.assigned = val.assignedOrigin;
    }
    if (val.assignedOrigin === 1) {
      setAssignedTags((tag) => [...tag, val]);
    }
  });
  setTagSearch("");
};

export const modify = (totalTags, setTagSearch) => {
  document.querySelector(".hashtagModal-container").style.display = "none";

  totalTags.forEach((val) => {
    if (val.assigned !== val.assignedOrigin) {
      val.assignedOrigin = val.assigned;
    }
  });
  Axios.put("http://localhost:3001/ChangedAssignedTag", {
    totalTags: totalTags,
  });
  setTagSearch("");
};
