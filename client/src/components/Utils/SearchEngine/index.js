export const setMetaTags = ({
  title = "urlseires",
  description = "북마크들을 정리할 수 있는 사이트입니다.",
  imageUrl = "%PUBLIC_URL%/favicon.ico",
}) => {
  document
    .querySelector('meta[property="og:title"]')
    .setAttribute("content", `${title}`);
  document
    .querySelector('meta[property="og:description"]')
    .setAttribute("content", description);
  document
    .querySelector('meta[property="og:image"]')
    .setAttribute("content", imageUrl);
  document
    .querySelector('meta[property="og:url"]')
    .setAttribute("content", window.location.href);
};
