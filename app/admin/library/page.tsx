"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle, XCircle } from "lucide-react";

type Book = {
  title: string;
  dateBorrowed: string;
  status: "Returned" | "Not Returned";
};

type ClearanceRequest = {
  id: number;
  studentName: string;
  studentEmail: string;
  books: Book[];
  status: "Requested" | "Pending" | "Approved" | "Rejected";
};

const Page = () => {
  const [requests, setRequests] = useState<ClearanceRequest[]>([
    {
      id: 1,
      studentName: "Kwame Ewudzie",
      studentEmail: "4231230038@live.gctu.edu.gh",
      books: [
        {
          title: "Computer Networks",
          dateBorrowed: "10 Feb 2023",
          status: "Returned",
        },
        {
          title: "Artificial Intelligence",
          dateBorrowed: "25 Mar 2023",
          status: "Not Returned",
        },
      ],
      status: "Requested",
    },
  ]);

  const handleAction = (id: number, decision: "Approved" | "Rejected") => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: decision } : req
      )
    );
  };

  return (
    <div className="">
        <div className="flex-col">
    
    
        <div className='sm:px-12 flex flex-col sm:flex-row items-center justify-between'>
    
     
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
          
    
          </div>
  <h2 className="pl-12 sm:mb-4 md:text-lg text-gray-700 font-semibold">
    Library Clearance Requests
  </h2>
    
<div className="mx-10 p-4 py-6 sm:py-10 mb-6 bg-white text-gray-400 mt-6 rounded-lg text-[10px] sm:text-[13px] shadow-md">

  {requests.length === 0 ? (
    <p className="text-gray-500 mt-4">No requests at this time.</p>
  ) : (
    requests.map((req) => (
      <div key={req.id} className="mb-10">
        {/* Student Info */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
          <div>
            <h3 className="text-[12px] sm:text-[14px] font-bold text-gray-700">
              {req.studentName}
            </h3>
            <p className="text-[10px] sm:text-[12px] text-gray-500">
              {req.studentEmail}
            </p>
          </div>
          <span
            className={`inline-block px-3 py-1 rounded-full font-semibold text-xs ${
              req.status === "Requested"
                ? "bg-blue-100 text-blue-700"
                : req.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : req.status === "Approved"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {req.status}
          </span>
        </div>

        {/* Book Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-md overflow-hidden text-sm text-left mt-4">
            <thead className="bg-gray-100 text-gray-500 uppercase tracking-wider">
              <tr className="text-[9px] sm:text-[12px]">
                <th className="p-2">Book Title</th>
                <th className="p-2">Date Borrowed</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {req.books.map((book, i) => (
                <tr key={i}>
                  <td className="py-3 px-2 text-[12px]">{book.title}</td>
                  <td className="py-3 px-2 text-[12px]">{book.dateBorrowed}</td>
                  <td
                    className={`py-3 px-2 text-[12px] font-semibold ${
                      book.status === "Returned"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {book.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        {req.status === "Requested" && (
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={() => handleAction(req.id, "Approved")}
              className="cursor-pointer bg-green-100 text-green-700 hover:bg-green-600 hover:text-white inline-block px-3 py-2 rounded-full font-semibold text-xs transition-all duration-200"
            >
              <CheckCircle size={14} className="inline mr-1" />
              Approve
            </button>
            <button
              onClick={() => handleAction(req.id, "Rejected")}
              className="cursor-pointer bg-red-100 text-red-600 hover:bg-red-600 hover:text-white inline-block px-3 py-2 rounded-full font-semibold text-xs transition-all duration-200"
            >
              <XCircle size={14} className="inline mr-1" />
              Reject
            </button>
          </div>
        )}
      </div>
    ))
  )}
</div>


    </div>
  );
};

export default Page;
