import { renderToPipeableStream } from "react-dom/server";
import ServerApp from "./ServerApp";

export function render({
  originalUrl,
  htmlStr,
  loadedData,
  onShellReady,
  onShellError,
  onAllReady,
}) {
  return renderToPipeableStream(
    <ServerApp
      htmlStr={htmlStr}
      loadedData={loadedData}
      originalUrl={originalUrl}
    />,
    {
      // bootstrapModules: ["/src/entry-client.tsx"],
      bootstrapScriptContent: `window.__LOADED_STATE__ = ${JSON.stringify(
        loadedData
      )};`,
      onShellReady,
      onShellError,
      onAllReady,
    }
  );
}
