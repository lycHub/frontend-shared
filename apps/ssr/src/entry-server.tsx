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
  const { pipe, abort } = renderToPipeableStream(
    <ServerApp htmlStr={htmlStr} loadedData={loadedData} />,
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
  return { pipe, abort };
}
