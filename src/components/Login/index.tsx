import { Button, Input } from "antd";
import styles from "./Login.module.scss";
import logoImg from "../../assets/img/logo.png";
import { useEffect, useState } from "react";
import TopUserInfo from "../TopUserInfo";
import TopNavigation from "../TopNavigation";
import { useUser, useExtensionConfig } from "../../hook";
import { twitterAuth, bindCode, bindWallet } from "../../api/user";
import { useMetaMask } from "../../hook";
// import { injectScript } from "../../utils/index";
// import { getToken } from "../../hook/useUser";

type SectionKeyKeys = "NotLogin" | "BindWallet" | "ImportCode" | "";
type SetSectionKey = React.Dispatch<React.SetStateAction<SectionKeyKeys>>;

const NotLogin = ({ setSectionKey }: { setSectionKey: SetSectionKey }) => {
  const [loginLoading, setLoginLoading] = useState(false);
  const handleSignIn = async () => {
    try {
      setLoginLoading(true);
      const url = await twitterAuth();
      window.location.replace(url);
      // setSectionKey("ImportCode");
    } catch (error) {
      setLoginLoading(false);
    }
  };

  return (
    <div className={styles.not_login}>
      <div className={styles.logo_wrap}>
        <img src={logoImg} alt="" />
      </div>
      <div className={styles.description}>Mining and earn on Twitter </div>
      <Button
        className={styles.login_btn}
        loading={loginLoading}
        onClick={handleSignIn}
      >
        Log in with Twitter
      </Button>
    </div>
  );
};

const ImportCode = ({
  logout,
  update,
}: {
  logout: () => Promise<void>;
  update: () => void;
}) => {
  const [code, setCode] = useState("");

  const onInputChange = (event: any) => {
    const value = event.target.value;
    setCode(value);
  };
  const handleProceed = async () => {
    await bindCode(code);
    update();
  };
  return (
    <div className={styles.import_code}>
      <TopUserInfo />
      <TopNavigation onBack={logout} backText="Lout Out" />
      <div className={styles.title}>Import land number</div>
      <div className={styles.description}>
        You need a land number to gain the rights to mine ore on Mars. If you
        don’t know how to get a land number, you can get it from the white paper
        or the official <a href="">Twitter profile</a>.
      </div>
      <div className={styles.input_wrap}>
        <Input className={styles.input} value={code} onChange={onInputChange} />
      </div>
      <Button className={styles.proceed_btn} onClick={handleProceed}>
        Next step
      </Button>
      {/* <Button type="text" className={styles.skip_btn}>
        Skip
      </Button> */}
    </div>
  );
};

const BindWallet = ({
  logout,
  update,
}: {
  logout: () => Promise<void>;
  update: () => void;
}) => {
  const [connectLoading, setConnectLoading] = useState(false);
  const { connect, signMessage } = useMetaMask();

  const handleConnect = async () => {
    try {
      setConnectLoading(true);
      const address = await connect();
      const { sign, signature } = await signMessage();
      // 接口--绑定钱包
      await bindWallet({ address, sign, signature });
      update();
    } catch (error) {
      console.error(error);
    } finally {
      setConnectLoading(false);
    }
  };

  return (
    <div className={styles.bind_wallet}>
      <TopUserInfo />
      <TopNavigation onBack={logout} backText="Lout Out" />
      <div className={styles.title}>Please bind your Wallet first</div>
      <div className={styles.description}>
        Please bind your wallet address first to ensure a complete gaming
        experience.
      </div>
      <Button
        id="Cybermartins_Cyber_Connect"
        className={styles.connect_btn}
        loading={connectLoading}
        onClick={handleConnect}
      >
        Connect wallet
      </Button>
      {/* <Button type="text" className={styles.skip_btn} onClick={handleSkip}>
        Skip
      </Button> */}
    </div>
  );
};

const Success = () => {
  return (
    <div className={styles.success}>
      <div className={styles.title}>Congratulation!</div>
      <div className={styles.description}>
        Congratulations on getting your gold miner.
      </div>
      <div className={styles.logo_wrap}>
        <img src={logoImg} alt="" />
      </div>

      <Button className={styles.go_home_btn}>Go to homepage</Button>
    </div>
  );
};

export default function Login() {
  const { token, user, updateUserInfo, initialized, logout, login } = useUser();
  const [sectionKey, setSectionKey] = useState<SectionKeyKeys>("");

  const handleLogout = async () => {
    await logout();
    setSectionKey("NotLogin");
  };

  useEffect(() => {
    if (!initialized) {
      return;
    }
    if (!token) {
      setSectionKey("NotLogin");
    } else if (!user?.inviteCode) {
      setSectionKey("ImportCode");
    } else if (!user?.address) {
      setSectionKey("BindWallet");
    } else {
      if (!user) {
        updateUserInfo();
      }
    }
  }, [token, user, initialized]);

  const update = () => {
    updateUserInfo();
    login();
  };

  return (
    <div className={styles.login}>
      {sectionKey === "NotLogin" && <NotLogin setSectionKey={setSectionKey} />}
      {sectionKey === "BindWallet" && (
        <BindWallet logout={handleLogout} update={update} />
      )}
      {sectionKey === "ImportCode" && (
        <ImportCode logout={handleLogout} update={update} />
      )}
      {/* <Success /> */}
    </div>
  );
}
