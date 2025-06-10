"use client";
import React, { useState } from "react";
import DashNavbar from "@/app/components/DashNavbar";
import Slider from "@/app/components/Slider";
import Image from "next/image";
import { FilePlus, FileSearch, ShieldCheck, LogOut } from "lucide-react";
import Link from "next/link";
import Footer from "@/app/components/Footer";

const StudentClearancePage = () => {
  // state for slider
  const [openSlider, setOpenSlider] = useState<boolean>(false);
  // clearance status: 'not_requested', 'pending', 'approved'
  const [clearanceStatus, setClearanceStatus] = useState<"not_requested" | "pending" | "approved">("not_requested");

  const handleRequestClearance = () => {
    // In a real app, this would trigger backend request
    setClearanceStatus("pending");
  };

  // Simulate clearance approval for demo (would normally come from backend)
  // For example purposes, approve clearance after clicking this (not shown in UI)
  // You can add a timer or manual trigger as needed.

  return (
    <>
      <div className="sm:flex">
        {/* wrap left */}
        <div className="wrap-left group h-screen hidden sm:flex w-[8%] lg:w-[6%] xl:w-[4.5%] bg-[#ffffff] rounded-[20px] hover:w-[25%] lg:hover:w-[20%] xl:hover:w-[15%] transition-all duration-300 ease-in-out">
          <div className="head flex flex-col  w-full">
            <div className="border-b-1 border-gray-200 py-4">
              <Link href="/">
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
                <li className="text-[#6A788F] cursor-pointer flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 hover:px-2 rounded-[12px] transition-all duration-00 ease-in-out">
                  <FilePlus size={22} />
                  <span className="hidden group-hover:inline">
                    Request Clearance
                  </span>
                </li>
                <li className="text-[#6A788F] cursor-pointer flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 hover:px-2 rounded-[12px] transition-all duration-00 ease-in-out">
                  <FileSearch size={22} />
                  <span className="hidden group-hover:inline">
                    View Clearance
                  </span>
                </li>
                <li className="text-[#6A788F] cursor-pointer flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 hover:px-2 rounded-[12px] transition-all duration-00 ease-in-out">
                  <ShieldCheck size={22} />
                  <span className="hidden group-hover:inline">
                    Clearance Status
                  </span>
                </li>
              </ul>
            </div>

            {/* account settings */}
            <ul className="mb-8 space-y-12 text-[12px] font-semibold w-full px-4 border-t-1 border-gray-200 pt-4">
              <li className="text-[#6A788F] cursor-pointer flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 hover:px-2 rounded-[12px] transition-all duration-00 ease-in-out">
                <ShieldCheck size={22} />
                <span className="hidden group-hover:inline">Settings</span>
              </li>
              <li className="text-red-400 cursor-pointer flex items-center space-x-2 hover:bg-red-200 py-2 hover:px-2 rounded-[12px] transition-all duration-00 ease-in-out">
                <LogOut size={22} />
                <span className="hidden group-hover:inline">Logout</span>
              </li>
            </ul>
          </div>
        </div>

        {/* wrap-left */}

        {/* wrap-right */}
        <div className="wrap-right  sm:h-screen flex-1">
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
              <h1 className="w-[88%] text-gray-600 text-center font-semibold md:text-md text-2xl lg:text-xl">
                GCTU Clearance System
              </h1>

              <div className="hidden profile-container text-gray-400 sm:flex mt-2 items-center">
                <Image
                  src="/user male.png"
                  height={736}
                  width={736}
                  alt="user profile"
                  className="w-22 sm:w-12 bg-gray-300 p-2 rounded-[50%]"
                />
                <div className="ml-2">
                  <h3 className="font-semibold text-lg sm:text-sm">Kwame Ewudzie</h3>
                  <p className="text-[10px] sm:text-[8px]">4231230038@live.gctu.edu.gh</p>
                </div>
              </div>
            </div>

            {/* clearance status section */}
            <div className="info-container flex flex-col sm:mx-10 mt-12">
              <div className="md:mx-20 p-4 py-6 sm:py-10 mb-6 info2 bg-[#ffffff] text-gray-400 mt-6 rounded-lg text-[12px] sm:text-[14px] shadow-md">
                <h2>Dean of Student Affairs Clearance</h2>
                {/* clearance info */}
                {clearanceStatus === "not_requested" && (
                  <>
                    <p className="mt-4 text-gray-700">You have not requested clearance yet.</p>
                    <button
                      onClick={handleRequestClearance}
                      className="cursor-pointer mt-4 px-5 py-2 rounded-md bg-blue-800 text-white hover:bg-blue-700 transition duration-300"
                    >
                      Request Clearance
                    </button>
                  </>
                )}

                {clearanceStatus === "pending" && (
                  <div className="mt-4 text-yellow-700 font-semibold">
                    Your clearance request is pending approval by the Dean of Students.
                  </div>
                )}

                {clearanceStatus === "approved" && (
                  <div className="mt-4 text-green-700 font-semibold">
                    Congratulations! Your clearance has been approved by the Dean of Students.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* wrap-right */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default StudentClearancePage;

