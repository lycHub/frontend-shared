import { StrictMode } from "react";
import parse from "html-react-parser";
import App from "./App";
import { preLoadStore } from "./store/preload.store";

export default function ServerApp({ htmlStr, loadedData }) {
  preLoadStore.setState((state) => {
    return {
      ...state,
      data: loadedData,
    };
  });

  // todo:  ejs生成？
  const renderContent = () => {
    const res = parse(htmlStr, {
      replace(domNode) {
        if (domNode?.data === "ssr-outlet") {
          return (
            <div id="root">
              <StrictMode>
                <App />
              </StrictMode>
            </div>
          );
        }
      },
    });
    // console.log('htmlStr>>>', htmlStr);
    return res;
  };
  return renderContent();
}
