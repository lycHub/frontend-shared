import { use } from "react";
import { Link } from "react-router";

function BreedList({ dataPromise }) {
  const list = use(dataPromise);
  // console.log("list>>>>", list);
  return (
    <div className="breed-list">
      <h3>breed-list:</h3>
      <ul>
        {(list?.data || []).map((item) => (
          <li key={item.id}>
            <Link to={`/breeds/${item.id}`}>{item.attributes.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BreedList;
