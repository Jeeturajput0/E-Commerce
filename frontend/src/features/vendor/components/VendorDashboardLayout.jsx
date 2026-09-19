import { useEffect } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useApp } from "../../../context/AppContext";
import VendorHeaderContent, { vendorLinks } from "../components/VendorHeaderContent";

const VendorDashboardLayout = () => {
  const { setRole } = useApp();

  useEffect(() => {
    setRole("vendor");
  }, [setRole]);

  return (
    <DashboardLayout
      title="Vendor Dashboard"
      role="Vendor Panel"
      links={vendorLinks}
      headerContent={<VendorHeaderContent />}
    />
  );
};

export default VendorDashboardLayout;
