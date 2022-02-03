const modalCloseClickOutside = (e) => {
  const modals = document.querySelectorAll(".modal-overlay");
  let isContained = false;
  modals.forEach((modal) => {
    modal === e.target && (isContained = true);
  });
  return isContained;
};

export default modalCloseClickOutside;
