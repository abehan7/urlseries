export const handleClickUrl = (url) => {
  window.open(url.url);
};

export const handleEditClick = (url) => {
  console.log("edit");
  const oneLineTags = url.url_hashTags.join("");
  document.querySelector(".editUrl-container").style.display = "block";
  document.querySelector(".editUrl-container .put-url > input").value = url.url;
  document.querySelector(".editUrl-container .put-title > input").value =
    url.url_title;
  document.querySelector(".editUrl-container .put-hashTag > input").value =
    oneLineTags;
  document.querySelector(".editUrl-container .put-memo > textarea").value =
    url.url_memo;
  document.querySelector(".url_id").innerText = url._id;
  document.querySelector(".url_likedUrl").innerText = url.url_likedUrl;
};
