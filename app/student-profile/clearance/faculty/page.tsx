"use client";
import React, { useState, useEffect } from "react";
import DashNavbar from "@/app/components/DashNavbar";
import Slider from "@/app/components/Slider";
import Image from "next/image";
import { FilePlus, FileSearch, FileX, ShieldCheck, LogOut } from "lucide-react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { studentGrades } from "@/lib/data";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  // state for slider
  const [openSlider, setOpenSlider] = useState<boolean>(false);
  const [studentData, setStudentData] = useState<any>(null);

  // state for clearance status
  const [facultyclearanceStatus, setFacultyClearanceStatus] = useState<
    "Requested" | "Pending" | "Approved" | "Rejected" | "Not Requested"
  >("Not Requested");

  const router = useRouter();

  const fetchStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "/api/student/studentclearnace/viewclearance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data.clearanceStatus;

      // ✅ Get specific department (e.g., Finance) status
      const financeDept = data.departments.find(
        (department: { name: string; status: string }) =>
          department.name === "Faculty"
      );

      if (financeDept) {
        const status =
          financeDept.status.charAt(0).toUpperCase() +
          financeDept.status.slice(1).toLowerCase();

        setFacultyClearanceStatus(status);
      } else {
        setFacultyClearanceStatus("Not Requested");
      }

      // Optional: keep this if you need all departments elsewhere
      const departmentStatuses = data.departments.map(
        (department: { name: string; status: string }) => ({
          name: department.name,
          status: department.status,
        })
      );

      console.log("Department Statuses:", departmentStatuses);
    } catch (err) {
      console.error("Failed to fetch clearance status", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    const fetchStudentData = async () => {
      try {
        const res = await axios.get("/api/student/studentdata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudentData(res.data);
      } catch (err) {
        console.error("Failed to fetch student data", err);
      }
    };

    fetchStudentData();
    fetchStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logging out ...", {
      position: "bottom-right",
      autoClose: 3000,
    });
    setTimeout(() => {
      router.push("/");
    }, 1000); // Redirect after 3 seconds
  };
  return (
    <>
      <div className="sm:flex">
        {/* wrap left */}
        <div className="wrap-left group hidden sm:fixed sm:flex top-0 left-0 h-screen w-[8%] lg:w-[6%] xl:w-[4.5%] bg-white rounded-r-[20px] hover:w-[25%] lg:hover:w-[20%] xl:hover:w-[15%] transition-all duration-300 ease-in-out z-50 shadow-md">
          <div className="head flex flex-col  w-full">
            <div className="border-b-1 border-gray-200 py-4">
              <Link href="/student-profile">
                <Image
                  src="/logo.png"
                  alt="GCTU Logo"
                  width={500}
                  height={500}
                  className="w-8 mx-2 md:w-12 mt-2"
                />
              </Link>
            </div>

            {/* slider body */}
            <div className="mt-4 flex-1 w-full">
              <ul className="mt-8 space-y-16 text-[12px] font-semibold w-full px-4">
                <li>
                  <Link
                    href="/student-profile/clearance"
                    className="text-[#6A788F] cursor-pointer flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 hover:px-2 rounded-[12px]"
                  >
                    <FilePlus size={22} />
                    <span className="hidden group-hover:inline">
                      Request Clearance
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/student-profile/clearance"
                    className="text-[#6A788F] cursor-pointer flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 hover:px-2 rounded-[12px]"
                  >
                    <FileSearch size={22} />
                    <span className="hidden group-hover:inline">
                      View Clearance
                    </span>
                  </Link>
                </li>
                <li className="text-[#6A788F] cursor-pointer flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 hover:px-2 rounded-[12px]">
                  <Link
                    href="/student-profile/clearance"
                    className="text-[#6A788F] cursor-pointer flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 hover:px-2 rounded-[12px]"
                  >
                    <FileX size={22} />
                    <span className="hidden group-hover:inline">
                      Cancel Clearance
                    </span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* account settings */}
            <ul className="mb-8 space-y-12 text-[12px] font-semibold w-full px-4 border-t-1 border-gray-200 pt-4">
              <li className="text-[#6A788F] cursor-pointer flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 hover:px-2 rounded-[12px] transition-all duration-00 ease-in-out">
                <ShieldCheck size={22} />
                <span className="hidden group-hover:inline">Settings</span>
              </li>
              <li
                className="text-red-400 cursor-pointer flex items-center space-x-2 hover:bg-red-200 py-2 hover:px-2 rounded-[12px] transition-all duration-00 ease-in-out"
                onClick={handleLogout}
              >
                <LogOut size={22} />
                <span className="hidden group-hover:inline">Logout</span>
              </li>
            </ul>
          </div>
        </div>

        {/* wrap left */}

        {/* wrap-right */}
        <div className="wrap-right sm:ml-[8%] lg:ml-[6%] xl:ml-[4.5%] h-screen overflow-y-auto flex-1">
          <DashNavbar openSlider={openSlider} setOpenSlider={setOpenSlider} />
          <Slider open={openSlider} setOpen={setOpenSlider} />

          <div className="main mx-6 mt-16 sm:mt-0 sm:mx-0 sm:mb-20">
            <div className="sm:hidden header flex items-center justify-center">
              <h1 className="mt-6 text-gray-600 text-center font-semibold md:text-md text-lg lg:text-xl">
                GCTU Clearance System
              </h1>
            </div>
            {/* larger screens */}
            <div className="hidden header sm:flex items-center justify-center items-center mx-16 md:mx-38 xl:mx-30 mt-2">
              <h1 className="w-[88%] text-gray-600 text-center font-semibold  md:text-md text-2xl lg:text-xl">
                GCTU Clearance System
              </h1>

              <div className="hidden profile-container text-gray-400 sm:flex mt-2  items-center">
                <Image
                  src="/user male.png"
                  height={736}
                  width={736}
                  alt="user profile"
                  className="w-22 sm:w-12 bg-gray-300 p-2 rounded-[50%]"
                />
                <div className="ml-2">
                  <h3 className="font-semibold text-lg sm:text-sm ">
                    {studentData?.name || "Loading..."}
                  </h3>
                  <p className="text-[10px] sm:text-[8px]">
                    {studentData?.email}
                  </p>
                </div>
              </div>
            </div>
            {/* student info section */}
            <div className="info-container flex flex-col sm:mx-10 mt-12">
              <div className="sm:hidden profile-container  text-gray-400 flex flex-col items-center justify-center mt-10  flex-1">
                <Image
                  src="/user male.png"
                  height={736}
                  width={736}
                  alt="user profile"
                  className="w-22 sm:w-28 bg-gray-300 p-3 rounded-[50%]"
                />
                <h3 className="font-semibold text-lg md:text-2xl">
                  {studentData?.name || "Loading..."}
                </h3>
                <p className="text-[10px] md:texl">{studentData?.email}</p>
              </div>

              <div className="md:mx-20 p-4 py-6 sm:py-10 mb-6 info2 bg-[#ffffff] text-gray-400 mt-6 rounded-lg text-[10px] sm:text-[13px] shadow-md">
                <h2 className="mb-4">Faculty Clearance</h2>
                <table className="min-w-full divide-y divide-gray-200 rounded-md overflow-hidden text-sm text-left">
                  <thead className="bg-gray-100 text-gray-500 uppercase tracking-wider">
                    <tr className="text-[12px]">
                      <th className="p-2">Course</th>
                      <th className="p-2">Grade</th>
                      <th className="p-2">GPA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {studentGrades.map((year, yearIdx) => (
                      <React.Fragment key={yearIdx}>
                        {year.semesters.map((semester, semIdx) => {
                          // Calculate cumulative GPA
                          const cumulativeGPA = (
                            year.semesters
                              .slice(0, semIdx + 1)
                              .reduce(
                                (acc, curr) => acc + parseFloat(curr.gpa),
                                0
                              ) /
                            (semIdx + 1)
                          ).toFixed(2);

                          return (
                            <React.Fragment key={semIdx}>
                              <tr className="bg-gray-50">
                                <td
                                  colSpan={3}
                                  className="py-3 px-2 font-bold text-indigo-400"
                                >
                                  {year.year} - {semester.name}
                                </td>
                              </tr>
                              {semester.courses.map((course, courseIdx) => (
                                <tr key={courseIdx}>
                                  <td className="py-3 px-2 text-[12px]">
                                    {course.course}
                                  </td>
                                  <td className="py-3 px-2 text-[12px]">
                                    {course.grade}
                                  </td>
                                  <td className="py-3 px-2 text-[12px]">
                                    {semester.gpa}
                                  </td>
                                </tr>
                              ))}
                              {/* Row for Cumulative GPA */}
                              <tr className="bg-gray-50">
                                <td
                                  colSpan={2}
                                  className="py-3 px-2 font-bold text-gray-600"
                                >
                                  Cumulative GPA:
                                </td>
                                <td className="py-3 px-2 text-[12px] font-bold text-indigo-400">
                                  {cumulativeGPA}
                                </td>
                              </tr>
                            </React.Fragment>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </tbody>

                  {/* Clearance Status Section */}
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="pt-6">
                        <div className="flex items-center space-x-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full font-semibold text-xs ${
                              facultyclearanceStatus === "Requested"
                                ? "bg-blue-100 text-blue-700"
                                : facultyclearanceStatus === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : facultyclearanceStatus === "Approved"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {facultyclearanceStatus}
                          </span>

                          {(facultyclearanceStatus === "Requested" ||
                            facultyclearanceStatus === "Pending") && (
                            <button
                              onClick={async () => {
                                try {
                                  const token = localStorage.getItem("token");
                                  if (!token) {
                                    router.push("/");
                                    return;
                                  }

                                  const response = await axios.post(
                                    "/api/student/studentclearnace/cancelclearance",
                                    { department: "Faculty" },
                                    {
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    }
                                  );

                                  console.log(
                                    "Cancel success:",
                                    response.data.message
                                  );

                                  toast.success(response.data.message, {
                                    position: "bottom-right",
                                    autoClose: 4000,
                                    hideProgressBar: false,
                                    closeOnClick: false,
                                    pauseOnHover: true,
                                    draggable: false,
                                    progress: undefined,
                                  });
                                  await fetchStatus();
                                } catch (error) {
                                  console.error("Cancel failed:", error);
                                  toast.error("Cancel failed", {
                                    position: "bottom-right",
                                    autoClose: 4000,
                                    hideProgressBar: false,
                                    closeOnClick: false,
                                    pauseOnHover: true,
                                    draggable: false,
                                    progress: undefined,
                                  });
                                }
                              }}
                              className="cursor-pointer bg-red-100 text-red-600 hover:bg-red-600 hover:text-red-100 inline-block px-3 py-1 rounded-full font-semibold text-xs transition-all duration-200"
                            >
                              <span className="sm:hidden">Cancel</span>
                              <span className="hidden sm:inline-block">
                                Cancel Clearance Request
                              </span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* wrap-right */}
          <Footer />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default page;
