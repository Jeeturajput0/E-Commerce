import { Navigate, Outlet } from "react-router-dom";
const RoleRoute = ({ role }) => {
  const token = localStorage.getItem("token"); const savedRole = localStorage.getItem("role");
  if (!token) return <Navigate to="/auth" replace />;
  return savedRole === role ? <Outlet /> : <Navigate to={savedRole === "admin" ? "/admin" : savedRole === "vendor" ? "/vendor" : "/"} replace />;
};
export default RoleRoute;
