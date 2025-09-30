import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, User, Mail, Lock, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // Check if admin is already authenticated on component mount
  useEffect(() => {
    const isAdminAuthenticated = sessionStorage.getItem("adminAuthenticated");
    const adminData = localStorage.getItem("adminData");

    if (isAdminAuthenticated === "true" && adminData) {
      navigate("/admin");
    } else {
      // Check if admin account exists to determine default view
      setIsLogin(!!adminData);
    }
  }, [navigate]);

  // Regex patterns for validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      // Full Name validation for signup
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      } else if (!nameRegex.test(formData.fullName.trim())) {
        newErrors.fullName =
          "Full name must be 2-50 characters and contain only letters and spaces";
      }
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isLogin && !passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters with uppercase, lowercase, number, and special character";
    }

    // Confirm password validation for signup
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Login Logic
        const adminData = localStorage.getItem("adminData");

        if (!adminData) {
          toast({
            title: "Account Not Found",
            description: "No admin account exists. Please sign up first.",
            variant: "destructive",
          });
          setIsLogin(false);
          return;
        }

        const admin = JSON.parse(adminData);

        if (
          admin.email === formData.email &&
          admin.password === formData.password
        ) {
          // Successful login
          sessionStorage.setItem("adminAuthenticated", "true");
          toast({
            title: "Login Successful",
            description: `Welcome back, ${admin.fullName}!`,
          });
          navigate("/admin");
        } else {
          toast({
            title: "Invalid Credentials",
            description: "Email or password is incorrect.",
            variant: "destructive",
          });
        }
      } else {
        // Signup Logic
        const existingAdmin = localStorage.getItem("adminData");

        if (existingAdmin) {
          toast({
            title: "Account Already Exists",
            description:
              "An admin account already exists. Please login instead.",
            variant: "destructive",
          });
          setIsLogin(true);
          return;
        }

        // Create new admin account
        const adminData = {
          fullName: formData.fullName.trim(),
          email: formData.email.toLowerCase(),
          password: formData.password,
          createdAt: new Date().toISOString(),
        };

        localStorage.setItem("adminData", JSON.stringify(adminData));
        sessionStorage.setItem("adminAuthenticated", "true");

        toast({
          title: "Account Created Successfully",
          description: `Welcome, ${adminData.fullName}! Redirecting to admin panel...`,
        });

        setTimeout(() => {
          navigate("/admin");
        }, 1500);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "Authentication Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-2 border-b border-border">
        <div className="text-lg font-semibold text-foreground">YourLocal</div>
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-2 rounded-md text-base flex items-center justify-center hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 bg-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isLogin ? "Admin Login" : "Create Admin Account"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Sign in to access the admin panel"
                : "Set up your admin account to manage the directory"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name - Only for Signup */}
              {!isLogin && (
                <div className="space-y-2">
                  <label className="form-label flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  <Input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="Enter your full name"
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">
                      {errors.fullName}
                    </p>
                  )}
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label className="form-label flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="form-label flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder={
                      isLogin
                        ? "Enter your password"
                        : "Create a strong password"
                    }
                    className={
                      errors.password ? "border-destructive pr-10" : "pr-10"
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
                {!isLogin && (
                  <p className="text-xs text-muted-foreground">
                    Must contain 8+ characters with uppercase, lowercase,
                    number, and special character
                  </p>
                )}
              </div>

              {/* Confirm Password - Only for Signup */}
              {!isLogin && (
                <div className="space-y-2">
                  <label className="form-label flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      placeholder="Confirm your password"
                      className={
                        errors.confirmPassword
                          ? "border-destructive pr-10"
                          : "pr-10"
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {isLogin ? "Signing In..." : "Creating Account..."}
                  </>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Toggle between Login/Signup */}
              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData({
                      fullName: "",
                      email: "",
                      password: "",
                      confirmPassword: "",
                    });
                    setErrors({});
                  }}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  {isLogin
                    ? "Need to create an admin account? Sign up here"
                    : "Already have an admin account? Sign in here"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminAuth;
