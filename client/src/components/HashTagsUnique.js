const HashTagsUnique = (values) => {
  var hashList = [];
  values.forEach((value) => {
    // console.log(value.hashTags);
    value.hashTags.forEach((tag) => {
      // console.log(tag);
      if (!hashList.includes(tag)) {
        hashList.push(tag);
        // console.log(hashList);
      }
    });
  });
  return hashList;
};

export default HashTagsUnique;
