import styles from "./TopUserInfo.module.scss";

import userAvatarImg from "../../assets/img/user-avatar1.png";
import mineralIconImg from "../../assets/img/mineral-icon.png";
import { useMemo } from "react";
import { useUser } from "../../hook";

export default function TopUserInfo() {
  const { user } = useUser();

  const mineralNum = useMemo(() => {
    return Number(Number(user?.mineralNum).toFixed(4));
  }, [user]);

  return (
    user && (
      <div className={styles.top_user_info}>
        <div className={styles.left}>
          <div className={styles.user_avatar}>
            <img src={user?.avatar} alt="" />
          </div>
          <div className={styles.user_info}>
            <div className={styles.user_info__name}>{user?.twitterName}</div>
            <div className={styles.user_info__id}>@{user?.twitterUserName}</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.mineral}>
            <div className={styles.mineral_icon}>
              <img src={mineralIconImg} alt="" />
            </div>
            <div className={styles.mineral_num}>{mineralNum || "0"}</div>
          </div>
        </div>
      </div>
    )
  );
}
