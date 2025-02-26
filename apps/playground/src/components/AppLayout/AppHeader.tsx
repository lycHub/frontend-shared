import { NavLink } from "react-router";

function AppHeader() {
  return (
    <header className="app-header">
      <nav className="h-full">
        <NavLink className="nav-link" to="/" viewTransition>
          Play
        </NavLink>
      </nav>
    </header>
  );
}

AppHeader.displayName = "AppHeader";
export default AppHeader;
