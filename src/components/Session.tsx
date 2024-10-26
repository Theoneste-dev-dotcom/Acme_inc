"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useActiveUserContext, useLoginContext } from "@/context";
import axios from "axios";
import { Toaster, toast } from "sonner";
import defaultProfile from "../images/user.png";

export default function MySession() {
  const { id } = useActiveUserContext();
  const [currentUser, setCurrentUser] = useState({
    fullName: "",
    email: "",
  });
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState<string | Blob>();
  const { data: session } = useSession();
  const router = useRouter();
  const { isLoggedIn, setLogin } = useLoginContext();

  useEffect(() => {
    if (session) {
      setLogin(true);
    }
  }, [session, setLogin]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8005/users/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        setProfile({...response.data})
        setCurrentUser(response.data);
        toast.success("User fetched successfully");
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    signOut();
    setLogin(false);
  };

  const createAccount = () => {
    setShow(true);
  };

  const updateProfile = () => {
    setUpdate(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserAgent({ ...userAgent, [name]: value });
  };

  const setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfileImage(e.target.files[0]);
    }
  };

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userAgent.password) {
      try {
        const res2 = await axios.post("http://localhost:8005/auth/login", {
          email: session?.user?.email,
          password: userAgent.password,
        });
        localStorage.setItem("authToken", res2.data.token);
        setShow(false);
        setLogin(true);
        toast.success("Logged in successfully");
      } catch {
        toast.error("User already exists or error logging in");
      }
    }
  };

  const updateYourProfile = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("appUser", new Blob([JSON.stringify(profile)], {type:"application/json"}));
    if (profileImage) {
      formData.append("imageFile", profileImage);
    }
  
    try {
      formData.forEach((value, key) => {
        console.log(key, value);  // Log each entry to check form data
      });
  
      const response = await axios.put(
        `http://localhost:8005/users/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data", // Explicitly set Content-Type
          },
        }
      );
      
      toast.success("Profile updated successfully");
      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  

  return (
    <div className="flex items-start flex-col gap-2 space-x-4">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={defaultProfile}
          className="rounded-full"
          width={40}
          height={40}
          alt="User Profile Picture"
        />
        <h1 className="text-blue-950 font-medium text-xl">
          {currentUser?.fullName}
        </h1>
      </div>
     
      {isLoggedIn ? (
        <div>
          <h1 className="text-gray-700 text-sm">
            You can't make any transaction unless you create an account.
          </h1>
          <div className="flex flex-row gap-2 my-4">
            {!show && !isLoggedIn ? (
              <button
                className="bg-blue-600 text-white rounded-md px-3 py-2"
                onClick={createAccount}
              >
                Create Account
              </button>
            ) : (
              <button
                className="bg-blue-600 text-white rounded-md px-3 py-2"
                onClick={updateProfile}
              >
                Update Profile
              </button>
            )}
            {show && (
              <form className="flex flex-col gap-2" onSubmit={create}>
                <label htmlFor="password" className="text-gray-700">
                  Enter Password
                </label>
                <input
                  type="password"
                  className="text-gray-600 bg-gray-200 rounded-md py-2"
                  name="password"
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-2 py-2 rounded-lg"
                >
                  Create
                </button>
              </form>
            )}
            {update && (
              <form
                className="flex flex-col gap-4 bg-white shadow-lg px-4 py-10 absolute bottom-4"
                onSubmit={updateYourProfile}
              >
                <input
                  type="text"
                  className="bg-gray-100 pl-4 border-2 py-2 shadow-md rounded-md"
                  placeholder="Email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="bg-gray-100 pl-4 border-2 py-2 shadow-md rounded-md"
                  placeholder="Name"
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile({ ...profile, fullName: e.target.value })
                  }
                />
                <input
                  className="bg-gray-100 rounded-md py-2"
                  type="file"
                  onChange={setImage}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-medium rounded-lg w-[50%] px-3 py-2 ml-8"
                >
                  Update Profile
                </button>
              </form>
            )}
            <button
              className="bg-blue-600 text-white rounded-md px-3 py-2"
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-600 text-white rounded-md px-3 py-2"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
      )}
      <Toaster />
    </div>
  );
}
