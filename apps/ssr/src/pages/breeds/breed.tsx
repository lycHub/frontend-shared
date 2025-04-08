import { preLoadStore } from "../../store/preload.store";
import { useStore } from "@tanstack/react-store";
import axios from "axios";
import { Suspense, useMemo } from "react";
import BreedDetail from "./breed-detail";
import { useParams } from "react-router";
import { normalizePath } from "../../utils/path";

const requestData = (id: string) => {
  return axios.get("/api/breeds/" + id).then((res) => res.data);
};

const isSsr = import.meta.env.SSR;

function Breed() {
  const { id } = useParams();
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
    : requestData(id || "");

  return (
    <Suspense fallback={<p>waiting for breed...</p>}>
      <BreedDetail dataPromise={dataPromise} />
    </Suspense>
  );
}

export default Breed;
