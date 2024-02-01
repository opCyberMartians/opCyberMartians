import _ from "lodash";
import ReactDOM from "react-dom";
import { getLogged } from "../../hook/useUser";

import TweetChest from "../../components/TweetChest";
import TweetChestOpen from "../../components/TweetChestOpen";

const TweetRecords = new Map();

const selectors = [
  {
    type: "tweet-primary-column",
    isMatched: () =>
      document.querySelector('div[data-testid="primaryColumn"]') &&
      window.location.href.includes("https://twitter.com/home") &&
      getLogged(),
    select: () => document.querySelectorAll('div[data-testid="cellInnerDiv"]'),
  },
  {
    type: "tweet-details",
    isMatched: () =>
      !window.location.href.includes("https://twitter.com/home") &&
      !document.querySelector(".cyber-chest-open") &&
      getLogged(),
    select: () => document.querySelectorAll('div[data-testid="cellInnerDiv"]'),
  },
];

export const injectReact = (
  content: React.ReactElement,
  target: ReactDOM.Container,
  opts?: { callback?: () => void; autoDestroy?: boolean }
) => {
  ReactDOM.render(content, target, opts?.callback);
};

const getRandomBoolean = () => {
  return Math.random() < 0.35;
};

const getUrlParams = (url: string) => {
  const arr = String(url).split("/");
  return {
    twitterId: arr[arr.length - 3],
    tweetId: arr[arr.length - 1],
  };
};

const injectTweetChest = () => {
  for (const selector of selectors) {
    if (selector.isMatched && !selector.isMatched()) {
      continue;
    }

    if (selector.type === "tweet-primary-column") {
      const nodeList = selector.select();
      nodeList.forEach((el, index) => {
        const targetDom = el.querySelector(
          'div[data-testid="Tweet-User-Avatar"]'
        );

        const userNameWrap = el.querySelector('div[data-testid="User-Name"]');
        const aList = userNameWrap?.querySelectorAll("a") || [];
        // length 2 为 AD
        if (aList.length !== 3) {
          return;
        }
        const { twitterId, tweetId } = getUrlParams(aList?.[2].href);

        if (!tweetId) {
          return;
        }

        const TweetObj = TweetRecords.get(tweetId);
        // 初次判断渲染 或者 已判断为生成盒子
        if (
          targetDom &&
          (!TweetRecords.has(tweetId) || TweetObj?.random) &&
          !targetDom.querySelector(".cyber-chest")
        ) {
          const random = TweetObj?.random ?? getRandomBoolean();
          TweetRecords.set(tweetId, {
            twitterId,
            tweetId,
            random,
          });
          if (random) {
            const newChild = document.createElement("div");
            newChild.classList.add("cyber-chest");
            injectReact(<TweetChest />, newChild as HTMLDivElement);
            targetDom.appendChild(newChild);
          }
        }
      });
    } else if (selector.type === "tweet-details") {
      const node = selector.select()?.[0];
      const progressBarEl = node?.querySelector(
        'div[data-testid="progressBar-bar"]'
      );
      const refChild = progressBarEl?.parentNode;
      const targetDom = refChild?.parentNode;
      const { twitterId, tweetId } = getUrlParams(window.location.href);
      if (!tweetId) {
        return;
      }
      const TweetObj = TweetRecords.get(tweetId);
      // 初次判断渲染 或者 已判断为生成盒子
      if (
        refChild &&
        targetDom &&
        (!TweetRecords.has(tweetId) || TweetObj?.random)
      ) {
        const random = TweetObj?.random ?? getRandomBoolean();
        TweetRecords.set(tweetId, {
          twitterId,
          tweetId,
          random,
        });
        if (random) {
          const newChild = document.createElement("div");
          newChild.classList.add("cyber-chest-open");
          injectReact(<TweetChestOpen />, newChild as HTMLDivElement);
          targetDom.insertBefore(newChild, refChild);
        }
      }
    }
  }
};

const throttleInjectTweetChest = _.throttle(injectTweetChest, 1000);

export const setupTweetChest = async () => {
  injectTweetChest();

  const observer = new MutationObserver(() => {
    throttleInjectTweetChest();
  });

  observer.observe(document, {
    attributes: true,
    childList: true,
    subtree: true,
  });
};
