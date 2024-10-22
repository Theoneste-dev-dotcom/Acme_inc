"use client"
import { useRouter } from 'next/navigation';
import { toast,Toaster } from 'sonner';
import React from 'react';


const Login: React.FC = () => {
  const router=  useRouter()
  const notify = () => toast.success("Logged In  Successfully")
  const handleLogin = () => {
    notify()
    router.push("/welcome")
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Log in to your account</h1>
          <p className="text-gray-500 mt-2">
            To manage your Acme Inc. account, sign in with your email and password.
          </p>
        </div>

        {/* Form Section */}
        <form>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Forgot your password?
            </a>
          </div>

          {/* Sign In Button */}
          <div className="mb-4">
            <button
            onClick={handleLogin}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Sign in
            </button>
          </div>

          {/* Create an Account Button */}
          <div className="flex justify-center mb-4">
            <span className="text-gray-500 text-sm">Don’t have an account?</span>
          </div>
          <div>
            <button
              type="button"
              className="w-full bg-gray-100 text-gray-600 py-2 rounded-md border border-gray-300 hover:bg-gray-200 transition duration-200"
            >
              Create an account
            </button>
          </div>
        </form>

        {/* Terms and Conditions */}
        <p className="text-xs text-gray-500 text-center mt-6">
          By signing in, you agree to Acme Inc.s <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
      </div>
      <Toaster/>
    </div>
  );
};

export default Login;
