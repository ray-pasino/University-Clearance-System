"use client";
import React, { useState, useEffect } from "react";
import DashNavbar from "../components/DashNavbar";
import Slider from "../components/Slider";
import Image from "next/image";
import { FilePlus, FileSearch, FileX, ShieldCheck, LogOut } from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [openSlider, setOpenSlider] = useState(false);
  const [studentData, setStudentData] = useState<any>(null);
  const router = useRouter();

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
    <div className="sm:flex">
      {/* Sidebar */}
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
                  href="student-profile/clearance"
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
                  href="student-profile/clearance"
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
                  href="student-profile/clearance"
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

          <ul className="mb-8 space-y-12 text-[12px] font-semibold w-full px-4 border-t-1 border-gray-200 pt-4">
            <li className="text-[#6A788F] cursor-pointer flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 hover:px-2 rounded-[12px]">
              <ShieldCheck size={22} />
              <span className="hidden group-hover:inline">Settings</span>
            </li>
            <li
              className="text-red-400 cursor-pointer flex items-center space-x-2 hover:bg-red-200 py-2 hover:px-2 rounded-[12px]"
              onClick={handleLogout}
            >
              <LogOut size={22} />
              <span className="hidden group-hover:inline">Logout</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="wrap-right sm:h-screen flex-1">
        <DashNavbar openSlider={openSlider} setOpenSlider={setOpenSlider} />
        <Slider open={openSlider} setOpen={setOpenSlider} />

        <div className="main mx-6 mt-16 sm:mt-0 sm:mx-0">
          {/* Top Header */}
          <div className="sm:hidden header flex items-center justify-center">
            <h1 className="mt-6 text-gray-600 text-center font-semibold text-lg lg:text-xl">
              GCTU Clearance System
            </h1>
          </div>

          {/* Header for Large Screens */}
          <div className="hidden sm:flex items-center justify-center mx-16 mt-2">
            <h1 className="w-[88%] text-gray-600 text-center font-semibold text-2xl lg:text-xl">
              GCTU Clearance System
            </h1>
            <div className="hidden sm:flex text-gray-400 mt-2 items-center">
              <Image
                src="/user male.png"
                height={736}
                width={736}
                alt="user profile"
                className="w-12 bg-gray-300 p-2 rounded-full"
              />
              <div className="ml-2">
                <h3 className="font-semibold text-sm">
                  {studentData?.name || "Loading..."}
                </h3>
                <p className="text-[8px]">{studentData?.email}</p>
              </div>
            </div>
          </div>

          {/* Student Info Section */}
          <div className="info-container flex flex-col sm:mx-10 sm:mb-10 mt-12">
            <div className="sm:hidden flex flex-col items-center mt-10 text-gray-400">
              <Image
                src="/user male.png"
                height={736}
                width={736}
                alt="user profile"
                className="w-28 bg-gray-300 p-3 rounded-full"
              />
              <h3 className="font-semibold text-lg md:text-2xl">
                {studentData?.name || "Loading..."}
              </h3>
              <p className="text-[10px]">{studentData?.email}</p>
            </div>

            <div className="md:mx-20 p-4 py-6 mb-6 bg-white text-gray-400 mt-6 rounded-lg text-[10px] sm:text-[13px] shadow-md">
              <ul className="space-y-6">
                <li className="flex justify-between">
                  <span className="font-bold">Faculty:</span>
                  <span className="text-black-200 font-medium">
                    {studentData?.faculty}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-bold">Department:</span>
                  <span className="text-black-200 font-medium">
                    {studentData?.department}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-bold">Programme:</span>
                  <span className="text-black-200 font-medium">
                    {studentData?.programme}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-bold">Level:</span>
                  <span className="text-black-200 font-medium">
                    {studentData?.level}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-bold">Session:</span>
                  <span className="text-black-200 font-medium">
                    {studentData?.session}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-bold">Index Number:</span>
                  <span className="text-black-200 font-medium">
                    {studentData?.indexNumber}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-bold">Campus:</span>
                  <span className="text-black-200 font-medium">
                    {studentData?.campus}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-bold">Mobile Number:</span>
                  <span className="text-black-200 font-medium">
                    {studentData?.mobileNumber}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-bold">Cohort:</span>
                  <span className="text-black-200 font-medium">
                    {studentData?.cohort}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-bold">Clearance Status:</span>
                  <span className="text-gray-300 font-medium">
                    {studentData?.clearaneStatus || "Not Requested"}
                  </span>
                </li>
                <Link href="student-profile/clearance">
                  <button className="cursor-pointer text-md bg-blue-800 text-white rounded-lg px-6 py-2 sm:py-3 transition duration-300 hover:scale-105">
                    Request Clearance
                  </button>
                </Link>
              </ul>
            </div>
          </div>
        </div>

        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
