import React from 'react'
import Image from "next/image";


const page = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-0">
    {/* Header */}

    <div className="flex-col">


    <div className='flex flex-col sm:flex-row items-center justify-between'>

 
      <div className="flex sm:space-x-2 items-center justify-center mb-4 sm:mb-12">
        
        {/* GCTU logo */}
        <Image
          src="/logo.png"
          alt="GCTU Logo"
          width={500}
          height={500}
          className="w-12"
          />
        {/* heading text  */}
        <h1 className="font-semibold md:text-md">GCTU Clearance System</h1>
          

      </div>

    <div className="cursor-pointer profile-container text-gray-400 sm:flex mt-2  items-center  mb-4 sm:mb-12">
                <Image
                  src="/user male.png"
                  height={736}
                  width={736}
                  alt="user profile"
                  className="w-22 ms-8 sm:ms-0 sm:w-12 bg-gray-300 p-2 rounded-[50%]"
                />
                <div className="ml-2">
  
                <h3 className="font-semibold text-lg sm:text-sm ">
                  Fafali Zokah
                </h3>
                <p className="text-[10px] sm:text-[8px]">4231230038@live.gctu.edu.gh</p>
                </div>
              </div>

      </div>
      <h2 className='hidden ms-2 sm:block mb-8 mt-[-8] text-gray-600 text-2xl'>Super Administrator Panel</h2>

      </div>
    


    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-4 rounded-2xl shadow-md border-t-4 border-blue-500">
        <h2 className="text-sm text-gray-500">Total Students</h2>
        <p className="text-2xl font-semibold text-blue-600">1,254</p>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-md border-t-4 border-green-500">
        <h2 className="text-sm text-gray-500">Cleared Students</h2>
        <p className="text-2xl font-semibold text-green-600">932</p>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-md border-t-4 border-yellow-500">
        <h2 className="text-sm text-gray-500">Pending Students</h2>
        <p className="text-2xl font-semibold text-yellow-600">322</p>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-md border-t-4 border-red-500">
        <h2 className="text-sm text-gray-500">Rejected Students</h2>
        <p className="text-2xl font-semibold text-red-600">5</p>
      </div>
    </div>

    {/* Table of Clearance Requests */}
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Clearance Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
              <th className="px-4 py-3">Student</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-3">John Doe</td>
              <td className="px-4 py-3">Library</td>
              <td className="px-4 py-3">
                <span className="text-green-600 font-medium">Cleared</span>
              </td>
              <td className="px-4 py-3">2025-06-15</td>
            </tr>
            <tr className="border-b bg-gray-50">
              <td className="px-4 py-3">Jane Smith</td>
              <td className="px-4 py-3">Finance</td>
              <td className="px-4 py-3">
                <span className="text-yellow-500 font-medium">Pending</span>
              </td>
              <td className="px-4 py-3">2025-06-14</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-3">Mark Thomas</td>
              <td className="px-4 py-3">Hostel</td>
              <td className="px-4 py-3">
                <span className="text-red-500 font-medium">Rejected</span>
              </td>
              <td className="px-4 py-3">2025-06-13</td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}

export default page



