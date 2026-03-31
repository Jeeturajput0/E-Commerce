import { useEffect } from "react";
import { useApp } from "../../../context/AppContext";
import { AdminDashboardShell } from "../shared/adminShared";

const AdminDashboardLayout = () => {
  const { setRole } = useApp();

  useEffect(() => {
    setRole("admin");
  }, [setRole]);

  return <AdminDashboardShell />;
};

export default AdminDashboardLayout;
