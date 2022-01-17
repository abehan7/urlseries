import { ChangedAssignedTagAPI } from "../../Api";

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

  ChangedAssignedTagAPI(oneLineTags);

  setTagSearch("");
};

export const closeFunc = ({
  setAssignedTags,
  totalTags,
  setTotalTags,
  setTagSearch,
}) => {
  document.querySelector(".hashtagModal-container").style.display = "none";

  setAssignedTags(
    totalTags.filter((tag) => {
      return tag.origin === 1;
    })
  );

  setTotalTags(
    totalTags.map((tag) => {
      return { ...tag, assigned: tag.origin };
    })
  );

  setTagSearch("");
};
