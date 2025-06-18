"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle, XCircle } from "lucide-react";

type Semester = {
  name: string;
  gpa: string;
  courses: { course: string; grade: string }[];
};

type AcademicYear = {
  year: string;
  semesters: Semester[];
};

type FacultyClearanceRequest = {
  id: number;
  studentName: string;
  studentEmail: string;
  grades: AcademicYear[];
  status: "Requested" | "Pending" | "Approved" | "Rejected";
};

const Page = () => {
  const [requests, setRequests] = useState<FacultyClearanceRequest[]>([
    {
      id: 1,
      studentName: "Kwame Ewudzie",
      studentEmail: "4231230038@live.gctu.edu.gh",
      grades: [
        {
          year: "2021/2022",
          semesters: [
            {
              name: "Semester 1",
              gpa: "3.4",
              courses: [
                { course: "CS101", grade: "A" },
                { course: "Math102", grade: "B+" },
              ],
            },
            {
              name: "Semester 2",
              gpa: "3.6",
              courses: [
                { course: "CS201", grade: "A-" },
                { course: "Math202", grade: "B" },
              ],
            },
          ],
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
    <div className="mx-6 sm:mx-12 my-4">
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
    
          </div>

      <h2 className="text-md font-bold mb-4 text-gray-700 font-semibold pl-2">
        Faculty Clearance Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests at the moment.</p>
      ) : (
        requests.map((req) => (
          <div key={req.id} className="mb-10 bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-bold text-sm text-gray-700">
                  {req.studentName}
                </h3>
                <p className="text-xs text-gray-500">{req.studentEmail}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full font-semibold text-xs ${
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

            <div className="overflow-x-auto text-[12px]">
              {req.grades.map((year, yIdx) => (
                <div key={yIdx} className="mb-4">
                  {year.semesters.map((sem, sIdx) => (
                    <div key={sIdx}>
                      <h4 className="font-semibold text-indigo-500 mb-1">
                        {year.year} - {sem.name}
                      </h4>
                      <table className="min-w-full mb-3 text-left border">
                        <thead className="bg-gray-100 text-gray-600">
                          <tr>
                            <th className="p-2">Course</th>
                            <th className="p-2">Grade</th>
                            <th className="p-2">GPA</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sem.courses.map((course, cIdx) => (
                            <tr key={cIdx} className="border-t">
                              <td className="p-2">{course.course}</td>
                              <td className="p-2">{course.grade}</td>
                              <td className="p-2">{sem.gpa}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {req.status === "Requested" && (
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <button
                  onClick={() => handleAction(req.id, "Approved")}
                  className="bg-green-100 text-green-700 hover:bg-green-600 hover:text-white px-3 py-1 rounded-full font-semibold text-xs transition"
                >
                  <CheckCircle size={14} className="inline mr-1" />
                  Approve
                </button>
                <button
                  onClick={() => handleAction(req.id, "Rejected")}
                  className="bg-red-100 text-red-600 hover:bg-red-600 hover:text-white px-3 py-1 rounded-full font-semibold text-xs transition"
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
  );
};

export default Page;
