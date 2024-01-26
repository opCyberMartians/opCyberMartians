import styles from "./Attendance.module.scss";
import attendanceIconImg from "../../assets/img/attendance-icon.png";

export default function Attendance({ onClick }: { onClick?: () => void }) {
  return (
    <div className={styles.attendance} onClick={() => onClick && onClick()}>
      <div className={styles.attendance_icon_wrap}>
        <img src={attendanceIconImg} alt="" />
      </div>
      <div className={styles.attendance_text}>{"签到"}</div>
    </div>
  );
}
