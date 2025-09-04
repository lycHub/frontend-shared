import { NavLink } from "react-router";
import { useLang } from "../../hooks/use-lang";

function AppHeader() {
  const { state, toggle } = useLang();
  return (
    <header className="app-header">
      <div className="lang">
        curr lang: {state}
        <button onClick={toggle}>toggle lang</button>
      </div>
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
