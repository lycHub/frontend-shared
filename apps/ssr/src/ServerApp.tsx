import { StrictMode } from "react";
import parse from "html-react-parser";
import App from "./App";
import { preLoadStore } from "./store/preload.store";
import { StaticRouter } from "react-router";

export default function ServerApp({ htmlStr, loadedData, originalUrl }) {
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
            <StaticRouter location={originalUrl}>
              <StrictMode>
                <App />
              </StrictMode>
            </StaticRouter>
          );
        }
      },
    });
    // console.log('htmlStr>>>', htmlStr);
    return res;
  };
  return renderContent();
}
