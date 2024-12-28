import { Rocket, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const ErrorMessage = ({ message }) => {
  return <p className="text-red-600 text-sm">{message}</p>;
};

export default function SignupForm() {
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
    terms: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = () => {
    setAgreed((prev) => !prev);
    setErrors((prev) => ({ ...prev, terms: "" }));
  };

  const validate = () => {
    const newErrors = { name: "", email: "", password: "", terms: "" };
    let valid = true;

    if (!formData.name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required";
      valid = false;
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }
    if (!agreed) {
      newErrors.terms = "You must agree to the terms";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validate()) return;
      setIsSubmitting(true);

      try {
        await axios.post(
          "https://todo-pi-plum-45.vercel.app/register",
          formData,
          { headers: { "Content-Type": "application/json" } }
        );

        setFormData({ name: "", email: "", password: "" });
        setAgreed(false);
        navigate("/");

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Account created successfully",
          confirmButtonText: "OK",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again.",
        });
        console.error("Error: ", error.message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, agreed, navigate]
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-gray-200 p-4 md:p-6 lg:p-8 flex items-center">
      <Card className="mx-auto max-w-5xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="relative bg-blue-600 px-6 py-8 text-white md:w-2/5">
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-8 flex items-center gap-2">
                <div className="rounded-full bg-white p-2">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold">TaskMaster</span>
              </div>
              <h1 className="mb-4 text-2xl font-semibold">Get Things Done</h1>
              <p className="mb-8 text-sm text-blue-100">
                Join now to manage your tasks better. Plan, prioritize, and
                achieve more every day.
              </p>
              <div className="mt-auto flex gap-4 text-xs">
                <button className="hover:underline">START NOW</button>
                <button className="hover:underline">LEARN MORE</button>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-16 translate-x-8 bg-white md:block [clip-path:polygon(100%_0,0%_100%,100%_100%)]"></div>
          </div>

          <div className="flex-1 px-6 py-8 md:px-12">
            <div className="mx-auto max-w-md">
              <h2 className="mb-8 text-2xl font-semibold">
                Create your To-Do List Account
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <ErrorMessage message={errors.name} />}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <ErrorMessage message={errors.email} />}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Create Password</Label>
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
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={handleCheckbox}
                    className="w-5 h-5"
                  />
                  <label htmlFor="terms" className="text-sm">
                    I accept the{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms & Conditions
                    </a>
                  </label>
                </div>
                {errors.terms && <ErrorMessage message={errors.terms} />}
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating Account..." : "Sign Up"}
                  </Button>
                  <Link to="/" className="flex-1">
                    <Button type="button" variant="outline" className="w-full">
                      Log In
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
