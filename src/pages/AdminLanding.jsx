import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLanding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    // Get admin name from localStorage
    const adminData = localStorage.getItem("adminData");
    if (adminData) {
      const admin = JSON.parse(adminData);
      setAdminName(admin.fullName);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthenticated");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-2 border-b border-border">
        <div className="text-base sm:text-lg font-semibold text-foreground">
          YourLocal
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="bg-black text-white px-3 sm:px-4 py-2 rounded-md text-sm flex items-center justify-center hover:bg-gray-800 transition-colors min-w-[80px] sm:min-w-[100px]"
          >
            <span className="whitespace-nowrap">← Home</span>
          </Link>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="text-destructive hover:text-destructive-foreground hover:bg-destructive transition-colors px-3 sm:px-4"
          >
            <LogOut className="w-4 h-4 mr-1 sm:mr-2" />
            <span className="whitespace-nowrap">Logout</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-center text-foreground">
          Welcome {adminName ? adminName.split(" ")[0] : "Admin"}
        </h1>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-light text-center text-foreground">
          Your Local Directory
        </h1>
        <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center">
          <Link
            to="/upload"
            className="bg-black text-white px-6 py-3 rounded-md w-32 flex items-center justify-center text-sm sm:text-base"
          >
            Upload
          </Link>
          <Link
            to="/admin/view"
            className="bg-black text-white px-6 py-3 rounded-md w-32 flex items-center justify-center text-sm sm:text-base"
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

export default AdminLanding;
