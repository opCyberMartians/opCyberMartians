import { Container } from "../components/Container";
import styles from "../styles/Home.module.scss";
import { useContext, useState } from "react";
import { ConfigProvider, Timeline } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import AppContext from "../components/Contexts/Context";
const Banner = () => {
  return (
    <div className={styles.banner_wrap} id="HOME">
      <img className={styles.home_banner} src="/image/home-banner.png" alt="" />
      <img className={styles.welding} src="/image/welding.png" alt="" />
      <img className={styles.spray1} src="/image/spray1.png" alt="" />
      <img className={styles.spray2} src="/image/spray2.png" alt="" />
      <img className={styles.action} src="/image/action.png" alt="" />
      <img className={styles.people1} src="/image/people1.png" alt="" />
      <img className={styles.people2} src="/image/people2.png" alt="" />
    </div>
  );
};
const AboutUs = () => {
  return (
    <div className={styles.about_us_wrap} id="AboutUs">
      <div className={styles.about_us_left}>
        <img src="/image/about_us.png" alt="" />
      </div>
      <div className={styles.about_us_right}>
        <div className={styles.about_us_title}>abOUT US</div>
        <div className={styles.about_us_describe}>
          {
            "opCyberMartians is the first X-social game on the opBNB blockchain, featuring innovative convergence with Brc20. Users can fully immerse themselves in an interactive gaming experience while earning a stable and sustainable income"
          }
        </div>
        <div className={styles.about_us_but_title}>Add to browse</div>
        <div className={styles.about_us_but_box}>
          <div
            className={styles.about_us_but}
            onClick={() => {
              window.open(
                "https://chromewebstore.google.com/detail/opcybermartins/pdemcchanejbcmjpdfpfcllnflhkkogb?hl=zh-CN&authuser=0&pli=1"
              );
            }}
          >
            <img src="/image/Chrome.png" alt="" />
            <span>Chrome</span>
          </div>
          <div
            className={styles.about_us_but}
            onClick={() => {
              window.open(
                "https://chromewebstore.google.com/detail/opcybermartins/pdemcchanejbcmjpdfpfcllnflhkkogb?hl=zh-CN&authuser=0&pli=1"
              );
            }}
          >
            <img src="/image/Edge.png" alt="" />
            <span>Edge</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const Carousel = () => {
  const [swiper, setSwiper] = useState<any>(null);
  const [selectIndex, setSelectIndex] = useState(0);

  const swiperParams = {
    spaceBetween: 10,
    loop: true,
  };
  const list = [
    {
      src: "/image/carousel-bg1.png",
      srcNoSelect: "/image/carousel-bg1-no-select.png",
      srcSelect: "/image/carousel-bg1-select.png",
    },
    {
      src: "/image/carousel-bg2.png",
      srcNoSelect: "/image/carousel-bg2-no-select.png",
      srcSelect: "/image/carousel-bg2-select.png",
    },
  ];
  const onSwiper = (e: any) => {
    setSwiper(e);
  };
  const onSlideChange = (e: any) => {
    setSelectIndex(e.realIndex);
  };
  const slideTo = (index: number) => {
    swiper.slideToLoop(index);
  };
  const slidePrev = () => {
    swiper.slidePrev();
    //  if (selectIndex > 0) {
    //   swiper.slidePrev();
    //   setSelectIndex((value) => value - 1);
    // }
  };
  const slideNext = () => {
    swiper.slideNext();
    // if (selectIndex < list.length - 1) {
    //   swiper.slideNext();
    //   setSelectIndex((value) => value + 1);
    // }
  };
  return (
    <div className={styles.carousel_wrap} id="Carousel">
      <div className={styles.carousel_bg}>
        <img src={list[selectIndex].src} alt="" />
      </div>
      <div className={styles.carousel_box}>
        <LeftCircleOutlined className={styles.LeftCircle} onClick={slidePrev} />
        <RightCircleOutlined
          className={styles.RightCircle}
          onClick={slideNext}
        />
        <Swiper
          {...swiperParams}
          onSlideChange={onSlideChange}
          onSwiper={onSwiper}
          className={styles.swiper_wrap}
        >
          {list.map((item, index) => (
            <SwiperSlide key={item.src + index}>
              <div className={styles.swiper_item}>
                <img src={item.src} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.swiper_item_text}>
          {
            "Amongst all of the fractions, a particular tribe stood out - they are known as the Cyber Martians. They identify themselves with their unique helmet which also equips them with special powers and abilities depending on the rarity. In all good conscience, they are believers of true"
          }
        </div>
        <div className={styles.customSwiperPagination}>
          {list.map((item, index) => (
            <div
              key={`customSwiperPagination-${index}`}
              onClick={() => slideTo(index)}
              className={`${styles.li} ${
                selectIndex === index ? styles.li__active : ""
              }`}
            >
              <img
                src={selectIndex === index ? item.srcSelect : item.srcNoSelect}
                alt=""
              />
              <span>{index == 2 ? "To be continued…" : `chapter${index}`}</span>
            </div>
          ))}
          <div className={styles.li}>
            <img src={"/image/carousel-bg-continue.png"} alt="" />
            <span>{"TO BE CONTINUED… "}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
const Roadmap = () => {
  const appContext = useContext(AppContext);
  return (
    <div className={styles.roadmap_warp} id="Roadmap">
      <div className={styles.roadmap_title}>roadmap</div>
      <ConfigProvider
        theme={{
          components: {
            Timeline: { tailColor: "#30EFFC", dotBg: "transparent" },
          },
        }}
      >
        <Timeline
          mode={appContext.currentDevice == "mobile" ? "left" : "alternate"}
          items={[
            {
              color: "#FFE924",
              dot: (
                <img
                  className={styles.dot_icon}
                  src="/image/dot-icon.png"
                  alt=""
                />
              ),
              children: <div style={{ paddingTop: "50px" }}></div>,
            },
            {
              color: "#FFE924",
              dot: (
                <img
                  className={styles.dot_icon}
                  src="/image/dot-icon.png"
                  alt=""
                />
              ),
              children: (
                <div className={styles.roadmap_children}>
                  <div className={styles.roadmap_children_title}>PhaSE 1</div>
                  <div className={styles.roadmap_children_description}>
                    {"🌟Art Conceptiualisation"}
                  </div>
                  <div className={styles.roadmap_children_description}>
                    {"🌟Roadshow in Madrid "}
                  </div>
                </div>
              ),
            },
            {
              color: "#FFE924",
              dot: (
                <img
                  className={styles.dot_icon}
                  src="/image/dot-icon.png"
                  alt=""
                />
              ),
              children: (
                <div className={styles.roadmap_children}>
                  <div className={styles.roadmap_children_title}>PhaSE 2</div>
                  <div className={styles.roadmap_children_description}>
                    {"🌟Collaboration & Funding"}
                  </div>
                  <div className={styles.roadmap_children_description}>
                    {"🌟Cybermartians Sneak-peak & showcase"}
                  </div>
                  <div className={styles.roadmap_children_description}>
                    {"🌟Community Building"}
                  </div>
                </div>
              ),
            },
            {
              color: "#FFE924",
              dot: (
                <img
                  className={styles.dot_icon}
                  src="/image/dot-icon.png"
                  alt=""
                />
              ),
              children: (
                <div className={styles.roadmap_children}>
                  <div className={styles.roadmap_children_title}>PhaSE 3</div>
                  <div className={styles.roadmap_children_description}>
                    {"🌟Launch Cybermartians SocialFi beta versio"}
                  </div>
                  <div className={styles.roadmap_children_description}>
                    {"🌟Integration on multiple broswer extensions"}
                  </div>
                  <div className={styles.roadmap_children_description}>
                    {
                      "🌟Embark on Bitcoin ecosystem & Launch BRC20 Community Token"
                    }
                  </div>
                </div>
              ),
            },
            {
              color: "#FFE924",
              dot: (
                <img
                  className={styles.dot_icon}
                  src="/image/dot-icon.png"
                  alt=""
                />
              ),
              children: (
                <div className={styles.roadmap_children}>
                  <div className={styles.roadmap_children_title}>PhaSE 4</div>
                  <div className={styles.roadmap_children_description}>
                    {"🌟Release public version of Cybermartians Socialfi Ver1"}
                  </div>
                  <div className={styles.roadmap_children_description}>
                    {
                      "🌟Release of detailed numerical data for energy mining gameplay"
                    }
                  </div>
                  <div className={styles.roadmap_children_description}>
                    {"🌟Collect feedbacks and address them"}
                  </div>
                </div>
              ),
            },
            {
              color: "#FFE924",
              dot: (
                <img
                  className={styles.dot_icon}
                  src="/image/dot-icon.png"
                  alt=""
                />
              ),
              children: (
                <div className={styles.roadmap_children}>
                  <div className={styles.roadmap_children_title}>PhaSE 5</div>
                  <div className={styles.roadmap_children_description}>
                    {
                      "🌟Engaging in communication and seeking cooperation with more blockchain foundations"
                    }
                  </div>
                  <div className={styles.roadmap_children_description}>
                    {"🌟Integrate with potential blockchain networks"}
                  </div>
                  <div className={styles.roadmap_children_description}>
                    {
                      "🌟Iterating on more gameplay mechanics and considering the possibility of issuing NFTs"
                    }
                  </div>
                </div>
              ),
            },
            {
              color: "#FFE924",
              dot: (
                <img
                  className={styles.dot_icon}
                  src="/image/dot-icon.png"
                  alt=""
                />
              ),
              children: (
                <div className={styles.roadmap_children}>
                  <div className={styles.roadmap_children_title}>PhaSE 6</div>
                  <div className={styles.roadmap_children_description}>
                    {
                      "🌟Cyber Martians Merchandise Drop Including Art Figurine Collectibles Collaboration with strong Web2 figurine brands/social media MCN"
                    }
                  </div>
                  <div className={styles.roadmap_children_description}>
                    {
                      "🌟Ultimately the goal is to set up Web3.0 Eco-Base that focus on Metaverse and Infrastructure layers in Ukraine to empower the Web3.0 communities there"
                    }
                  </div>
                  <div className={styles.roadmap_children_description}>
                    {
                      "🌟Cyber Martians Merchandise Drop Including Art Figurine Collectibles Collaboration with one of the most prominent blind-box TikTok account (Exclusive Benefits for Holders )"
                    }
                  </div>{" "}
                  <div className={styles.roadmap_children_description}>
                    {
                      "🌟Set up Web3.0 Eco-Base that focus on Metaverse and Infrastructure layers in Ukraine to empower the Web3.0 communities there."
                    }
                  </div>
                </div>
              ),
            },
            {
              color: "#FFE924",
              dot: (
                <img
                  className={styles.dot_icon}
                  src="/image/dot-icon.png"
                  alt=""
                />
              ),
              children: "",
            },
          ]}
        />
      </ConfigProvider>
    </div>
  );
};
const Home = () => {
  return (
    <Container>
      <Banner />
      <AboutUs />
      <Carousel />
      <Roadmap />
    </Container>
  );
};
export default Home;
