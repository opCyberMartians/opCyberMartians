import styles from "./ComingSoon.module.scss";
import mining from "../../assets/img/mining.gif";

export default function ComingSoon() {
  return (
    <div className={styles.ComingSoon}>
      <div className={styles.title}>
        Cybermartians will soon go online, please follow the official{" "}
        <a
          target="_blank"
          href="https://twitter.com/CyberMartiansio"
          rel="noreferrer"
        >
          Twitter
        </a>
        , the first time to get the progress of the game and project IDO.
      </div>
      <div className={styles.img_wrap}>
        <img src={mining} alt="" />
      </div>
      <div className={styles.btn}>Coming Soon</div>
    </div>
  );
}
