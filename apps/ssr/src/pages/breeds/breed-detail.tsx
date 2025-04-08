import { use } from "react";

function BreedDetail({ dataPromise }) {
  const data = use(dataPromise);
  return (
    <div className="breed-detail">
      <h3>breed: {data?.data?.attributes?.name}</h3>
    </div>
  );
}

export default BreedDetail;
