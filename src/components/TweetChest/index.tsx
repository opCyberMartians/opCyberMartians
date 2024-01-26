import styles from "./TweetChest.module.scss";
import mineralIconImg from "../../assets/img/mineral-icon.png";

export default function TweetChest() {
  return <img className={styles.chest_img} src={mineralIconImg} alt="" />;
}
