import { useState, useCallback } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";
import ItemContainer from "../components/UrlContainer/ItemContainer";
import urls from "../data/urls.json";
import SearchBar from "../components/SearchBar/SearchBar";
import { KeywordNormalize, SearchNotByDB } from "../components/Utils/Search";
import NoUrl from "../components/UrlContainer/NoUrl";
import LoadingCenter from "../components/Utils/Loader/LoaderCenter";
import { useEffect } from "react";
const SharePageEl = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  width: 50%;
`;
const debounceFn = debounce((fn, keyword) => fn(keyword), 400);

const SharePage = () => {
  const { folder_id } = useParams();
  const [keyword, setKeyword] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [filterdUrls, setFilterdUrls] = useState([]);
  const folderUrls = urls;

  const isSearch = keyword.length > 0;
  //   const onChange = (e) => setKeyword(e.target.value);
  const _getFilterdUrls = useCallback(
    (keyword) => {
      const pKeyword = KeywordNormalize(keyword);
      const filterd = SearchNotByDB(pKeyword, folderUrls);
      setFilterdUrls(filterd);
      setIsSearchLoading(false);
    },
    [folderUrls, filterdUrls]
  );
  const onChange = async (e) => {
    debounceFn.cancel();
    setIsSearchLoading(true);
    const _keyword = e.target.value;
    setKeyword(_keyword);
    e.target.value.length > 0 && (await debounceFn(_getFilterdUrls, _keyword));
  };

  //검색창에 북마크 없을 때
  const SearchNoUrl = () =>
    isSearch && !isSearchLoading && filterdUrls.length === 0 && <NoUrl />;

  //검색중일 때 로딩창
  const SearchLoader = () => isSearch && isSearchLoading && <LoadingCenter />;

  //전체 북마크
  const TotalUrlMap = () => !isSearch && <ItemContainer urls={folderUrls} />;

  //검색 북마크
  const SearchUrlMap = () => isSearch && <ItemContainer urls={filterdUrls} />;

  useEffect(() => setFilterdUrls([]), [keyword]);
  return (
    <SharePageEl>
      <Wrapper>
        <SearchBar keyword={keyword} onChange={onChange} />
        {SearchNoUrl()}
        {TotalUrlMap()}
        {SearchLoader()}
        {SearchUrlMap()}
      </Wrapper>
    </SharePageEl>
  );
};

export default SharePage;
