import { StrictMode } from "react";
import App from "./App";

export default function ServerApp({ loadedData }) {
  // todo: 可用html-react-parser读取index.html模板转成react node
  return (
    <html lang="zh-cn">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React + TS</title>
      </head>
      <body>
        <div id="root">
          <StrictMode>
            <App loadedData={loadedData} />
          </StrictMode>
        </div>
      </body>
    </html>
  );
}
