import { useState } from "react";
import styles from "./Quest.module.scss";
import { Button, Modal } from "antd";
import TopUserBalance from "../TopUserBalance";
import TopNavigation from "../TopNavigation";

import mineralIconImg from "../../assets/img/mineral-icon.png";
import successIconImg from "../../assets/img/success-icon.png";

type Tab = {
  label: string;
};

const QuestItem = ({ handleQuestClick }: { handleQuestClick: () => void }) => {
  return (
    <div className={styles.quest_item} onClick={handleQuestClick}>
      <div className={styles.info}>
        <div className={styles.left}>
          <div className={styles.icon_wrap}>
            <img src={mineralIconImg} alt="" />
          </div>
          <div className={styles.nums}>x 1</div>
        </div>
        <div className={styles.right_status}>Ongoing</div>
      </div>
      <div className={styles.title}>Newbie Quest</div>
      <div className={styles.description}>
        Complete Newbie Quest firstt to see other Quests
      </div>
    </div>
  );
};

// 任务详情
const QuestDetails = ({
  setQuestDetails,
}: {
  setQuestDetails: (details: any) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBack = () => {
    setQuestDetails(null);
  };

  return (
    <div className={styles.quest_details}>
      <TopNavigation backText="Newbie Quest" onBack={handleBack} />
      <div className={styles.quest_details__container}>
        <div className={styles.tasks_list}>
          {[1, 2, 3].map((item, index) => (
            <div className={styles.task_item}>
              <div className={styles.left}>
                <div className={styles.icon_wrap}></div>
                <div className={styles.title}>Like and retweet our tweet</div>
              </div>
              <div className={styles.right}>
                <Button
                  className={`${styles.task_btn} ${
                    index === 2 ? styles.task_btn__done : ""
                  }`}
                >
                  Go
                  {index === 2 && <img src={successIconImg} alt="" />}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.quest_details_reward}>
          <div className={styles.reward__label}>Reward</div>
          <div className={styles.reward__container}>
            <div className={styles.title}>Newbie Chest</div>
            <div className={styles.icon_wrap}>
              <img src={mineralIconImg} alt="" />
            </div>
            <Button
              className={styles.open_btn}
              onClick={() => setIsModalOpen(true)}
            >
              Open
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title="Open"
        width={426}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        centered={true}
        footer={null}
        className={`${styles.quest_modal} ${styles.open_modal}`}
      >
        <div className={styles.open_modal_container}>
          <div className={styles.img_wrap}>
            <img src={mineralIconImg} alt="" />
          </div>
          <div className={styles.title}>Open Newbie Chest Success</div>
          <div className={styles.description}>
            Congratulations, you have received: 100
          </div>
        </div>
      </Modal>
    </div>
  );
};

// 指引任务
const QuestGuide = ({
  setQuestDetails,
}: {
  setQuestDetails: (details: any) => void;
}) => {
  const handleBack = () => {
    setQuestDetails(null);
  };
  return (
    <div className={styles.quest_guide}>
      <TopNavigation backText="Newbie Quest" onBack={handleBack} />
      <div className={styles.quest_details_container}>
        <div className={styles.guide_container}>
          <div className={styles.input_wrap}>
            <div className={styles.text}>
              https://twitter.com/CyberMartiansio
            </div>
            <Button className={styles.suffix_btn}>Go</Button>
          </div>
          <div className={styles.guide_description}>
            Every day you can claim 2 Chests in our Twitter profile. Opening
            achest can bring you some SXPET or some good stuffs to take careof
            your pet
          </div>
        </div>
        <div className={styles.guide_reward}>
          <div className={styles.label}>Reward</div>
          <div className={styles.reward_list}>
            {[1, 2].map((item) => (
              <div className={styles.reward_item}>
                <img src={mineralIconImg} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Quest() {
  const [tabList, _] = useState<Tab[]>([
    {
      label: "Available Quests",
    },
    {
      label: "Done Quests",
    },
  ]);
  const [tabActiveIndex, setTabActiveIndex] = useState(0);
  const [questList, setQuestList] = useState([1, 2, 3]);
  const [questDetails, setQuestDetails] = useState<any>(null);

  const handleTabClick = (item: Tab, index: number) => {
    setTabActiveIndex(index);
  };
  const handleQuestClick = () => {
    setQuestDetails({});
  };
  return (
    <div className={styles.quest}>
      <TopUserBalance />
      <div className={styles.quest_container}>
        {questDetails ? (
          <QuestGuide setQuestDetails={setQuestDetails} />
        ) : (
          <>
            <div className={styles.quest_tabs}>
              {tabList.map((item, index) => (
                <div
                  className={`${styles.quest_tabs__item} ${
                    tabActiveIndex === index
                      ? styles.quest_tabs__item_active
                      : ""
                  }`}
                  onClick={() => handleTabClick(item, index)}
                >
                  {item.label}
                </div>
              ))}
            </div>
            <div className={styles.quest_list}>
              {questList.map((item, index) => (
                <QuestItem handleQuestClick={handleQuestClick} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
