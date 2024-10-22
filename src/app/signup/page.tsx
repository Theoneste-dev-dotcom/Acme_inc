"use client";
import React from "react";
import { toast, Toaster } from "sonner";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useState } from "react";

import axios from "axios";
const Signup: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user.username != "" && user.password != "" && user.email != "") {
      const res = await axios.post(`http://localhost:8005/auth/signup`, {
        email: user.email,
        password: user.password,
        fullName: user.username,
      });
      if (res) {
        console.log(res);
        toast.success("App Created  Successfully");
        if (isChecked) {
          router.push("/billing");
        } else {
          router.push("/login");
        }
      } else {
        console.log("An error occured ");
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value }); // Update the form input values.
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the state
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create an Account
        </h2>

        <form>
          {/* Company Name Input */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="companyName"
            >
              Username
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={user.username}
              name="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border text-gray-600 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Admin Email Input */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="adminEmail"
            >
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={user.email}
              id="adminEmail"
              placeholder="Enter your admin email"
              className="w-full px-4 py-2 border rounded-md text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              value={user.password}
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md text-gray-600 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-500">
              {/* Step 3: Set the checkbox value based on state */}
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              Enable Billing
            </label>
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Create your account
            </button>
          </div>
          <div className="mb-4">
            <button
              onClick={() => router.push('/login')}
              type="button"
              className="w-full bg-blue-50 border  text-gray-400 py-2 rounded-md hover:border-blue-200 transition duration-200"
            >
              Already have account?
            </button>
          </div>

          {/* Terms and Conditions */}
          <p className="text-xs text-gray-500 text-center">
            By clicking Sign Up, you agree to our{" "}
            <span className="text-blue-600 cursor-pointer">
              Terms of Service
            </span>
            ,{" "}
            <span className="text-blue-600 cursor-pointer">
              Data Use Policy
            </span>
            , and{" "}
            <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
            . You may receive a verification email. Message and data rates may
            apply.
          </p>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Signup;
