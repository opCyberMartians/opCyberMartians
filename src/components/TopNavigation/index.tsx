import styles from "./TopNavigation.module.scss";
import Back from "./back";

export default function TopNavigation({
  backText,
  children,
  onBack,
}: {
  backText?: string;
  children?: React.ReactNode;
  onBack?: () => void;
}) {
  return (
    <div className={styles.top_navigation}>
      <Back backText={backText} onBack={onBack} />
      <div className={styles.container}>{children}</div>
    </div>
  );
}
