import { preLoadStore } from "../../store/preload.store";
import { useStore } from "@tanstack/react-store";
import axios from "axios";
import BreedList from "./breed-list";
import { Suspense, useMemo } from "react";
import { normalizePath } from "../../utils/path";

const requestData = () => {
  return axios.get("/api/breeds").then((res) => res.data);
};
const isSsr = import.meta.env.SSR;
function Breeds() {
  const loadedData = useStore(preLoadStore, (state) => state.data) as Record<
    string,
    unknown
  >;

  // console.log({ loadedData });

  const pathname = isSsr ? "" : normalizePath(location.pathname);
  // console.log("object", pathname);

  const useData = useMemo(() => loadedData?.[pathname], [loadedData, pathname]);
  // console.log({ loadedData, pathname, isSsr });

  const dataPromise = useData
    ? Promise.resolve(useData)
    : isSsr
    ? Promise.resolve(true)
    : requestData();

  return (
    <Suspense fallback={<p>waiting for breeds...</p>}>
      <title>Breeds</title>
      <BreedList dataPromise={dataPromise} />
    </Suspense>
  );
}

export default Breeds;
