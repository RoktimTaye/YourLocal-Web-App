import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminAuthenticated = sessionStorage.getItem("adminAuthenticated");
    const adminData = localStorage.getItem("adminData");

    if (!isAdminAuthenticated || !adminData) {
      navigate("/admin/auth");
    }
  }, [navigate]);

  const isAdminAuthenticated = sessionStorage.getItem("adminAuthenticated");
  const adminData = localStorage.getItem("adminData");

  if (!isAdminAuthenticated || !adminData) {
    return null; // Will redirect in useEffect
  }

  return children;
};

export default ProtectedAdminRoute;
