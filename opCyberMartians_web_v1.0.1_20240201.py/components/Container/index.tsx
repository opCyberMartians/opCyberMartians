import { Header } from "./Header";
import styles from "./Container.module.scss";
import { Footer } from "./Footer";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Contexts/Context";
import { Spin } from "antd";

export const Container = ({ children }: any) => {
  const appContext = useContext(AppContext);
  const [currentDevice, setCurrentDevice] = useState("desktop");
  const [loading, setLoading] = useState(true);
  const resizeDevice = () => {
    let isMobile = navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
    setCurrentDevice(isMobile ? "mobile" : "desktop");
    appContext.currentDevice = isMobile ? "mobile" : "desktop";
    setLoading(false);
  };
  useEffect(() => {
    resizeDevice();
    window.addEventListener("resize", resizeDevice);
    return () => {
      resizeDevice();
    };
  }, [currentDevice]);

  return (
    <>
      {loading ? (
        <Spin fullscreen />
      ) : (
        <div className={styles.container_wrap} is-device={currentDevice}>
          <Header />
          <div className={styles.content_wrap}>{children}</div>
          <Footer />
        </div>
      )}
    </>
  );
};
