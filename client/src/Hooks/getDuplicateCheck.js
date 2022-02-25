export const duplicateUrlChecker = (duplicatedList) => {
  const filterd = [];

  const duplicateCheck = (url) => {
    const isDuplicated = filterd.some((filterdUrl) => {
      return url._id === filterdUrl._id;
    });
    return isDuplicated;
  };

  duplicatedList.forEach((url) => {
    !duplicateCheck(url) && filterd.push(url);
  });

  console.log("filterd", filterd);

  return filterd;
};
