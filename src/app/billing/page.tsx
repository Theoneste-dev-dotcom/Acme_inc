"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useBillingContext } from "@/context";
import { Toaster, toast } from "sonner";
import { useLoginContext } from "@/context";
const FullPageForm = () => {
  const router = useRouter();
  const [billingInfo, setBillingInfo] = useState({
    state: "",
    city: "",
    zip: "",
    taxID: "",
    discountCode: "",
  });
  const { isEnabled, setBilling } = useBillingContext();
  const { isLoggedIn } = useLoginContext();
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBillingInfo({ ...billingInfo, [name]: value });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken")
  
    if (
      billingInfo.state != "" &&
      billingInfo.city != "" &&
      billingInfo.zip != "" &&
      billingInfo.discountCode != ""
    ) {
      //  http://localhost:8005/billing/add
      const res = await axios.get(
        `http://localhost:8005/users/me`,
      
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
            "Content-Type": "application/json",
          },
        }
      );
      if (res) {
        console.log(res.data)
        console.log(isEnabled);
        setBilling(true);
        if (isLoggedIn) {
          // router.push("/welcome");
        } else {
          // router.push("/login");
        }
        console.log(res.data, isEnabled);
      }
    }

  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Billing Information</h2>
        <form className="space-y-4">
          {/* Billing address section */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Billing Address
            </label>
            <select
              title="."
              name="country"
              className="w-full px-3 py-2 text-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option className="text-gray-400" value="United States">
                United States
              </option>
              <option className="text-gray-400" value="United States">
                State of Emirates
              </option>
              <option className="text-gray-400" value="United States">
                Rwanda State
              </option>
              <option className="text-gray-400" value="Other">
                Other
              </option>
            </select>
          </div>

          <div>
            <input
              type="text"
              name="addressLine1"
              placeholder="Address line 1"
              value="you address line"
              onChange={handleChange}
              className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="flex space-x-4">
            <select
              title="."
              name="state"
              value={billingInfo.state}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Select a state...</option>
              <option value="Retails organization">Retails organization</option>
              <option value="Commercial">Commercial</option>
              <option value="Private Company">Private Company</option>
              <option value="Fashioning">Fashioning and advertising</option>
              {/* Add more state options here */}
            </select>

            <input
              type="text"
              name="zip"
              placeholder="ZIP"
              value={billingInfo.zip}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={billingInfo.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Tax ID and Discount Code section */}
          <div>
            <input
              type="text"
              name="taxID"
              placeholder="Tax ID number (optional)"
              value={billingInfo.taxID}
              onChange={handleChange}
              className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <input
              type="text"
              name="discountCode"
              placeholder="Discount code"
              value={billingInfo.discountCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Pricing details */}
          <div className="text-sm text-gray-700">
            <p>Subtotal: $0.00</p>
            <p>Every 1 year: $50.00</p>
            <p>14 day trial: FREE</p>
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Start trial
          </button>

          <p className="text-xs text-gray-500 mt-4">
            After your trial ends in 14 days, you will be charged $50.00, then
            $50.00 every year.
          </p>
        </form>

        <div className="text-center text-gray-500 text-xs mt-8">
          <p>
            Powered by Lemon Squeezy &bull;{" "}
            <a href="#" className="hover:underline">
              Terms
            </a>{" "}
            &bull;{" "}
            <a href="#" className="hover:underline">
              Privacy
            </a>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default FullPageForm;