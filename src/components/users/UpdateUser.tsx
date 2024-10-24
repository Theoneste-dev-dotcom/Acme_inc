"use client";
// import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useActiveUserContext } from "@/context";
import Sidebar from "./Sidebar";
import { Toaster, toast } from "sonner";
const UpdateUser = ({user_id}:{user_id:number}) => {
if(user_id ){
    console.log(user_id)
}else {
    console.log("no user id")
}

  const router = useRouter();
  // Initial state for the form
  const { id } = useActiveUserContext();
  const [user, setUser] = useState({
    name: "",
    role: "",
    email: "",
    status: "",
    permissions: "",
    ownerId: id,
  });


  useEffect(() =>{
    axios.get(`http://localhost:8005/api/users/${user_id}`,{
    headers:{
    Authorization:`Bearer ${localStorage.getItem("authToken")}`
    }
    })

    .then(res=> {
        setUser(res.data)
    })
    .catch(err=> {
        console.log(err)
    })
  }, [user_id])
  // Handle form submission

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user.email != "" && user.name != "" && user.ownerId != 0) {
      console.log("User updated:", user);
      axios
        .put(`http://localhost:8005/api/users/update/${user_id}`, user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Add the token here
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          toast.success("User updated successfully");
          setUser((prev) => ({
            ...prev,
            name: "",
            email: "",
          }));
          router.push("/users");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (user.ownerId != 0) {
        toast.error("You have Active user id");
      }
      toast.warning(`Please fill all the fields ${user.ownerId}`);
    }
  };

  // Handle input change
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="flex gap-2 w-[100vw] h-[100vw]" >
        <Sidebar/>
      <form
        onSubmit={handleSubmit}
        className="xl:w-[60%] md:w-[80%] lg:w-[70%] w-[100%] xl:px-20 bg-w bg-gray-50 dow-lg px-4 py-8"
      >
        <div className="flex flex-col gap-1 mb-4">
          <label className="font-medium text-gray-400 text-xl">Name </label>
          <input
            className="bg-gray-200  border border-blue-500 rounded-lg  py-3 text-md pl-4 text-gray-700"
            title="."
            type="text"
            name="name"
            value={user.name && user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label className="font-medium text-gray-400 text-xl">Role </label>
          <select
            title="."
            className="bg-gray-200 rounded-lg border py-3 text-md pl-4 text-gray-700 border-blue-500"
            name="role"
            value={user.role && user.role}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="Viewer">Viewer</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label className="font-medium text-gray-400 text-xl">Email </label>
          <input
            className="bg-gray-200 rounded-lg border py-3 text-md pl-4 text-gray-700 border-blue-500"
            title="."
            type="email"
            name="email"
            value={user.email && user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label className="font-medium text-gray-400 text-xl">Status </label>
          <select
            className="bg-gray-200 rounded-lg border py-3 text-md pl-4 text-gray-700 border-blue-500"
            name="status"
            title="."
            value={user.status && user.status}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="Active">Active</option>
            <option value="Invited">Invited</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <label className="font-medium text-gray-400 text-xl">
            Permissions{" "}
          </label>
          <select
            className="bg-gray-200 rounded-lg border py-3 text-md pl-4 text-gray-700 border-blue-500"
            name="permissions"
            title="."
            value={user.permissions && user.permissions}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="Read">Read</option>
            <option value="Update">Update</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="font-medium text-white bg-blue-500 w-[100%] px-6 py-3 rounded-lg"
        >
          Update User
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default UpdateUser;
