import AppHeader from "./AppHeader";
import { Outlet } from "react-router";
import "./index.scss";

function AppLayout() {
  return (
    <div className="app-layout h-full">
      <AppHeader />
      <main className="app-body">
        <Outlet />
      </main>
    </div>
  );
}

AppLayout.displayName = "AppLayout";
export default AppLayout;
