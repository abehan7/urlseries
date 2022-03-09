import { useState } from "react";
import Loader from "../Utils/Loader/Loader";
import { InfiniteScroll } from "../Utils/InfiniteScroll/InfiniteScroll";
import Url from "./Url";

const ItemContainer = ({ urls }) => {
  const [contentsNum, setContentsNum] = useState(50);
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const filterdItems = urls.slice(0, contentsNum);

  // 무한스크롤
  const getNextItems = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setContentsNum((num) => num + 100);
    setIsLoaded(false);
  };

  const stopCondition = urls.length === contentsNum;
  InfiniteScroll({ isLoaded, getNextItems, target, stopCondition });

  return filterdItems.map((url, index) => {
    if (index === contentsNum - 1)
      return <Loader key={"thisIsLoader"} target={setTarget} />;
    return (
      <Url
        url={url.url}
        title={url.url_title}
        key={url._id}
        id={url._id}
        index={index}
        totalUrlNum={urls.length}
      />
    );
  });
};

export default ItemContainer;
