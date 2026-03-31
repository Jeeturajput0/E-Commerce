import { useEffect } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useApp } from "../../../context/AppContext";
import CustomerHeaderContent, { customerLinks } from "../components/CustomerHeaderContent";

const CustomerDashboardLayout = () => {
  const { setRole } = useApp();

  useEffect(() => {
    setRole("customer");
  }, [setRole]);

  return (
    <DashboardLayout
      title="Customer Dashboard"
      role="Customer Panel"
      links={customerLinks}
      headerContent={<CustomerHeaderContent />}
    />
  );
};

export default CustomerDashboardLayout;
