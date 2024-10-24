"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useActiveUserContext } from '@/context';
import { useLoginContext } from '@/context';
interface UsersType  {
  id:number
  name:string,
  role:string,
  email:string,
  status:string
}
const UsersTable = () => {
  const {isLoggedIn} = useLoginContext()
const {id} = useActiveUserContext()
  const [users, setUsers] = useState <UsersType[]>();
useEffect(() => {
  console.log(id, isLoggedIn)
  axios.get(`http://localhost:8005/api/users/yours/${id}`, {
    headers:{
      Authorization:`Bearer ${localStorage.getItem("authToken")}`,
      "Content-Type": "application/json",
    }
  })
  .then((res) => {
    setUsers([...res.data])
})
.catch(error=> {
  console.log(error);
}
)
}, [])

  const handleDelete = (id:number) => {
    setUsers(users?.filter(user => user.id !== id));
    axios.delete(`http://localhost:8005/api/users/delete/${id}`, {
      headers:{
        Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      }
    })
    .then((res) => {
    console.log("User Deleted successfully")
    toast(`User with id ${id} Deleted successfully`)
    })
    .catch(err=>{ 
      console.log(err.message)
      toast.error("Failed to Delete the user")
    })
  };

  const handleResendInvite = (email:string) => {
    alert(`Resent invite to ${email}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Search users"
        />
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-400 text-left">
            <th className="p-4">Name</th>
            <th className="p-4">Role</th>
            <th className="p-4">Email</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user, index) => (
            <tr key={index} className="border-b">
              <td className="p-4 text-gray-400">{user.name}</td>
              <td className="p-4">
                <span className={`px-6 py-2 rounded-full text-white ${
                  user.role === 'Admin'
                    ? 'bg-blue-500'
                    : user.role === 'Editor'
                    ? 'bg-yellow-300'
                    : 'bg-green-300'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="p-4 text-gray-400">{user.email}</td>
              <td className="p-4 text-gray-400">{user.status}</td>
              <td className="p-4 flex-1">
                {user.status === 'Invited' ? (
                  <button
                    onClick={() => handleResendInvite(user.email)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Resend Invite

                  </button>
                ) : (
                 <div className='flex flex-col lg:flex-row gap-2'>
                   <button
                    onClick={() => handleDelete(user.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                 </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-6">
        <button className="px-3 py-2 border border-gray-300 rounded-lg mx-1">{'<'}</button>
        <span className="px-3 py-2">1</span>
        <button className="px-3 py-2 border border-gray-300 rounded-lg mx-1">{'>'}</button>
      </div>
      <Toaster/>
    </div>
  );
};

export default UsersTable;
