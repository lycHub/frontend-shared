import { NavLink } from "react-router";

function Home() {
  return (
    <div className="home">
      Home
      <ul>
        <li>
          <NavLink to="./breeds">breeds</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Home;
