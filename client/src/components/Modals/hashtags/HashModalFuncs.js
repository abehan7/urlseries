import Axios from "axios";

const api = Axios.create({
  baseURL: `http://localhost:3001/`,
});

export const modify = (setTotalTags, totalTags, assignedTags, setTagSearch) => {
  document.querySelector(".hashtagModal-container").style.display = "none";
  setTotalTags(
    totalTags.map((tag) => {
      return {
        name: tag.name,
        assigned: tag.assigned,
        origin: tag.assigned,
      };
    })
  );
  console.log(assignedTags);

  let oneLineTags = [];
  assignedTags.forEach((val) => {
    oneLineTags.push(val.name);
  });

  api.put("/ChangedAssignedTag", {
    oneLineTags: oneLineTags,
  });

  setTagSearch("");
};

export const closeFunc = (
  setAssignedTags,
  totalTags,
  setTotalTags,
  setTagSearch
) => {
  document.querySelector(".hashtagModal-container").style.display = "none";

  setAssignedTags(
    totalTags.filter((tag) => {
      return tag.origin === 1;
    })
  );

  setTotalTags(
    totalTags.map((tag) => {
      return {
        name: tag.name,
        assigned: tag.origin,
        origin: tag.origin,
      };
    })
  );

  setTagSearch("");
};
