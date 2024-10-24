"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import MySession from "@/components/Session";
import { LoginContext } from "@/context";
import { useBillingContext } from "@/context";
import { useLoginContext } from "@/context";
import axios from "axios";
import {toast, Toaster} from 'sonner'
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const { isLoggedIn, setLogin } = useLoginContext();
  const { isEnabled, setBilling } = useBillingContext();

  const router = useRouter();
  const [activeUser, setActiveUser] = useState(0);
  useEffect(() => {
const getUser = async() => {
  const res = await axios.get(`http://localhost:8005/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add the token here
      "Content-Type": "application/json",
    },
  });
  setActiveUser(res.data.id);
}
getUser();
  }, []);
  const token = localStorage.getItem("authToken")
  if (activeUser != 0) {
  
    axios.get(`http://localhost:8005/billing/getBillingByAppId/${activeUser}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token here
        "Content-Type": "application/json",
      },
    })
     .then(() => {
      setBilling(true)
     })
     .catch(error => {
      console.log(error)
     
  })
    }
  

  const loggedOutNav = [
    { href: "#", label: "Overview" },
    { href: "/users", label: "Our Services" },
    { href: "#", label: "Where we work" },
    { href: "#", label: "About us" },
    { href: "#", label: "Contact us" },
    { href: "/manageTenants", label: "Pricing" },
    { href: "/products", label: "FAQ" },
    { href: "/analytics", label: "Want to join?" },
  ];

  const loggedInNav = [
    { href: "#", label: "Overview" },
    { href: "/users", label: "Users" },
    { href: "#", label: "Settings" },
    { href: "#", label: "Usage" },
    { href: "#", label: "API" },
    { href: "/manageTenants", label: "Manage Tenants" },
    { href: "/products", label: "Manage Products" },
    { href: "/analytics", label: "Analytics" },
  ];

  const handleLogout = () => {
    setLogin(false)
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <div className="mb-8 sticky top-4">
          <h2 className="text-2xl text-gray-400 font-semibold">Acme Inc</h2>
          <p className="text-sm text-gray-400">acme.inc</p>
        </div>

        {/* Navigation Links based on Login State */}
        <nav className="flex flex-col space-y-4 sticky top-24">
          {(isLoggedIn && isEnabled ? loggedInNav : loggedOutNav).map(
            (item) => (
              <Link key={item.label} href={item.href} className="text-gray-600">
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Footer Options based on Login State */}
        <div className="mt-auto pt-10 sticky top-96">
          {isLoggedIn && isEnabled ? (
            <div>
              <MySession />
            </div>
          ) : (
            <div>
              <div>
                <MySession />
              </div>
              <Link href="#" className="text-gray-600">
                Create your Own Account
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-50">
        <div className="flex justify-between items-center lg:px-20 mb-10">
          <h1 className="lg:text-3xl text-xl font-bold text-gray-400">
            {isLoggedIn
              ? "You are logged in! Enjoy managing your products, viewing analytics, and more."
              : "Hello! Please log in to access your dashboard. 👋"}
          </h1>

          {/* Login / Logout Button */}
          <div>
            {!isLoggedIn  ? (
              <div className="flex gap-4">
                <Link
                  href="/login"
                  className="bg-blue-500 px-8 py-2 rounded-md font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-500 px-8 py-2 rounded-md font-medium"
                >
                  Signup
                </Link>
              </div>
            ) : (
             <div>
              { !isEnabled  ? (
                <div>
                  <button
                onClick={() => router.push("/billing")}
                className="bg-blue-500 px-8 py-2 rounded-md font-medium"
              >
                Enable Billing Account
              </button>

                </div>
              ) : (
                <div>
                    <button
                onClick={handleLogout}
                className="bg-blue-500 px-8 py-2 rounded-md font-medium"
              >
                Logout
              </button>
                </div>
              )}
             </div>
            )}
          </div>
        </div>

        {/* Additional Content Based on Login State */}
        {isLoggedIn && isEnabled ? (
          <div>
            {/* Recently Viewed Section */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-400">
                Recently Viewed
              </h2>
              <div className="space-y-4">
                {["3", "5", "7"].map((days, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                      <div>
                        <h3 className="font-medium">Acme Inc</h3>
                        <p className="text-sm text-gray-400">
                          Updated {days} days ago
                        </p>
                      </div>
                    </div>
                    <div className="text-gray-400">⋮</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Manage Products Section */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-400">
                Manage Products
              </h2>
              <div className="space-y-4">
                {["3", "5", "7"].map((days, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                      <div>
                        <h3 className="font-medium">iPhone</h3>
                        <p className="text-sm text-gray-400">
                          Updated {Number(days) + 3} days ago
                        </p>
                      </div>
                    </div>
                    <div className="text-gray-400">⋮</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Admin Options Section */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold text-gray-400">
                Admin Options
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded-lg flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-medium">Team</h3>
                    <p className="text-sm text-gray-400">
                      Manage your team members and roles
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-gray-100 rounded-lg flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-medium">Settings</h3>
                    <p className="text-sm text-gray-400">
                      Manage your organization&apos;s settings and usage
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div>
            <div className="flex flex-col items-center justify-evenly mt-20 mb-20">
              <h1 className="font-bold text-gray-500 text-3xl">
                Welcome to ACME INC App
              </h1>
            </div>
            <div className="flex flex-col text-left pl-10 lg:pl-20 mb-10">
              <h1 className="text-medium font-medium text-gray-400 text-2xl mb-4">
                What We do?
              </h1>
              <ul className="flex flex-col gap-3 ">
                <li className="bg-gray-100 text-gray-500 border py-2 px-3">
                  &gt; We Help you in Your Online transaction management
                </li>
                <li className="bg-gray-100 text-gray-500  border py-2 px-3">
                  &gt; We Your Business uses
                </li>
                <li className="bg-gray-100 text-gray-500  border py-2 px-3">
                  &gt; We Help you keep your online transactions secure{" "}
                </li>
                <li className="bg-gray-100 text-gray-500  border py-2 px-3">
                  &gt; We Help Manage you store from any where you are
                </li>
                <li className="bg-gray-100 text-gray-500  border py-2 px-3">
                  &gt; We Help you manage your online accounts and balances
                </li>
              </ul>
            </div>

            <div className="flex flex-col pl-10 lg:pl-20 items-start">
              <h1 className="text-2xl fotn-bold mb-4 text-gray-400">FAQ ?</h1>
              <div className="flex flex-col gap-4">
                <details className="w-[100%] lg:w-[100%]  bg-white p-4 rounded-md shadow">
                  <summary className="text-gray-500 font-semibold cursor-pointer">
                    How do you ensure the security of online transactions?
                  </summary>
                  <p className="mt-2 text-gray-600">
                    We prioritize transaction security through encryption and
                    secure authentication methods.
                  </p>
                </details>
                <details className="w-[100%] lg:w-[100%]  bg-white p-4 rounded-md shadow">
                  <summary className="font-semibold cursor-pointer text-gray-500">
                    Can I manage my store remotely?
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Yes, our platform allows you to manage your store from
                    anywhere, ensuring seamless business operations.
                  </p>
                </details>
                <details className="w-[100%] lg:w-[100%]  bg-white p-4 rounded-md shadow">
                  <summary className="font-semibold cursor-pointer text-gray-500">
                    What services do you offer for online account management?
                  </summary>
                  <p className="mt-2 text-gray-600">
                    We help you track and manage your online accounts, monitor
                    balances, and provide alerts for key activities.
                  </p>
                </details>
                <details className="w-[100%] lg:w-[100%]  bg-white p-4 rounded-md shadow">
                  <summary className="font-semibold cursor-pointer text-gray-500">
                    Do you offer tools for business usage analysis?
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Yes, we provide insights and analytics to help you better
                    understand and optimize your business operations.
                  </p>
                </details>
                <details className="w-[100%] lg:w-[100%]  bg-white p-4 rounded-md shadow">
                  <summary className="font-semibold cursor-pointer text-gray-500">
                    What kind of support is available for transaction management
                    issues?
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Our team offers 24/7 support to assist with any issues
                    related to your online transactions.
                  </p>
                </details>
                <details className="w-[100%] lg:w-[100%]  bg-white p-4 rounded-md shadow">
                  <summary className="font-semibold cursor-pointer text-gray-500">
                    Is it possible to integrate multiple payment platforms with
                    your service?
                  </summary>
                  <p className="mt-2 text-gray-600">
                    Yes, we support integration with various payment platforms
                    to streamline your transaction processes.
                  </p>
                </details>
              </div>
              <div>
                <button className="bg-blue-400 px-20 py-3 text-xl rounded-lg mt-10">
                  Want to join?
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
<Toaster/>
    </div>
  );
}
