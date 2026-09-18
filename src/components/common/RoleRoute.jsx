import { Navigate, Outlet, useLocation } from "react-router-dom";

const RoleRoute = ({ role, roles }) => {
  const token = localStorage.getItem("token");
  const savedRole = localStorage.getItem("role");
  const location = useLocation();
  const allowed = roles || (role ? [role] : []);

  if (!token) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (allowed.length && !allowed.includes(savedRole)) {
    return (
      <Navigate
        to={savedRole === "admin" ? "/admin" : savedRole === "vendor" ? "/vendor" : "/"}
        replace
      />
    );
  }
  return <Outlet />;
};

export default RoleRoute;
