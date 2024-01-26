import styles from "./Store.module.scss";
import { useState } from "react";
import TopUserBalance from "../TopUserBalance";
import TopNavigation from "../TopNavigation";

import xcbmIconImg from "../../assets/img/xcbm-icon.png";
import mineralIconImg from "../../assets/img/mineral-icon.png";
import mineralIconImg2 from "../../assets/img/mineral-icon2.png";
import mineralIconImg3 from "../../assets/img/mineral-icon3.png";

const BuyFooter = () => {
  return (
    <div className={styles.list}>
      {[1, 2, 3, 4].map((item, index) => (
        <div className={styles.foot_item}>
          <div className={styles.icon_wrap}>
            <img src={mineralIconImg2} alt="" />
          </div>
          <div className={styles.currency}>
            <div className={styles.currency_icon_wrap}>
              <img src={xcbmIconImg} alt="" />
            </div>
            <div className={styles.currency_nums}>x 1</div>
          </div>
          <div className={styles.recover}>
            <div className={styles.recover_item}></div>
            <div className={styles.recover_item}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const BuyPet = () => {
  return (
    <div className={styles.list}>
      {[1, 2, 3, 4].map((item, index) => (
        <div className={styles.pet_item}>
          <div className={styles.icon_wrap}>
            <img src={mineralIconImg2} alt="" />
          </div>
          <div className={styles.currency}>
            <div className={styles.currency_icon_wrap}>
              <img src={xcbmIconImg} alt="" />
            </div>
            <div className={styles.currency_nums}>x 1</div>
          </div>
          {/* <div className={styles.recover}>
            <div className={styles.recover_item}></div>
            <div className={styles.recover_item}></div>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default function Store() {
  const [tabsList, _] = useState([
    {
      label: "Buy Foot",
      children: <BuyFooter />,
    },
    {
      label: "Buy Pet",
      children: <BuyPet />,
    },
  ]);
  const [tabsActiveIndex, setTabActiveIndex] = useState(0);

  return (
    <div className={styles.store}>
      <TopUserBalance />
      <div className={styles.store_container}>
        <div className={styles.tabs_list}>
          {tabsList.map((item, index) => (
            <div
              className={`${styles.tabs_item} ${
                tabsActiveIndex === index ? styles.tabs_item__active : ""
              }`}
              onClick={() => setTabActiveIndex(index)}
            >
              {item.label}
            </div>
          ))}
        </div>
        <div className={styles.tabs_content}>
          {tabsList[tabsActiveIndex].children}
        </div>
      </div>
    </div>
  );
}
