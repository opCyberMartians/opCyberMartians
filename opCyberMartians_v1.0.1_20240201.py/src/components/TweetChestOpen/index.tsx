import styles from "./TweetChestOpen.module.scss";
import { Button } from "antd";
import { useState } from "react";
import mineralIconImg from "../../assets/img/mineral-icon.png";

export default function TweetChestOpen() {
  const [state, setState] = useState<"notOpened" | "success" | "fail">(
    "notOpened"
  );
  const [openLoading, setOpenLoading] = useState(false);

  const sendMessage = () => {
    chrome.runtime.sendMessage({ method: "Cyber_Update_User" });
  };

  const handleOpen = () => {
    setOpenLoading(true);
    setTimeout(() => {
      setOpenLoading(false);
      setState("fail");
      sendMessage();
    }, 1000);
  };
  return (
    <div className={styles.tweet_chest_open}>
      <div className={styles.icon_wrap}>
        <img src={mineralIconImg} alt="" />
      </div>
      {state === "notOpened" && (
        <>
          <div className={styles.title}>Newbie Chest</div>
          <div className={styles.description}>
            Reply with any text greater than 16 characters and includes 'cyber'
            to open the chest
          </div>
          <Button
            className={styles.open_btn}
            onClick={handleOpen}
            loading={openLoading}
          >
            {!openLoading && "Open"}
          </Button>
        </>
      )}
      {state === "fail" && (
        <>
          <div className={styles.title}>Newbie Chest</div>
          <div className={styles.description}>
            Reply with any text greater than 16 characters and includes 'cyber'
            to open the chest
          </div>
          <Button className={styles.open_btn} loading={openLoading}>
            {!openLoading && "Open"}
          </Button>
          <div className={styles.fail_hint}>
            Reply with any text includes 'cyber' to open chest
          </div>
        </>
      )}
      {state === "success" && (
        <>
          <div className={styles.title}>Newbie Chest</div>
          <div className={styles.description}>
            You've acquired... Chests are scattered all overTwitter. Keep
            hunting for them every day!
          </div>
        </>
      )}
    </div>
  );
}
