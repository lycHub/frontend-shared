import { Suspense } from "react";
import Post from "./Post";

function App({ loadedData }) {
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
