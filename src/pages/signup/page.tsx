"use client"
import React from 'react';
import {toast, Toaster} from 'sonner'
import { useRouter } from 'next/navigation';

const Signup: React.FC = () => {
    const router = useRouter()
    const notify = () => toast.success("App Created  Successfully")
    const handleSubmit = () => {
     notify()
     router.push("/Login/page")
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create an Account</h2>
        
        <form>
          {/* Company Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="companyName">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              placeholder="Enter your company name"
              className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Admin Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="adminEmail">
              Admin Email
            </label>
            <input
              type="email"
              id="adminEmail"
              placeholder="Enter your admin email"
              className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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

          {/* Terms and Conditions */}
          <p className="text-xs text-gray-500 text-center">
            By clicking Sign Up, you agree to our <span className="text-blue-600 cursor-pointer">Terms of Service</span>,{' '}
            <span className="text-blue-600 cursor-pointer">Data Use Policy</span>, and{' '}
            <span className="text-blue-600 cursor-pointer">Privacy Policy</span>. You may receive a verification email. 
            Message and data rates may apply.
          </p>
        </form>
      </div>
      <Toaster/>
    </div>
  );
};

export default Signup;
