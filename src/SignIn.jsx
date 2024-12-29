import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// Reusable Error Message Component
const ErrorMessage = ({ message }) => {
  return <p className="text-red-600 text-sm">{message}</p>;
};

export default function SignInForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form Validation
  const validate = () => {
    const newErrors = { email: "", password: "" };
    let valid = true;

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
      valid = false;
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  }, [navigate]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validate()) return;
      setIsSubmitting(true);

      try {
        const response = await axios.post(
          "https://todo-pi-plum-45.vercel.app/login",
          {
            ...formData,
          }
        );
        const token = response.data.token;
        localStorage.setItem("token", token);
        setFormData({ email: "", password: "" });
        Swal.fire({
          title: "Success!",
          text: "Logged in successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/home", { replace: true });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Email or Password is Invalid.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error: ", error.message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, navigate]
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-gray-200 p-4 md:p-6 lg:p-8 flex items-center">
      <Card className="mx-auto max-w-5xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Blue Background */}
          <div className="relative bg-blue-600 px-6 py-8 text-white md:w-2/5">
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-8 flex items-center gap-2">
                <div className="rounded-full bg-white p-2">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold">TaskMaster</span>
              </div>
              <h1 className="mb-4 text-2xl font-semibold">Stay Organized</h1>
              <p className="mb-8 text-sm text-blue-100">
                Manage your daily tasks efficiently. Plan, prioritize, and track
                your to-dos effortlessly.
              </p>
              <div className="mt-auto text-xs text-center text-white/70">
                <p>
                  Copyright © 2024 | Designed and Developed by{" "}
                  <a
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      fontWeight: 600,
                    }}
                    href="https://harihara.vercel.app/"
                  >
                    Hari Hara
                  </a>
                </p>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-16 translate-x-8 bg-white md:block [clip-path:polygon(100%_0,0%_100%,100%_100%)]"></div>
          </div>

          {/* Right Section - White Background */}
          <div className="flex-1 px-6 py-8 md:px-12">
            <div className="mx-auto max-w-md">
              <h2 className="mb-8 text-2xl font-semibold">
                Sign in to your To-Do List
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <ErrorMessage message={errors.email} />}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <div
                      className="absolute inset-y-0 right-2 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </div>
                  </div>
                  {errors.password && (
                    <ErrorMessage message={errors.password} />
                  )}
                </div>
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Log In..." : "Log In"}
                  </Button>
                  <Link to="/signup" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Create Account
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
