"use client";
import { toast, Toaster } from "sonner";
import { useLoginContext } from "@/context";
import { useSession, signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useBillingContext } from "@/context";
import Image from "next/image";
import google from "../../images/search.png";
import github from "../../images/social.png";

import axios from "axios";

const Login: React.FC = () => {
  const { data: session, status } = useSession();

  

  const {isEnabled, setBilling} = useBillingContext()
  const {setLogin} = useLoginContext()
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/welcome";
  const notify = () => toast.success("Logged In  Successfully");

  const handleClick = () => {
    router.push("/signup");
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent default form submission behavior
    if (formValues.email != "" && formValues.password != "") {
      const res = await axios.post(`http://localhost:8005/auth/login`, {
        email: formValues.email,
        password: formValues.password,
      });
      if (res) {
         setLogin(true)
        console.log(res.data);
        localStorage.setItem('authToken', res.data.token)
        notify();
        router.push("/welcome");
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value }); // Update the form input values.
  };

  const loginWithGoogle = () =>{
    setLogin(true)
    signIn("google", { callbackUrl })
  } 
  const loginwithGithub = () => {
    setLogin(true)
    signIn("github", { callbackUrl })
  }
  // Step 2: Handle the checkbox toggle event

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {/* Header Section */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Log in to your account
          </h1>
          <p className="text-gray-500 mt-2">
            To manage your Acme Inc. account, sign in with your email and
            password.
          </p>
        </div>
        <div
          className="flex bg-white border justify-center mb-4 py-1 border-gray-200 flex-row gap-4 items-center "
          onClick={loginWithGoogle}
        >
          <Image src={google} alt="google icon" className="h-8 w-8" />
          <h1>Continue with Google</h1>
        </div>
        <div
          className="flex bg-white border justify-center mb-4 py-1 border-gray-200 flex-row gap-4 items-center "
          onClick={loginwithGithub}
        >
          <Image src={github} alt="google icon" className="h-8 w-8" />
          <h1>Continue with Github</h1>
        </div>

        {/* Form Section */}
        <form>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              value={formValues.email}
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full px-4 py-2 border text-gray-500 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md text-gray-500 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <Link href="/welcome">Got to Welcome</Link>
          </div>

          {/* Create an Account Button */}
          <div className="flex justify-center mb-4">
            <span className="text-gray-500 text-sm">
              Don&apos;t have an account?
            </span>
          </div>

          <div></div>
          <div>
            <button
              type="button"
              onClick={handleClick}
              className="w-full bg-gray-100 text-gray-600 py-2 rounded-md border border-gray-300 hover:bg-gray-200 transition duration-200"
            >
              Create an account
            </button>
          </div>
        </form>

        {/* Terms and Conditions */}
        <p className="text-xs text-gray-500 text-center mt-6">
          By signing in, you agree to Acme Inc.s{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
