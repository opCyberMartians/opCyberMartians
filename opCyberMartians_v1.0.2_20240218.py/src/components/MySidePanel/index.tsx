import { Button, Drawer, Space, Tooltip } from "antd";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useUser, useExtensionConfig } from "../../hook";
import styles from "./MySidePanel.module.scss";
import "../../styles/global.scss";
import "../../styles/font.scss";
import { message } from "antd";

import InitializeLoading from "../InitializeLoading";
import Login from "../Login";
import Home from "../Home";
import SimpleHome from "../SimpleHome";

import logoImg from "../../assets/img/logo.png";
import closeRightImg from "../../assets/img/close-right.png";
import homeIconImg from "../../assets/img/home-icon.png";
import questIconImg from "../../assets/img/quest-icon.png";
import storeIconImg from "../../assets/img/store-icon.png";

const getRightMargin = () => {
  const element = document.querySelector('div[data-testid="primaryColumn"]');
  if (element) {
    const rightMargin =
      document.documentElement.clientWidth -
      element.getBoundingClientRect().right;

    return rightMargin;
  }
  return 550;
};

export default function MySidePanel() {
  const [config, updatedConfig] = useExtensionConfig();
  const { logged, initialized } = useUser();
  const messageContainer = useRef(null);

  const [open, setOpen] = useState(config.twitterSidePanelExpanded);
  const [rightMargin, setRightMargin] = useState(0);

  const drawerWidth = useMemo(() => rightMargin, [rightMargin]);

  const handleToggleOpen = () => {
    const oldValue = open;
    // setOpen(!oldValue);
    updatedConfig({ ...config, twitterSidePanelExpanded: !oldValue });
  };

  useEffect(() => {
    setOpen(config.twitterSidePanelExpanded);
  }, [config.twitterSidePanelExpanded]);

  useEffect(() => {
    setRightMargin(getRightMargin());
  }, [open]);

  useEffect(() => {
    // 设置全局容器
    if (messageContainer?.current) {
      message.config({
        getContainer: () => messageContainer.current as unknown as HTMLElement,
        // top: window.innerHeight - 100,
        top: 15,
      });
    }
  }, [messageContainer]);

  return (
    <div className={styles.my_side_panel}>
      {!open && (
        <Tooltip
          title="Cybermartins"
          placement="left"
          arrow={false}
          destroyTooltipOnHide={true}
          overlayClassName={styles.custom_tooltip}
        >
          <div className={styles.inject_logo} onClick={handleToggleOpen}>
            <img src={logoImg} alt="" />
          </div>
        </Tooltip>
      )}
      <div
        className={`${styles.drawer} ${open ? styles.drawer__open : ""}`}
        style={{ width: drawerWidth }}
      >
        <div className={styles.drawer_content} ref={messageContainer}>
          <img
            className={styles.closeRight}
            src={closeRightImg}
            alt=""
            onClick={handleToggleOpen}
          />
          <InitializeLoading loading={!initialized}>
            {logged ? <SimpleHome /> : <Login />}
          </InitializeLoading>
        </div>
      </div>
    </div>
  );
}
