import { useState } from "react";
import Loader from "../Utils/Loader/Loader";
import { InfiniteScroll } from "../Utils/InfiniteScroll/InfiniteScroll";
import Url from "./Url";
import { constants, useMode } from "../../contexts/ModeContext";
import { useUrl } from "../../contexts/UrlContext";
import { useEffect } from "react";

const ItemContainer = ({ urls }) => {
  const [contentsNum, setContentsNum] = useState(50);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteUrlIds, setDeleteUrlIds] = useState([]);
  const filterdItems = urls?.slice(0, contentsNum);
  const mode = useMode().mode;
  const handleClickStar = useUrl().handleClickStar;
  const handleSetCurrentUrl = useUrl().handleSetCurrentUrl;
  const deleteUrls = useUrl().url.deleteUrls;

  // const currentUrl = useUrl().currentUrl;
  // console.log("currentUrl from ItemContainer ", currentUrl);

  // 무한스크롤
  const getNextItems = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setContentsNum((num) => num + 100);
    setIsLoaded(false);
  };

  const stopCondition = urls.length === contentsNum;
  InfiniteScroll({ isLoaded, getNextItems, target, stopCondition });

  const normalClick = (url) => window.open(url.url);

  const editClick = (url) => {};
  //최대한 큰 범위를 넣는게 맞아 그래야 선택의 범위가 넓어져
  // 그냥 id만 가지는건 매핑해서 얻을 수 있지만
  // 아이디만 있는 경우에는 전체를 얻기위해서 복잡해서 이렇게 해야함

  const deleteClick = (url) => {
    deleteUrls.includes(url._id);
  };

  const onClickUrl = (url) => {
    constants.NORMAL === mode && normalClick(url);
    constants.EDIT === mode && editClick(url);
    constants.DELETE === mode && deleteClick(url);
  };

  const onClickStar = async (url) => {
    // console.log(url);
    handleSetCurrentUrl(url);

    url.url_likedUrl === 1 && setTimeout(() => handleClickStar(url._id), 200);
    url.url_likedUrl === 0 && handleClickStar(url._id);
    // handleClickStar(url._id);
  };

  useEffect(() => {
    const fn = () => {
      const _deleteUrlIds = deleteUrls.map((url) => url._id);
      setDeleteUrlIds(_deleteUrlIds);
    };
    mode === constants.DELETE && fn();
  }, [deleteUrls]);

  return filterdItems.map((url, index) => {
    if (index === contentsNum - 1)
      return <Loader key={"thisIsLoader"} target={setTarget} />;
    const onClick = () => onClickUrl(url);
    const _onClickStar = () => onClickStar(url);

    return (
      <Url
        item={url}
        url={url.url}
        title={url.url_title}
        key={url._id}
        id={url._id}
        index={index}
        totalUrlNum={urls.length}
        isLiked={url.url_likedUrl === 1}
        onClick={onClick}
        onClickStar={_onClickStar}
      />
    );
  });
};

export default ItemContainer;
