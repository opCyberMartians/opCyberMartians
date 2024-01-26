import styles from "./TopNavigation.module.scss";
import backIconImg from "../../assets/img/back-icon.png";

export default function TopNavigationBack({
  backText,
  onBack,
}: {
  backText?: string;
  onBack?: () => void;
}) {
  const handleBack = () => {
    onBack && onBack();
  };
  return (
    <div className={styles.top_navigation_back} onClick={handleBack}>
      <img src={backIconImg} alt="" />
      <span>{backText}</span>
    </div>
  );
}
