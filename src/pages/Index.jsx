import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Check admin authentication status
    const adminAuth = sessionStorage.getItem("adminAuthenticated");
    const adminData = localStorage.getItem("adminData");
    setIsAdminAuthenticated(adminAuth === "true" && !!adminData);
  }, []);

  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      navigate("/admin");
    } else {
      navigate("/admin/auth");
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-2 border-b border-border">
        <div className="text-base sm:text-lg font-semibold text-foreground">
          YourLocal
        </div>
        <button
          onClick={handleAdminClick}
          className="bg-black text-white px-3 sm:px-4 py-2 rounded-md text-sm flex items-center justify-center hover:bg-gray-800 transition-colors min-w-[100px] sm:min-w-[120px]"
        >
          <span className="whitespace-nowrap">
            {isAdminAuthenticated ? "Admin Panel" : "Admin Sign In"}
          </span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-center text-foreground">
          Welcome User
        </h1>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-light text-center text-foreground">
          Your Local Directory
        </h1>
        <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link
            to="/upload"
            className="bg-black text-white px-4 py-2 rounded-md w-28 flex items-center justify-center text-sm hover:bg-gray-800 transition-colors"
          >
            Upload
          </Link>
          <Link
            to="/view"
            className="bg-black text-white px-4 py-2 rounded-md w-28 flex items-center justify-center text-sm hover:bg-gray-800 transition-colors"
          >
            View
          </Link>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-border"></footer> */}
    </div>
  );
};

export default Index;
