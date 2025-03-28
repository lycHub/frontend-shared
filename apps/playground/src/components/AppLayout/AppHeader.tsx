import { NavLink } from "react-router";

function AppHeader() {
  return (
    <header className="app-header">
      <nav className="h-full">
        <NavLink className="nav-link" to="/" viewTransition>
          Play
        </NavLink>
        <NavLink className="nav-link" to="/ast" viewTransition>
          Ast walk
        </NavLink>
        <NavLink className="nav-link" to="/auto-dts" viewTransition>
          Auto dts
        </NavLink>
      </nav>
    </header>
  );
}

AppHeader.displayName = "AppHeader";
export default AppHeader;
