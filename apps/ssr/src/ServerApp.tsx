import { StrictMode } from "react";
import parse from 'html-react-parser';
import App from "./App";

export default function ServerApp({ htmlStr, loadedData }) {
  // todo:  ejs生成？
  const renderContent = () => {
    const res = parse(htmlStr, {
      replace(domNode) {
        if (domNode?.data === 'ssr-outlet') {
          return <div id="root"><StrictMode><App loadedData={loadedData} /></StrictMode></div>
        }
      },
    });
    // console.log('htmlStr>>>', htmlStr);
    return res;
  }
  return renderContent()
}

