export const getTotalTags = (urls, initAssigned) => {
  let urls_name = [];
  let urls_tag = [];

  urls.forEach((url) => {
    url.url_hashTags.forEach((tag) => {
      if (!urls_name.includes(tag)) {
        urls_name.push(tag);
        if (initAssigned.includes(tag)) {
          urls_tag.push({ name: tag, assigned: 1, origin: 1 });
          console.log(tag);
        } else {
          urls_tag.push({ name: tag, assigned: 0, origin: 0 });
        }
      }
    });
  });

  console.log("메모");
  // console.log(urls_tag);
  //   if (urls_name!== )

  // 삭제
  // 아~ 무조껀 realTotalUrls에 있는 태그들만 따르면 되겠네
  // 삭제하면 realTotalUrls
  // console.log("여기는 태그 이름들");
  // console.log(urls_name);
  // console.log("여기는 assigned까지");
  // console.log(urls_tag);
  return urls_tag;
};

export const coverColor = (total_tag, assigned_tag) => {
  total_tag.forEach((val) => {
    if (assigned_tag.includes(val.name)) {
      val.assigned = 1;
      val.origin = 1;
    }
  });
  return total_tag;
};
