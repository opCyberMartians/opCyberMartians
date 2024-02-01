export const resize = () => {
  /**
   * 判断是否是手机
   */
  const isMobile = () => {
    return navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
  };
  // 根据分辨率 判断系统类型
  const onResize = () => {
    if (!document.hidden) {
      if (isMobile()) {
        document.documentElement.style.fontSize = `${100 / 375}vw`;
      } else {
        // document.documentElement.style.fontSize = `max( ${100 / 1920}vw, 1px )`;
        document.documentElement.style.fontSize = `${100 / 1920}vw`;
        // document.documentElement.style.fontSize = `1px`;
      }
    }
  };
  window.addEventListener("resize", onResize);
  onResize();
};
