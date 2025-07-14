"use client";
import React, { useState, useEffect } from "react";
import DashNavbar from "@/app/components/DashNavbar";
import Slider from "@/app/components/Slider";
import Image from "next/image";
import { FilePlus, FileSearch, ShieldCheck, LogOut, FileX } from "lucide-react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentClearancePage = () => {
  const [openSlider, setOpenSlider] = useState<boolean>(false);
  const [clearanceStatus, setClearanceStatus] = useState<
    "Requested" | "Pending" | "Approved" | "Declined" | "Not Requested"
  >("Not Requested");
  const [studentData, setStudentData] = useState<any>(null);

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

      const hodDept = data.departments.find(
        (department: { name: string; status: string }) =>
          department.name === "Head of Departments"
      );

      if (hodDept) {
        const status =
          hodDept.status.charAt(0).toUpperCase() +
          hodDept.status.slice(1).toLowerCase();

        setClearanceStatus(status as any);
      } else {
        setClearanceStatus("Not Requested");
      }
    } catch (err) {
      console.error("Failed to fetch clearance status", err);
    }
  };

  const handleRequestClearance = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.post(
        "/api/student/studentclearnace/",
        { department: "Head of Departments" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message, {
        position: "bottom-right",
        autoClose: 4000,
      });

      await fetchStatus();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to request clearance",
        {
          position: "bottom-right",
          autoClose: 4000,
        }
      );
    }
  };

  const handleCancelClearance = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.post(
        "/api/student/studentclearnace/cancelclearance",
        { department: "Head of Departments" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message, {
        position: "bottom-right",
        autoClose: 4000,
      });

      await fetchStatus();
    } catch (err) {
      toast.error("Failed to cancel clearance", {
        position: "bottom-right",
        autoClose: 4000,
      });
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
    }, 1000);
  };

  return (
    <>
      <div className="sm:flex">
        {/* SIDEBAR */}
        <div className="wrap-left group h-screen hidden sm:flex w-[8%] lg:w-[6%] xl:w-[4.5%] bg-[#ffffff] rounded-[20px] hover:w-[25%] lg:hover:w-[20%] xl:hover:w-[15%] transition-all duration-300 ease-in-out">
          <div className="head flex flex-col w-full">
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
            <div className="mt-4 flex-1 w-full">
              <ul className="mt-8 space-y-16 text-[12px] font-semibold w-full px-4">
                <li>
                  <Link
                    href="/student-profile/clearance"
                    className="text-[#6A788F] flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 px-2 rounded-[12px]"
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
                    className="text-[#6A788F] flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 px-2 rounded-[12px]"
                  >
                    <FileSearch size={22} />
                    <span className="hidden group-hover:inline">
                      View Clearance
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/student-profile/clearance"
                    className="text-[#6A788F] flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 px-2 rounded-[12px]"
                  >
                    <FileX size={22} />
                    <span className="hidden group-hover:inline">
                      Cancel Clearance
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <ul className="mb-8 space-y-12 text-[12px] font-semibold w-full px-4 border-t-1 border-gray-200 pt-4">
              <li className="text-[#6A788F] flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 px-2 rounded-[12px]">
                <ShieldCheck size={22} />
                <span className="hidden group-hover:inline">Settings</span>
              </li>
              <li
                onClick={handleLogout}
                className="text-red-400 flex items-center space-x-2 hover:bg-red-200 py-2 px-2 rounded-[12px] cursor-pointer"
              >
                <LogOut size={22} />
                <span className="hidden group-hover:inline">Logout</span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT WRAP */}
        <div className="wrap-right sm:h-screen flex-1">
          <DashNavbar openSlider={openSlider} setOpenSlider={setOpenSlider} />
          <Slider open={openSlider} setOpen={setOpenSlider} />

          <div className="main mx-6 mt-16 sm:mt-0 sm:mx-0 sm:mb-20">
            <div className="sm:hidden header flex items-center justify-center">
              <h1 className="mt-6 text-gray-600 text-center font-semibold md:text-md text-lg lg:text-xl">
                GCTU Clearance System
              </h1>
            </div>

            <div className="hidden sm:flex items-center justify-center mx-16 md:mx-38 xl:mx-30 mt-2">
              <h1 className="w-[88%] text-gray-600 text-center font-semibold md:text-md text-2xl lg:text-xl">
                GCTU Clearance System
              </h1>

              <div className="hidden sm:flex text-gray-400 items-center mt-2">
                <Image
                  src="/user male.png"
                  height={736}
                  width={736}
                  alt="user profile"
                  className="w-22 sm:w-12 bg-gray-300 p-2 rounded-[50%]"
                />
                <div className="ml-2">
                  <h3 className="font-semibold text-lg sm:text-sm">
                      {studentData?.name || "Loading..."}
                  </h3>
                  <p className="text-[10px] sm:text-[8px]">
                     {studentData?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Clearance section */}
            <div className="info-container flex flex-col sm:mx-10 mt-12">
              <div className="md:mx-20 p-4 py-6 sm:py-10 mb-6 bg-[#ffffff] text-gray-400 mt-6 rounded-lg text-[12px] sm:text-[14px] shadow-md">
                <h2>HOD Clearance</h2>

                {clearanceStatus === "Not Requested" && (
                  <>
                    <p className="mt-4 text-gray-700">
                      You have not requested clearance yet.
                    </p>
                    <button
                      onClick={handleRequestClearance}
                      className="cursor-pointer mt-4 px-5 py-2 rounded-md bg-blue-800 text-white hover:bg-blue-700 transition duration-300"
                    >
                      Request Clearance
                    </button>
                  </>
                )}

                {(clearanceStatus === "Requested" ||
                  clearanceStatus === "Pending") && (
                  <div className="mt-4 flex flex-col space-y-4 text-yellow-700 font-semibold">
                    <p>
                      Your clearance request is {clearanceStatus.toLowerCase()}.
                    </p>
                    <button
                      onClick={handleCancelClearance}
                      className="cursor-pointer bg-red-100 text-red-600 hover:bg-red-600 hover:text-white inline-block px-4 py-2 rounded-md font-medium text-xs transition-all duration-200"
                    >
                      Cancel Clearance Request
                    </button>
                  </div>
                )}

                {clearanceStatus === "Approved" && (
                  <div className="mt-4 text-green-700 font-semibold">
                    Congratulations! Your clearance has been approved.
                  </div>
                )}

                {clearanceStatus === "Declined" && (
                  <div className="mt-4 text-red-700 font-semibold">
                    Your clearance request was declined.
                  </div>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default StudentClearancePage;
