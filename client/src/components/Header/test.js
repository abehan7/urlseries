(() => {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("overlay");
  let open = false;

  const change = () => {
    if (!open) {
      hamburger.classList.add("open");
      menu.classList.add("menu");
    } else {
      hamburger.classList.remove("open");
      menu.classList.remove("menu");
    }
    open = !open;
  };

  hamburger.addEventListener("click", change);
})();
