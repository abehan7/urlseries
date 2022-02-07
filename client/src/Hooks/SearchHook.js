// FIXME: 키워드 정규화
export const KeywordNormalize = (keyword) => {
  const proccecced = keyword.toLowerCase().replace(/(\s*)/g, "");
  return proccecced;
};

// FIXME: DB없이 검색하기

// 타이틀필터
const TitleFilter = (url, PKeyword) => {
  return KeywordNormalize(url.url_title).includes(PKeyword);
};

// 해쉬태그
const HashTagFilter = (url, PKeyword) => {
  return url.url_hashTags.some((tag) => {
    return KeywordNormalize(tag).includes(PKeyword);
  });
};

// 메모필터
const MemoFilter = (url, PKeyword) => {
  return KeywordNormalize(url.url_memo).includes(PKeyword);
};

// 전체 필터링
export const SearchNotByDB = (PKeyword, totalUrl) => {
  const Filterd = totalUrl.filter((url) => {
    return (
      HashTagFilter(url, PKeyword) ||
      TitleFilter(url, PKeyword) ||
      MemoFilter(url, PKeyword)
    );
  });

  console.log(Filterd);

  return Filterd;
};
