import { useState } from "react";
import { useEffect } from "react";
import Loader from "../Utils/Loader/Loader";
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

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      if (urls.length === contentsNum) {
        return;
      }

      await getNextItems();

      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  useEffect(() => {
    // contentsNum !== 50 && setContentsNum(50);
  }, [filterdItems]);

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
