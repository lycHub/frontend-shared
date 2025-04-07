import { renderToPipeableStream } from "react-dom/server";
import ServerApp from "./ServerApp";

export function render({
  originalUrl,
  loadedData,
  onShellReady,
  onShellError,
  onAllReady,
}) {
  const { pipe, abort } = renderToPipeableStream(
    <ServerApp loadedData={loadedData} />,
    {
      bootstrapModules: ["./entry-client.tsx"],
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
