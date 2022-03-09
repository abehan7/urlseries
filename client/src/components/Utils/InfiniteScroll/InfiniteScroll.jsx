import { useEffect } from "react";

// 무한스크롤

export const InfiniteScroll = ({
  isLoaded,
  getNextItems,
  target,
  stopCondition,
}) => {
  // 무한스크롤

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      if (stopCondition) return;

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
};
