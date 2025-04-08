import { Suspense } from "react";
import Post from "./Post";
import { preLoadStore } from "./store/preload.store";
import { useStore } from "@tanstack/react-store";

function App() {
  const loadedData = useStore(preLoadStore, (state) => state.data);
  // console.log({ loadedData });
  return (
    <div className="app" suppressHydrationWarning>
      <h1>Vite + React</h1>
      <Suspense fallback={<p>Loading Comments...</p>}>
        <Post loadedData={loadedData} />
      </Suspense>
    </div>
  );
}

export default App;
