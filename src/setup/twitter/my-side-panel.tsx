import _ from "lodash";
import MySidePanel from "../../components/MySidePanel";
import ReactDOM from "react-dom";

const selectors = [
  {
    type: "cybermartins-root",
    matchAll: false,
    isMatched: () =>
      !document?.querySelector(".cybermartins-root") &&
      document?.querySelector("main"),
    select: () => document?.querySelector("body"),
  },
];

export const injectReact = (
  content: React.ReactElement,
  target: ReactDOM.Container,
  opts?: { callback?: () => void; autoDestroy?: boolean }
) => {
  ReactDOM.render(content, target, opts?.callback);
};

const injectSidePanel = () => {
  for (const selector of selectors) {
    if (selector.isMatched && !selector.isMatched()) {
      continue;
    }
    const node = (() => {
      return selector.select();
    })();

    if (selector.type === "cybermartins-root") {
      const div = document.createElement("div");
      div.classList.add("cybermartins-root");
      injectReact(<MySidePanel />, div as HTMLDivElement);

      node?.appendChild(div);
    }
  }
};

const throttleInjectSidePanel = _.throttle(injectSidePanel, 1000);

export const setupTwitterSidePanel = async () => {
  injectSidePanel();

  const observer = new MutationObserver(() => {
    throttleInjectSidePanel();
  });

  observer.observe(document, {
    attributes: true,
    childList: true,
    subtree: true,
  });
};
