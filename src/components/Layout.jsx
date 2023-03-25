import { Outlet } from "react-router-dom";
import AuthHOC from "../hoc/AuthHOC";

function Layout() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}

export default AuthHOC(Layout);
