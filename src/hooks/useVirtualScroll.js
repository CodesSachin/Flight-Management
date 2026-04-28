import { useState, useRef, useCallback } from "react";

export const useVirtualScroll = (totalItems, itemHeight, visibleItems) => {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollRef = useRef(null);

  const visibleRange = {
    start: Math.floor(scrollTop / itemHeight),
    end: Math.floor(scrollTop / itemHeight) + visibleItems,
  };

  const scrollHandler = useCallback((e) => {
    const newScrollTop = e.target.scrollTop;
    setScrollTop(newScrollTop);
  }, []);

  return {
    scrollTop,
    visibleRange,
    scrollHandler,
    scrollRef,
  };
};

export default useVirtualScroll;
