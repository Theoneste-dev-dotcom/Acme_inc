"use client"
import React from 'react'
import UserForm from '@/components/users/AddUser'
import Sidebar from '@/components/users/Sidebar'

function page() {
  return (
    <div className="flex h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 lg:flex-2 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-600 xl:pl-32 xl:pb-8">Add User</h1>
      </div>
      <UserForm />
    </div>
  </div>
  )
}

export default page
