export const getTotalTags = (realTotalUrls, totalTags, setTotalTags) => {
  let urls_totaltags = [];
  let user_totaltags = [];
  realTotalUrls.forEach((url) => {
    url.url_hashTags.forEach((tag) => {
      if (!urls_totaltags.includes(tag)) {
        urls_totaltags.push(tag);
      }
    });
  });

  totalTags.forEach((url) => {});

  console.log("메모");
  //   if (urls_totaltags!== )

  // 삭제
  // 아~ 무조껀 realTotalUrls에 있는 태그들만 따르면 되겠네
  // 삭제하면 realTotalUrls
  console.log(urls_totaltags);
  return urls_totaltags;
};

export const assignedTags = (realTotalUrls) => {
  let assignedTags = [];
  realTotalUrls.forEach((url) => {});
};
