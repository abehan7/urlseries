import React, { useEffect, useState } from "react";
import HeaderNavV2 from "./HeaderNavV2";

const HeaderNavWrapper = () => {
  const [scrollFlag, setScrollFlag] = useState(false);

  const throttle = (callback, delay) => {
    let timer = null;
    if (timer) return;
    return () => {
      timer = setTimeout(() => {
        callback();
        timer = null;
      }, delay);
    };
  };

  const updateScroll = () => {
    const { scrollY } = window;
    const isScrolled = scrollY >= 145;
    setScrollFlag(isScrolled);
  };

  const handleScroll = throttle(updateScroll, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <>{scrollFlag && <HeaderNavV2 scrollFlag={scrollFlag} />}</>;
};

export default HeaderNavWrapper;
