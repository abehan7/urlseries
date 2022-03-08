import React, { useState, useEffect } from "react";

const InfiniteScroll = ({ children, getNextItems, target }) => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [thresholdReached, setThresholdReached] = useState(false);

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !loading) {
      observer.unobserve(entry.target);

      await getNextItems();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.5,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, getNextItems]);

  return (
    <div>
      {children}
      {loading && <div>Loading...</div>}
      {!loading && hasMore && <div>No more items</div>}
    </div>
  );
};
