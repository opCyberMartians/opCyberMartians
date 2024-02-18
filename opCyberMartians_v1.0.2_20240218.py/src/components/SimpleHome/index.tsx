import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import styles from "./SimpleHome.module.scss";
import TopUserInfo from "../TopUserInfo";
import { Button, Modal, message } from "antd";
import { QuestionCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useUser, useCave, useInviteCode, useMetaMask } from "../../hook";
import InitializeLoading from "../InitializeLoading";
import TopNavigation from "../TopNavigation";
import Attendance from "../Attendance";
import { getSignInWeeks } from "../../api/user";

import { formatMillisecondsToTime2, copy } from "../../utils";

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
      //最大挖矿毫秒
      const maxMinuteTime = 12 * 3600000;
      //当前挖矿数 1秒 0.0234
      let mineralNum = ((timestamp - item.startProductionTime) / 1000) * 0.0234;
      mineralNum = Math.min(maxMineralNum, Number(mineralNum.toFixed(4)));
      mineralNum = mineralNum < 0 ? 0 : mineralNum;
      //已挖矿多少分钟
      const mineralMinuteTime = formatMillisecondsToTime2(
        Math.min(timestamp - item.startProductionTime, maxMinuteTime)
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
      <InitializeLoading loading={!formatCavesList.length}>
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
                  <div className={styles.output_info__num}>
                    {item.mineralNum}
                  </div>
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
                    <Button
                      onClick={handleRedeem}
                      className={styles.output_btn}
                    >
                      Exchange
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </InitializeLoading>
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

const WeeksNumber = [10, 15, 20, 30, 40, 50, 100];
let _LoadingIndex: undefined | number = undefined;
let RefreshCountdown = 15;
const DailyAttendance = ({
  setSectionKeyOutput,
  updateUserInfo,
}: {
  setSectionKeyOutput: () => void;
  updateUserInfo: () => void;
}) => {
  const { contractAttendance } = useMetaMask();
  const [loadingIndex, setLoading] = useState<undefined | number>(undefined);
  const [days, setDays] = useState<any[]>([]);
  const [dayOfWeek, setDayOfWeek] = useState(0);

  const handleAttendance = async (item: any, index: number) => {
    if (
      dayOfWeek !== index ||
      Boolean(item.signedIn) === true ||
      loadingIndex !== undefined
    ) {
      return;
    }
    try {
      setLoading(index);
      _LoadingIndex = index;
      await contractAttendance();
      setTimeout(() => {
        refresh();
      }, 2000);
    } catch (error) {
      console.error(error);
      setLoading(undefined);
      _LoadingIndex = undefined;
    }
  };

  const refresh = () => {
    if (RefreshCountdown > 0) {
      RefreshCountdown -= 1;
      updateUserInfo();
      updateSignInWeeks();
      setTimeout(() => {
        refresh();
      }, 2000);
    } else {
      RefreshCountdown = 15;
    }
  };

  const updateSignInWeeks = () => {
    getSignInWeeks().then((res) => {
      const _list = res.map((item: any, index: number) => ({
        label: `${index + 1} Day`,
        num: WeeksNumber[index],
        signedIn: item,
      }));
      setDays(_list);
      if (_LoadingIndex !== undefined) {
        const _item = _list[_LoadingIndex];
        console.log(_item);
        if (_item?.signedIn) {
          setLoading(undefined);
          _LoadingIndex = undefined;
          RefreshCountdown = 0;
        }
      }
    });
  };

  useEffect(() => {
    updateSignInWeeks();
    const today = new Date();
    let dayOfWeek = today.getDay();
    // ['周日', '周一', '周二',...]
    // 下标转
    // ['周一', '周二',..., '周日']
    dayOfWeek = dayOfWeek - 1 < 0 ? 6 : dayOfWeek - 1;
    setDayOfWeek(dayOfWeek);
  }, []);

  return (
    <div className={styles.daily_attendance}>
      <TopNavigation backText="Back" onBack={setSectionKeyOutput} />
      <InitializeLoading loading={!days.length}>
        <div className={styles.days_list}>
          {days.map((item, index) => (
            <div
              className={`${styles.days_item} ${
                item.signedIn ? styles.days_item__done : ""
              } ${loadingIndex === index ? styles.days_item__loading : ""} ${
                index < dayOfWeek ? styles.days_item__pass : ""
              }`}
              style={{ backgroundImage: `url(${dailyAttendanceBgImg})` }}
              onClick={() => handleAttendance(item, index)}
            >
              <div className={styles.title}>{item.label}</div>
              <div className={styles.content}>
                <div className={styles.nums}>+{item.num}</div>
                <img
                  className={styles.done_img}
                  src={dailyAttendanceDoneIconImg}
                  alt=""
                />
                {loadingIndex === index && (
                  <div className={styles.loading_wrap}>
                    <LoadingOutlined
                      style={{ fontSize: "40px", color: "#fff" }}
                    />
                  </div>
                )}
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
