export const getTotalTags = (urls, initAssigned) => {
  let urls_name = [];
  let urls_tag = [];

  urls.forEach((url) => {
    url.url_hashTags.forEach((tag) => {
      if (!urls_name.includes(tag)) {
        urls_name.push(tag);
        if (initAssigned.includes(tag)) {
          urls_tag.push({ name: tag, assigned: 1, origin: 1 });
        } else {
          urls_tag.push({ name: tag, assigned: 0, origin: 0 });
        }
      }
    });
  });

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
