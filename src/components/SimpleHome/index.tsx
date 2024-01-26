import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import styles from "./SimpleHome.module.scss";
import TopUserInfo from "../TopUserInfo";
import { Button, Modal, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useUser, useCave, useInviteCode, useMetaMask } from "../../hook";
import InitializeLoading from "../InitializeLoading";
import TopNavigation from "../TopNavigation";
import Attendance from "../Attendance";

import { formatMillisecondsToTime, copy } from "../../utils";

import miningImg from "../../assets/img/mining.gif";
import miningIconImg from "../../assets/img/mineral-icon.png";
import inviteCodeIconImg from "../../assets/img/invite-code-icon.png";
import copyIconImg from "../../assets/img/copy-icon.png";
import exclamationImg from "../../assets/img/exclamation.png";
import dailyAttendanceBgImg from "../../assets/img/daily-attendance-bg-img.png";
import dailyAttendanceDoneIconImg from "../../assets/img/daily-attendance-done-icon.png";

let RAF_ID = 0;
let TIMESTAMP = 0;
const Output = ({
  handleRedeem,
  updateUserInfo,
}: {
  handleRedeem: () => void;
  updateUserInfo: () => void;
}) => {
  const { caveList, claimCave } = useCave();
  const [timestamp, setTimestamp] = useState(new Date().getTime());
  const [claimLoading, setClaimLoading] = useState(false);

  const handleClaim = async (id: string) => {
    try {
      setClaimLoading(true);
      await claimCave(id);
      updateUserInfo();
      message.success("Success");
    } catch (error) {
      console.error(error);
    } finally {
      setClaimLoading(false);
    }
  };

  const formatCavesList = useMemo(() => {
    const _list = caveList.map((item, index) => {
      //最大挖矿数
      const maxMineralNum = 1008;
      //当前挖矿数 1秒 0.0234
      let mineralNum = ((timestamp - item.startProductionTime) / 1000) * 0.0234;
      mineralNum = Math.min(maxMineralNum, Number(mineralNum.toFixed(4)));
      mineralNum = mineralNum < 0 ? 0 : mineralNum;
      //已挖矿多少分钟
      const mineralMinuteTime = formatMillisecondsToTime(
        timestamp - item.startProductionTime
      );
      return {
        ...item,
        mineralNum,
        maxMineralNum,
        mineralProgress: mineralNum / maxMineralNum,
        mineralMinuteTime,
      };
    });

    return _list;
  }, [caveList, timestamp]);

  // 循环 每秒设置一次，促使页面更新
  const secondRefresh = useCallback(() => {
    const _t = new Date().getTime();
    if (_t - TIMESTAMP >= 1000) {
      TIMESTAMP = _t;
      setTimestamp(_t);
    }
    RAF_ID = requestAnimationFrame(secondRefresh);
  }, [timestamp]);

  useEffect(() => {
    if (RAF_ID === 0) {
      secondRefresh();
    }
    return () => {
      cancelAnimationFrame(RAF_ID);
      RAF_ID = 0;
    };
  }, []);

  return (
    <div className={styles.output}>
      <div className={styles.describe}>
        It is currently an early bird invitation event for Cybermartians.
        Participating in the early bird event can produce ores in advance, and
        gets a land number redemption function. Invite friends to pre-register
        now!
      </div>
      <div className={styles.img_wrap}>
        <img src={miningImg} alt="" />
      </div>
      <ul className={styles.output_list}>
        {formatCavesList.map((item, index) => {
          return (
            <li className={styles.output_item} key={item.id}>
              <div className={styles.output_icon}>
                <img src={miningIconImg} alt="" />
              </div>
              <div className={styles.output_info}>
                <div className={styles.output_info__title}>
                  Output to be claimed
                </div>
                <div className={styles.output_info__num}>{item.mineralNum}</div>
                <div className={styles.output_info__progress}>
                  <div className={styles.output_info__progress_wrap}>
                    <div
                      style={{
                        width: `${item.mineralProgress * 100}%`,
                        borderRight: item.mineralProgress === 1 ? "none" : "",
                      }}
                      className={styles.output_info__progress_wrap__fill}
                    ></div>
                  </div>
                  <div className={styles.output_info__progress_time}>
                    {item.mineralMinuteTime}
                  </div>
                </div>
                <div className={styles.output_info__operation}>
                  <Button
                    className={styles.output_btn}
                    onClick={() => handleClaim(item.id)}
                    loading={claimLoading}
                  >
                    {!claimLoading && "Claim"}
                  </Button>
                  <Button onClick={handleRedeem} className={styles.output_btn}>
                    Exchange
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Invite = ({
  setSectionKeyOutput,
  updateUserInfo,
}: {
  setSectionKeyOutput: () => void;
  updateUserInfo: () => void;
}) => {
  const { inviteCodes, buyInviteCodes } = useInviteCode();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [affirmLoading, setAffirmLoading] = useState(false);

  const inviteContainer = useRef(null);

  const onCancel = () => {
    setIsModalOpen(false);
  };
  const onResultCancel = () => {
    setIsResultModalOpen(false);
  };

  const handleBuy = () => {
    setIsModalOpen(true);
  };
  const handleAffirm = async () => {
    try {
      setAffirmLoading(true);
      await buyInviteCodes();
      buySuccessMessage();
      updateUserInfo();
      // setIsResultModalOpen(true);
    } catch (error) {
    } finally {
      setIsModalOpen(false);
      setAffirmLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    copy(text);
  };

  const handleBack = () => {
    setSectionKeyOutput();
  };

  const buySuccessMessage = () => {
    message.success("Success");
  };

  return (
    <div className={styles.invite} ref={inviteContainer}>
      <TopNavigation backText="Back" onBack={handleBack} />
      {/* <div className={styles.back} onClick={handleBack}>
        <LeftOutlined />
      </div> */}
      <InitializeLoading loading={!inviteCodes.length}>
        <ul className={`${styles.code_list}`}>
          {inviteCodes.map((item, index) => {
            return (
              <li className={styles.code_item} key={item.inviteCode}>
                <div className={styles.left}>
                  <div className={styles.code_item__icon}>
                    <img src={inviteCodeIconImg} alt="" />
                  </div>
                  <div className={styles.code_item__id}>{item.inviteCode}</div>
                </div>
                <div className={styles.right}>
                  <Button
                    disabled={item.used}
                    className={styles.code_copy_btn}
                    onClick={() => handleCopy(item.inviteCode)}
                  >
                    <img src={copyIconImg} alt="" /> Copy
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
        <Button className={styles.buy_btn} onClick={handleBuy}>
          Exchange
        </Button>
      </InitializeLoading>

      <Modal
        title="Exchange"
        width={426}
        open={isModalOpen}
        onCancel={onCancel}
        centered={true}
        footer={null}
        className={`${styles.simple_home_modal} ${styles.redeem_modal}`}
        // getContainer={() => inviteContainer.current as unknown as HTMLElement}
      >
        <div className={styles.redeem_modal__container}>
          <div className={styles.cost}>
            <div className={styles.cost_icon}>
              <img src={miningIconImg} alt="" />
            </div>
            <div className={styles.cost_num}>x 1800</div>
          </div>
          <div className={styles.title}>
            You will cost 1800 ores to exchange for a new land number.
          </div>
          <Button
            className={styles.confirm_btn}
            onClick={handleAffirm}
            loading={affirmLoading}
          >
            Confirm
          </Button>
        </div>
      </Modal>
      <Modal
        title="Exchange"
        width={426}
        open={isResultModalOpen}
        onCancel={onResultCancel}
        centered={true}
        footer={null}
        className={`${styles.simple_home_modal} ${styles.redeem_modal}`}
        // getContainer={() => inviteContainer.current as unknown as HTMLElement}
      >
        <div className={styles.redeem_modal__container}>
          <div className={styles.result}>
            <div className={styles.result_icon}>
              <img src={exclamationImg} alt="" />
            </div>
            <div className={styles.result_title}>已达到兑换上限</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const Question = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.question}>
      <QuestionCircleOutlined
        style={{ color: "#666666" }}
        onClick={showModal}
      />
      <Modal
        title="Gameplay Rule"
        width={640}
        open={isModalOpen}
        onCancel={onCancel}
        centered={true}
        footer={null}
        className={`${styles.simple_home_modal} ${styles.question_modal}`}
      >
        <p>
          1. Early bird invitation campaign is live now! You can mine ores,
          enjoy the game in advance and accumulate resources during this period.
        </p>
        <p>
          2. For new comers, Cybermartians will provide 5 land numbers for free
          to invite friends. (Each land number can only be used once.)
        </p>
        <p>
          3. During the early bird invitation period, players can mine ores and
          1008 ores can be produced in every 12 hours. The produced ore requires
          players to actively claim it.
        </p>
        <p>
          4. Players can convert Claim's ores into land numbers on the exchange
          interface. 1800 ores= A land number. This gives players another way to
          obtain land numbers.
        </p>
        <p>
          5. Importantly, the ores claimed and the invitation relationship
          established will be saved. Your efforts and gains during the early
          bird invitation period will be retained and applied after the game is
          officially launched.
        </p>
      </Modal>
    </div>
  );
};

const DailyAttendance = ({
  setSectionKeyOutput,
  updateUserInfo,
}: {
  setSectionKeyOutput: () => void;
  updateUserInfo: () => void;
}) => {
  const { contractAttendance } = useMetaMask();
  const [attendanceLoading, setAttendanceLoading] = useState(false);
  const [days, setDays] = useState<any[]>([1, 2, 3, 4]);

  const handleAttendance = async () => {
    try {
      setAttendanceLoading(true);
      await contractAttendance();
    } catch (error) {
      console.error(error);
    } finally {
      setAttendanceLoading(false);
    }
  };
  return (
    <div className={styles.daily_attendance}>
      <TopNavigation backText="Back" onBack={setSectionKeyOutput} />
      <InitializeLoading loading={!days.length}>
        <div className={styles.days_list}>
          {days.map((item, index) => (
            <div
              className={`${styles.days_item} ${
                index <= 1 ? styles.days_item__done : ""
              }`}
              style={{ backgroundImage: `url(${dailyAttendanceBgImg})` }}
              onClick={handleAttendance}
            >
              <div className={styles.title}>{`${index + 1}Day`}</div>
              <div className={styles.content}>
                {/* <div className={styles.img_wrap}>
                  <img src={miningIconImg} alt="" />
                </div> */}
                <div className={styles.nums}>+250</div>
                <img
                  className={styles.done_img}
                  src={dailyAttendanceDoneIconImg}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </InitializeLoading>
    </div>
  );
};

export default function SimpleHome() {
  const [sectionKey, setSectionKey] = useState<
    "Output" | "Invite" | "DailyAttendance"
  >("Output");

  const { user, updateUserInfo } = useUser();

  const handleRedeem = () => {
    setSectionKey("Invite");
  };

  const setSectionKeyOutput = () => {
    setSectionKey("Output");
  };

  return (
    <div className={styles.simple_home}>
      <InitializeLoading loading={!user}>
        <TopUserInfo />
        {sectionKey === "Output" && (
          <Attendance onClick={() => setSectionKey("DailyAttendance")} />
        )}
        <div className={styles.container}>
          <Question />
          {sectionKey === "Output" && (
            <Output
              handleRedeem={handleRedeem}
              updateUserInfo={updateUserInfo}
            />
          )}
          {sectionKey === "Invite" && (
            <Invite
              setSectionKeyOutput={setSectionKeyOutput}
              updateUserInfo={updateUserInfo}
            />
          )}
          {sectionKey === "DailyAttendance" && (
            <DailyAttendance
              setSectionKeyOutput={setSectionKeyOutput}
              updateUserInfo={updateUserInfo}
            />
          )}
        </div>
      </InitializeLoading>
    </div>
  );
}
