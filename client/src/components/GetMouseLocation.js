const GetMouseLocation = (e) => {
  const circle = document.querySelector(".detail-container");
  // circle.style.display = "flex";

  const mouseX = e.clientX;
  const mouseY = e.pageY;
  // circle.style.left = 520 + "px";
  circle.style.left = mouseX + "px";
  // circle.style.top = 1142 + "px";
  circle.style.top = mouseY - 80 + "px";
};

export default GetMouseLocation;
