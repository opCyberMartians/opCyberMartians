import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ConfigProvider, Popover } from "antd";
import { useContext, useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { formatWalletAddress, messageOpen } from "../../utils/common";
import AppContext from "../Contexts/Context";
import styles from "./Container.module.scss";
import dynamic from "next/dynamic";
import { DownOutlined } from "@ant-design/icons";
// Logo
const LogoBox = () => {
  return (
    <div className={styles.logo_box}>
      <img className={styles.logo_img} src={"/image/logo-img.png"} alt={""} />
      <img
        className={styles.logo_title}
        src={"/image/logo-title.png"}
        alt={""}
      />
      {/* <span>GoWrap</span> */}
    </div>
  );
};
// 站内导航
const LinkListBox = () => {
  const [currentId, setCurrentId] = useState<string>("");
  const linkList = [
    { name: "Home", id: "HOME" },
    { name: "about us", id: "AboutUs" },
    { name: "road map", id: "Roadmap" },
  ];
  const scrollTo = (id: string) => {
    if (!currentId) return;
    const element = document.getElementById(id)!;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  const onScroll = () => {
    linkList.forEach((item) => {
      let id = document.getElementById(item.id)!;
      if (!id) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const rect = id.getBoundingClientRect();
            const visibleHeight = window.innerHeight / 2; // 可见高度为视图高度的一半
            const elementTop = rect.top - visibleHeight; // 元素顶部距离视图顶部的距离
            const elementBottom = rect.bottom - visibleHeight; // 元素底部距离视图顶部
            const elementHeight = rect.height; // 元素的高度

            if (
              elementTop <= 0 &&
              elementBottom >= 0 &&
              elementHeight >= visibleHeight
            ) {
              setCurrentId(item.id);
            }
          }
        });
      });
      observer.observe(id);
    });
  };
  useEffect(() => {
    console.log("currentId", currentId);
  }, [currentId]);
  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, false);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div className={styles.link_list}>
      {linkList.map((item) => {
        return (
          <div
            key={item.name}
            className={styles.link_item}
            style={{ color: item.id == currentId ? "#30effc" : "" }}
            onClick={() => {
              scrollTo(item.id);
            }}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
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
              <img src={item.src} alt={""} width={24} height={24} />
            </div>
          </a>
        );
      })}
    </div>
  );
};
// 链接钱包
const ConnectWallet = () => {
  const appContext = useContext(AppContext);
  const { openConnectModal } = useConnectModal(); // 打开连接器弹框
  return (
    <div
      className={styles.wallet_but}
      onClick={() => {
        openConnectModal && openConnectModal();
      }}
    >
      {appContext.currentDevice == "mobile" ? "Connect" : "Connect Wallet"}
    </div>
  );
};
// 退出钱包
const ExitWallet = ({ address }: { address: `0x${string}` | undefined }) => {
  const { disconnect } = useDisconnect();

  return (
    <ConfigProvider
      theme={{
        token: {
          paddingSM: 0,
        },
      }}
    >
      <Popover
        // trigger={"click"}
        content={
          <div className={styles.popover_wrap}>
            <div
              className={styles.disconnect_but}
              onClick={() => {
                disconnect();
                let unisat = (window as any).unisat;
                if (!unisat) {
                  messageOpen.error('Kindly initiate the installation of the UniSat Wallet.');
                  return;
                }
                if (unisat._isConnected) unisat._pushEventHandlers.disconnect();
              }}
            >
              Disconnect
            </div>
          </div>
        }
        color={"#2f2f32"}
        placement="bottom"
        overlayInnerStyle={{ padding: 0 }}
        getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
      >
        <div className={styles.exit_wallet_but}>
          {formatWalletAddress(address!)}
        </div>
      </Popover>
    </ConfigProvider>
  );
};
const MyDynamicComponent = dynamic(() => Promise.resolve(ExitWallet), {
  ssr: false, // 禁用服务器端渲染
  loading: () => (
    <div className={styles.wallet_but} suppressHydrationWarning>
      Connet wallet
    </div>
  ),
});
const SelectWallet = () => {
  const appContext = useContext(AppContext);
  const { address: ETHAddress } = useAccount();
  const [UniSatAddress, setUniSatAddress] = useState();
  const [currentWallet, setCurrentWallet] = useState("opBNB");
  const handleChange = async (value: string) => {
    let unisat = (window as any).unisat;
    console.log(`selected ${value}`);
    if (value == "Bitcoin" && !unisat) {
      messageOpen.error('Kindly initiate the installation of the UniSat Wallet.');
      return;
    }
    if (value == "Bitcoin" && unisat._isConnected) {
      let UniSatAddress = await unisat.getAccounts();
      setUniSatAddress(UniSatAddress[0]);
    } else {
      setUniSatAddress(undefined);
    }
    setCurrentWallet(value);
  };
  useEffect(() => {
    let unisat = (window as any).unisat;
    if (!unisat) { return; }
    if (unisat) {
      unisat.on("accountsChanged", (account: any) => {
        setUniSatAddress(account[0] || "");
      });
    }

    return () => {
      if (unisat) {
        unisat.removeListener("accountsChanged", (account: any) => { });
        unisat.removeListener("networkChanged", (account: any) => { });
      };
    }
  }, []);
  useEffect(() => {
    if (appContext.currentDevice !== "desktop") setCurrentWallet("opBNB");
  }, [appContext.currentDevice]);
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            paddingSM: 0,
          },
        }}
      >
        <Popover
          // trigger={"click"}
          content={
            <div className={styles.popover_wrap}>
              <div
                className={styles.cut_wallet_but}
                onClick={() => {
                  handleChange("opBNB");
                }}
              >
                opBNB
              </div>
              <div
                className={styles.cut_wallet_but}
                onClick={() => {
                  handleChange("Bitcoin");
                }}
              >
                Bitcoin
              </div>
            </div>
          }
          color={"#2f2f32"}
          placement="bottom"
          overlayInnerStyle={{ padding: 0 }}
          getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
        >
          <div className={styles.select_wrap}>
            <span>{currentWallet}</span>
            <DownOutlined style={{ fontSize: "16rem", marginLeft: "5px" }} />
          </div>
        </Popover>
      </ConfigProvider>

      {currentWallet == "Bitcoin" && !UniSatAddress && <ConnectUniSatWallet />}
      {currentWallet == "opBNB" && !ETHAddress && <ConnectWallet />}
      {currentWallet == "Bitcoin" && UniSatAddress && (
        <MyDynamicComponent address={UniSatAddress} />
      )}
      {currentWallet == "opBNB" && ETHAddress && (
        <MyDynamicComponent address={ETHAddress} />
      )}
    </>
  );
};
const ConnectUniSatWallet = () => {
  const [address, setAddress] = useState("");
  const connectUniSat = async () => {
    let unisat = (window as any).unisat;
    if (!unisat) {
      messageOpen.error('Kindly initiate the installation of the UniSat Wallet.');
      return;
    }
    await unisat.requestAccounts();
    const [address] = await unisat.getAccounts();
    setAddress(address);
  };
  return (
    <div className={styles.wallet_but} onClick={connectUniSat}>
      {formatWalletAddress(address!) || "Connect Wallet"}
    </div>
  );
};

export const Header = () => {
  return (
    <div className={styles.header_wrap}>
      <div className={styles.header_box}>
        <LogoBox />
        <LinkListBox />
        <OuterListBox />
        <SelectWallet />
      </div>
    </div>
  );
};
