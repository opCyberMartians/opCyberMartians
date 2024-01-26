import styles from "./Home.module.scss";
import { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useUser } from "../../hook";
import { formatAddress } from "../../utils";

import logoImg from "../../assets/img/logo.png";
import walletIconImg from "../../assets/img/wallet-icon.png";
import btcIconImg from "../../assets/img/btc-icon.png";
import xcbmIconImg from "../../assets/img/xcbm-icon.png";
import miningImg from "../../assets/img/mining.gif";
import fieldBgImg from "../../assets/img/field-bg.png";
import fieldActiveBgImg from "../../assets/img/field-bg--active.png";
import developImg1 from "../../assets/img/develop-img1.png";
import developImg2 from "../../assets/img/develop-img2.png";

const UserInfo = () => {
  const { user } = useUser();

  return (
    <div className={styles.user_info}>
      <div className={styles.left}>
        <div className={styles.user_avatar}>
          <img src={user?.avatar} alt="" />
        </div>
        <div className={styles.user_text}>
          <div className={styles.user_name}>@{user?.twitterUserName}</div>
          <div className={styles.user_address}>
            {formatAddress(user?.address!)}
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
};

const Balance = () => {
  return (
    <div className={styles.balance}>
      <div className={styles.left}>
        <div className={styles.balance_item}>
          <div className={styles.balance_icon}>
            <img src={btcIconImg} alt="" />
          </div>
          <div className={styles.balance_info}>
            <div className={styles.balance__label}>{"BTC"}</div>
            <div className={styles.balance__number}>{"1,000"}</div>
            <div className={styles.balance__dollar}>{"$100.01"}</div>
          </div>
        </div>
        <div className={styles.balance_item}>
          <div className={styles.balance_icon}>
            <img src={xcbmIconImg} alt="" />
          </div>
          <div className={styles.balance_info}>
            <div className={styles.balance__label}>{"XCBM"}</div>
            <div className={styles.balance__number}>{"1,000"}</div>
            <div className={styles.balance__dollar}>{"$100.01"}</div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <Button className={styles.claim_btn}>Claim</Button>
      </div>
    </div>
  );
};

const Output = () => {
  const [fieldList, setFieldList] = useState([
    {
      label: "矿场1",
    },
    {
      label: "矿场2",
    },
  ]);
  const [fieldActiveIndex, setFieldActiveIndex] = useState(0);
  return (
    <div className={styles.output}>
      <div className={styles.img_wrap}>
        <img src={miningImg} alt="" />
        <div className={styles.speed}>speed：0.4167</div>
        <div className={styles.booster}>Booster:0.1696/h</div>
        <div className={styles.field_list}>
          {fieldList.map((item, index) => (
            <div
              style={{
                backgroundImage:
                  index === fieldActiveIndex
                    ? `url(${fieldActiveBgImg})`
                    : `url(${fieldBgImg})`,
              }}
              className={`${styles.field_item} ${
                index === fieldActiveIndex ? styles.field_item__active : ""
              }`}
              onClick={() => setFieldActiveIndex(index)}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Develop = () => {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const [developList, setDevelopList] = useState([
    {
      label: "能源工厂1",
      imgUrl: developImg1,
      claimed: false,
      level: 0,
    },
    {
      label: "能源工厂2",
      imgUrl: developImg2,
      claimed: true,
      level: 2,
    },
  ]);
  const [developActiveIndex, setDevelopActiveIndex] = useState(0);

  const details = useMemo(
    () => developList[developActiveIndex],
    [developList, developActiveIndex]
  );

  return (
    <div className={styles.develop}>
      <div className={styles.develop__details}>
        <div className={styles.left_img_wrap}>
          <img src={details.imgUrl} alt="" />
          <div className={styles.level}>Lv 1</div>
          <div className={styles.speed}>0.22/h</div>
        </div>
        {details.claimed && (
          <div className={`${styles.right_info} ${styles.right_info__claimed}`}>
            <div className={styles.name}>{details.label}</div>
            <div className={styles.level_wrap}>
              {[1, 2, 3].map((item) => (
                <div
                  className={`${styles.level_item} ${
                    details.level >= item ? styles.level_item__active : ""
                  }`}
                ></div>
              ))}
            </div>

            <Button
              className={styles.claim_btn}
              onClick={() => setIsUpgradeModalOpen(true)}
            >
              Upgrade
            </Button>
          </div>
        )}
        {!details.claimed && (
          <div className={styles.right_info}>
            <div className={styles.name}>{details.label}</div>
            <Button className={styles.claim_btn}>Claim</Button>
          </div>
        )}
      </div>
      <div className={styles.develop_list}>
        {developList.map((item, index) => (
          <div
            className={`${styles.develop_item} ${
              developActiveIndex === index ? styles.develop_item__active : ""
            }`}
            onClick={() => setDevelopActiveIndex(index)}
          >
            <img src={item.imgUrl} alt="" />
          </div>
        ))}
      </div>

      <Modal
        title="Upgrade"
        width={426}
        open={isUpgradeModalOpen}
        onCancel={() => setIsUpgradeModalOpen(false)}
        centered={true}
        footer={null}
        className={`${styles.home_modal} ${styles.upgrade_modal}`}
      >
        <div className={styles.question_modal_container}>
          <div className={styles.left_img_wrap}>
            <img src={details.imgUrl} alt="" />
          </div>
          <div className={styles.right_info}>
            <div className={styles.name}>{details.label}</div>
            <div className={styles.level_wrap}>
              <span>Lv {details.level}</span>
              <ArrowRightOutlined />
              <span>Lv {details.level + 1}</span>
            </div>
            <div className={styles.cost_wrap}>
              <img className={styles.cost_icon} src={xcbmIconImg} alt="" />
              <span>x 10</span>
            </div>
            <Button className={styles.upgrade_btn}>Upgrade</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default function Home() {
  return (
    <div className={styles.home}>
      <UserInfo />
      <Balance />
      <Output />
      <Develop />
    </div>
  );
}
