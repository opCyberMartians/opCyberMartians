import { LoadingOutlined } from "@ant-design/icons";
import styles from "./InitializeLoading.module.scss";

export default function InitializeLoading({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {loading ? (
        <div className={styles.initialize_loading}>
          <LoadingOutlined style={{ fontSize: "36px" }} />
        </div>
      ) : (
        children
      )}
    </>
  );
}
