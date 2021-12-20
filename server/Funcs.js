const getCurrentDate = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var today = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var milliseconds = date.getMilliseconds();
  return new Date(
    Date.UTC(year, month, today, hours, minutes, seconds, milliseconds)
  );
};

// ====================================================== USED IN "/test4Add" ======================================================
// which hashtag is missing it can find
const somethingIsNotMaching = (yourData, dbData) => {
  let missingTags = [];
  if (dbData.length !== yourData.url_hashTags.length) {
    console.log("something is not matching");
    let tagNames = [];

    dbData.forEach((tagName) => {
      tagNames.push(tagName.tag_name);
    });
    console.log("datas in db : ", tagNames);
    yourData.url_hashTags.forEach((addedTag) => {
      if (!tagNames.includes(addedTag)) {
        // console.log(addedTag);
        missingTags.push(addedTag);
      }
    });
    console.log("not matched tags :", missingTags);
  }

  return missingTags;
};

const difference = (A, B) => {
  const arrA = Array.isArray(A) ? A.map((x) => x.toString()) : [A.toString()];
  const arrB = Array.isArray(B) ? B.map((x) => x.toString()) : [B.toString()];

  const result = [];
  for (const p of arrA) {
    if (arrB.indexOf(p) === -1) {
      result.push(p);
    }
  }
  console.log("앞 Array에만 있는거 : ", result);

  return result;
};

module.exports = { getCurrentDate, somethingIsNotMaching, difference };
