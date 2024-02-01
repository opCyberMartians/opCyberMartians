import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import AppContext from "../Contexts/Context";
import styles from "./Container.module.scss";
// Logo
const LogoBox = () => {
  const [isMobile, setIsMobile] = useState(false);
  const appContext = useContext(AppContext);
  useEffect(() => {
    setIsMobile(appContext.currentDevice !== "desktop" ? true : false);
  }, [appContext.currentDevice]);
  return (
    <div className={styles.logo_box}>
      <img
        className={styles.logo_title}
        src={"/image/logo-title.png"}
        alt={""}
      />
    </div>
  );
};
// 站内导航
const Copyright = () => {
  return <div className={styles.copyright}>COPYRIGHT2023</div>;
};
// 外部导航
const OuterListBox = () => {
  const linkList = [
    { src: "/image/discord.png", href: "/" },
    { src: "/image/twitter.png", href: "https://twitter.com/opCyberMartians" },
  ];
  return (
    <div className={styles.outer_list}>
      {linkList.map((item) => {
        return (
          <a key={item.src} href={item.href}>
            <div className={styles.outer_box}>
              <Image src={item.src} alt={""} width={24} height={24} />
            </div>
          </a>
        );
      })}
    </div>
  );
};
export const Footer = () => {
  return (
    <div className={styles.footer_wrap}>
      <div className={styles.footer_box}>
        <LogoBox />
        <OuterListBox />
      </div>
    </div>
  );
};
