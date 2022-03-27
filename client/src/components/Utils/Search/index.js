// FIXME: 키워드 정규화
export const KeywordNormalize = (keyword) => {
  const proccecced = keyword?.toLowerCase()?.replace(/(\s*)/g, "") || "";
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
  return Filterd;
};

// FIXME: 폴더 필터링
const FolderNameFilter = (folder, PKeyword) => {
  return KeywordNormalize(folder.folder_name).includes(PKeyword);
};

const FolderMomoFilter = (folder, PKeyword) => {
  return KeywordNormalize(folder?.folder_memo)?.includes(PKeyword);
};

export const SearchFolderNotByDB = (PKeyword, totalFolder) => {
  const isContained = (folder) =>
    FolderNameFilter(folder, PKeyword) || FolderMomoFilter(folder, PKeyword);
  const filterd = totalFolder.filter((folder) => isContained(folder));
  return filterd;
};

// FIXME: 최근 방문한 URL검색
const UrlFilter = (url, PKeyword) => {
  return KeywordNormalize(url.url).includes(PKeyword);
};

export const SearchUrlHistoryNotByDB = (PKeyword, totalUrl) => {
  const Filterd = totalUrl.filter((url) => {
    return TitleFilter(url, PKeyword) || UrlFilter(url, PKeyword);
  });
  return Filterd;
};
