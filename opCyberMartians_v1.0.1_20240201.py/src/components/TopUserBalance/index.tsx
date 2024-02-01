import styles from "./TopUserBalance.module.scss";

import walletIconImg from "../../assets/img/wallet-icon.png";
import btcIconImg from "../../assets/img/btc-icon.png";
import xcbmIconImg from "../../assets/img/xcbm-icon.png";

export default function TopUserBalance() {
  return (
    <div className={styles.top_user_balance}>
      <div className={styles.left}>
        <div className={styles.balance_item}>
          <div className={styles.balance_item__icon}>
            <img src={btcIconImg} alt="" />
          </div>
          <div className={styles.balance_item__info}>
            <div className={styles.balance_item__info__number}>0</div>
            <div className={styles.balance_item__info__dollar}>$0</div>
          </div>
        </div>
        <div className={styles.balance_item}>
          <div className={styles.balance_item__icon}>
            <img src={xcbmIconImg} alt="" />
          </div>
          <div className={styles.balance_item__info}>
            <div className={styles.balance_item__info__number}>0</div>
            <div className={styles.balance_item__info__dollar}>$0</div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wallet_wrap}>
          <img src={walletIconImg} alt="" />
          <span>My wallet</span>
        </div>
      </div>
    </div>
  );
}
