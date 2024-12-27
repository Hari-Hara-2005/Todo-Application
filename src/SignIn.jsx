import { Rocket } from "lucide-react";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

// Reusable Error Message Component
const ErrorMessage = ({ message }) => {
  return <p className="text-red-600 text-sm">{message}</p>;
};

export default function SignupForm() {
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

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form Validation
  const validate = () => {
    const newErrors = { name: "", email: "", password: "" };
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

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validate()) return; // If validation fails, do not proceed

      setIsSubmitting(true);

      try {
        await axios.post("https://todo-pi-plum-45.vercel.app/register", {
          ...formData,
        });
        setFormData({ name: "", email: "", password: "" });
        console.log("Sign Up Successfully");
      } catch (error) {
        console.error("Error: ", error.message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData] // Only run when formData changes
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-100 to-gray-200 p-4 md:p-6 lg:p-8">
      <Card className="mx-auto max-w-5xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Blue Background */}
          <div className="relative bg-blue-600 px-6 py-8 text-white md:w-2/5">
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-8 flex items-center gap-2">
                <div className="rounded-full bg-white p-2">
                  <Rocket className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold">Spacer</span>
              </div>
              <h1 className="mb-4 text-2xl font-semibold">Welcome to</h1>
              <p className="mb-8 text-sm text-blue-100">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="mt-auto flex gap-4 text-xs">
                <button className="hover:underline">CREATE HERE</button>
                <button className="hover:underline">DISCOVER HERE</button>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-16 translate-x-8 bg-white md:block [clip-path:polygon(100%_0,0%_100%,100%_100%)]"></div>
          </div>

          {/* Right Section - White Background */}
          <div className="flex-1 px-6 py-8 md:px-12">
            <div className="mx-auto max-w-md">
              <h2 className="mb-8 text-2xl font-semibold">
                Create your account
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your name"
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
                    placeholder="Enter your mail"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <ErrorMessage message={errors.email} />}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <ErrorMessage message={errors.password} />
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    By signing up, I agree with{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms & Conditions
                    </a>
                  </label>
                </div>

                <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                  </Button>
                  <Button type="button" variant="outline" className="flex-1">
                    Sign In
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
