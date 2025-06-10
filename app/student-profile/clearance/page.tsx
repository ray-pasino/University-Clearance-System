"use client";
import React, { useState } from "react";
import DashNavbar from "@/app/components/DashNavbar";
import Slider from "@/app/components/Slider";
import Image from "next/image";
import { FilePlus, FileSearch, FileX, ShieldCheck, LogOut } from "lucide-react";
import Link from "next/link";
import Footer from "@/app/components/Footer";

const page = () => {
  // state for slider
  const [openSlider, setOpenSlider] = useState<boolean>(false);

  //   state for  clearance modal
  const [ClearFinanace, setClearFinanace] = useState<boolean>(false);
  const [clearLibrary, setClearLibrary] = useState<boolean>(false);
  const [clearFaculty, setClearFaculty] = useState<boolean>(false);
  const [clearAlumni, setClearAlumni] = useState<boolean>(false);
  const [clearHod, setClearHod] = useState<boolean>(false);
  const [clearDean, setClearDean] = useState<boolean>(false);

  const handleClearFinance = () => setClearFinanace(!ClearFinanace);
  const handleClearLibrary = () => setClearLibrary(!clearLibrary);
  const handleClearFaculty = () => setClearFaculty(!clearFaculty);
  const handleClearAlumni = () => setClearAlumni(!clearAlumni);
  const handleClearHod = () => setClearHod(!clearHod);
  const handleClearDean = () => setClearDean(!clearDean);

  return (
    <>
      {/* confirmation modal  */}

      {/* clear finance confirmation modal */}
      <div
        className={`gradient fixed z-30 w-screen h-full bg-[#00000090] top-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
          !ClearFinanace ? "hidden" : ""
        }`}
        onClick={handleClearFinance}
      ></div>
      <div className="flex items-center justify-center">
        <div
          className={`confirmation-container text-gray-600 font-semibold p-4 sm:p-8 mx-4 top-[35%] bg-[#ffffff] absolute rounded-md z-40 ${
            !ClearFinanace ? "hidden" : ""
          }`}
        >
          Do You Want To Initiate Clearance For Finance?
          <div className="buttons flex space-x-4 mt-4 sm:mt-8">
            <Link href="/student-profile/clearance/finance">
            <button className="cursor-pointer bg-blue-200 p-2 font-normal px-8 text-[12px] rounded-md">
              Yes
            </button>
            </Link>
            <button
              className="cursor-pointer bg-red-400 p-2 font-normal px-8 text-[12px] rounded-md"
              onClick={handleClearFinance}
            >
              No
            </button>
          </div>
        </div>
      </div>
      {/* clear finance confirmation modal */}

 {/* clear library confirmation modal */}
<div
  className={`gradient fixed z-30 w-screen h-full bg-[#00000090] top-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
    !clearLibrary ? "hidden" : ""
  }`}
  onClick={handleClearLibrary}
></div>
<div className="flex items-center justify-center">
  <div
    className={`confirmation-container text-gray-600 font-semibold p-4 sm:p-8 mx-4 top-[35%] bg-[#ffffff] absolute rounded-md z-40 ${
      !clearLibrary ? "hidden" : ""
    }`}
  >
    Do You Want To Initiate Clearance For Library?

    <div className="buttons flex space-x-4 mt-4 sm:mt-8">
      <Link href='/student-profile/clearance/library'>
      <button className="cursor-pointer bg-blue-200 p-2 font-normal px-8 text-[12px] rounded-md">Yes</button>
      </Link>
      <button className="cursor-pointer bg-red-400 p-2 font-normal px-8 text-[12px] rounded-md" onClick={handleClearLibrary}>No</button>
    </div>
  </div>
</div>



{/* clear faculty confirmation modal */}
<div
  className={`gradient fixed z-30 w-screen h-full bg-[#00000090] top-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
    !clearFaculty ? "hidden" : ""
  }`}
  onClick={handleClearFaculty}
></div>
<div className="flex items-center justify-center">
  <div
    className={`confirmation-container text-gray-600 font-semibold p-4 sm:p-8 mx-4 top-[35%] bg-[#ffffff] absolute rounded-md z-40 ${
      !clearFaculty ? "hidden" : ""
    }`}
  >
    Do You Want To Initiate Clearance For Faculty?

    <div className="buttons flex space-x-4 mt-4 sm:mt-8">
      <Link href="/student-profile/clearance/faculty">
      <button className="cursor-pointer bg-blue-200 p-2 font-normal px-8 text-[12px] rounded-md">Yes</button>
      </Link>
      <button className="cursor-pointer bg-red-400 p-2 font-normal px-8 text-[12px] rounded-md" onClick={handleClearFaculty}>No</button>
    </div>
  </div>
</div>




{/* clear alumni confirmation modal */}
<div
  className={`gradient fixed z-30 w-screen h-full bg-[#00000090] top-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
    !clearAlumni ? "hidden" : ""
  }`}
  onClick={handleClearAlumni}
></div>
<div className="flex items-center justify-center">
  <div
    className={`confirmation-container text-gray-600 font-semibold p-4 sm:p-8 mx-4 top-[35%] bg-[#ffffff] absolute rounded-md z-40 ${
      !clearAlumni ? "hidden" : ""
    }`}
  >
    Do You Want To Initiate Clearance For Head of Alumni Relations?

    <div className="buttons flex space-x-4 mt-4 sm:mt-8">
      <Link href="/student-profile/clearance/head-of-alumni">
      <button className="cursor-pointer bg-blue-200 p-2 font-normal px-8 text-[12px] rounded-md">Yes</button>
      </Link>
      <button className="cursor-pointer bg-red-400 p-2 font-normal px-8 text-[12px] rounded-md" onClick={handleClearAlumni}>No</button>
    </div>
  </div>
</div>

{/* clear HOD confirmation modal */}
<div
  className={`gradient fixed z-30 w-screen h-full bg-[#00000090] top-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
    !clearHod ? "hidden" : ""
  }`}
  onClick={handleClearHod}
></div>
<div className="flex items-center justify-center">
  <div
    className={`confirmation-container text-gray-600 font-semibold p-4 sm:p-8 mx-4 top-[35%] bg-[#ffffff] absolute rounded-md z-40 ${
      !clearHod ? "hidden" : ""
    }`}
  >
    Do You Want To Initiate Clearance For Head of Departments?

    <div className="buttons flex space-x-4 mt-4 sm:mt-8">
      <Link href="/student-profile/clearance/hod">
      <button className="cursor-pointer bg-blue-200 p-2 font-normal px-8 text-[12px] rounded-md">Yes</button>
      </Link>
      <button className="cursor-pointer bg-red-400 p-2 font-normal px-8 text-[12px] rounded-md" onClick={handleClearHod}>No</button>
    </div>
  </div>
</div>

{/* clear Dean confirmation modal */}
<div
  className={`gradient fixed z-30 w-screen h-full bg-[#00000090] top-0 left-0 right-0 transition-transform duration-300 ease-in-out ${
    !clearDean ? "hidden" : ""
  }`}
  onClick={handleClearDean}
></div>
<div className="flex items-center justify-center">
  <div
    className={`confirmation-container text-gray-600 font-semibold p-4 sm:p-8 mx-4 top-[35%] bg-[#ffffff] absolute rounded-md z-40 ${
      !clearDean ? "hidden" : ""
    }`}
  >
    Do You Want To Initiate Clearance For Dean of Student Affairs?

    <div className="buttons flex space-x-4 mt-4 sm:mt-8">
      <Link href="/student-profile/clearance/dean-of-student-affairs">
      <button className="cursor-pointer bg-blue-200 p-2 font-normal px-8 text-[12px] rounded-md">Yes</button>
      </Link>
      <button className="cursor-pointer bg-red-400 p-2 font-normal px-8 text-[12px] rounded-md" onClick={handleClearDean}>No</button>
    </div>
  </div>
</div>


      {/* confirmation modal  */}

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
                  <FileX size={22} />
                  <span className="hidden group-hover:inline">
                    Cancel Clearance
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

        {/* wrap left */}

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
                    Kwame Ewudzie
                  </h3>
                  <p className="text-[10px] sm:text-[8px]">
                    4231230038@live.gctu.edu.gh
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
                  Kwame Ewudzie
                </h3>
                <p className="text-[10px] md:texl">
                  4231230038@live.gctu.edu.gh
                </p>
              </div>

              <div className="md:mx-20 p-4 py-6 sm:py-10 mb-6 info2 bg-[#ffffff]  text-gray-400 mt-6 rounded-lg text-[10px] sm:text-[13px] shadow-md">
                <ul className="space-y-6 sm:space-y-14">
                  <li className="flex items-center justify-between">
                    <span className="font-bold sm:text-lg sm:font-medium">
                      Finance
                    </span>{" "}
                    <span className="sm:hidden text-black-200 font-medium space-x-4">
                      <button
                        className="bg-blue-200 p-1 rounded-md cursor-pointer hover:scale-105 transition transform duration-300"
                        onClick={handleClearFinance}
                      >
                        <FilePlus size={13} />
                      </button>{" "}
                      <button className="bg-yellow-200 p-1 rounded-md cursor-pointer hover:scale-105 transition transform duration-300">
                        <FileSearch size={13} />
                      </button>
                    </span>
                    {/* large screens */}
                    <span className="hidden sm:flex text-black-200 font-medium space-x-8 lg:space-x-12">
                      <button
                        className="bg-blue-200 p-2 px-4 rounded-md cursor-pointer hover:scale-105 transition transform duration-300"
                        onClick={handleClearFinance}
                      >
                        Request Clearance
                      </button>{" "}
                      <button className="bg-yellow-200 p-2 px-4 rounded-md cursor-pointer hover:scale-105 transition transform duration-300">
                        View Clearance
                      </button>
                    </span>
                  </li>
                  <li className="flex items-center justify-between ">
                    <span className="font-bold sm:text-lg sm:font-medium">
                      Library
                    </span>{" "}
                    <span className="sm:hidden text-black-200 font-medium space-x-4">
                      <button className="bg-blue-200 p-1 rounded-md cursor-pointer hover:scale-105 transition transform duration-300"  onClick={handleClearLibrary}>
                        <FilePlus size={13} />
                      </button>{" "}
                      <button className="bg-yellow-200 p-1 rounded-md cursor-pointer hover:scale-105 transition transform duration-300">
                        <FileSearch size={13} />
                      </button>
                    </span>
                    {/* large screens */}
                    <span className="hidden sm:flex text-black-200 font-medium space-x-8 lg:space-x-12">
                      <button className="bg-blue-200 p-2 px-4 rounded-md cursor-pointer hover:scale-105 transition transform duration-300"  onClick={handleClearLibrary}>
                        Request Clearance
                      </button>{" "}
                      <button className="bg-yellow-200 p-2 px-4 rounded-md cursor-pointer hover:scale-105 transition transform duration-300">
                        View Clearance
                      </button>
                    </span>
                  </li>
                           <li className="flex items-center justify-between ">
                    <span className="font-bold sm:text-lg sm:font-medium">
                      Faculty
                    </span>{" "}
                    <span className="sm:hidden text-black-200 font-medium space-x-4">
                      <button className="bg-blue-200 p-1 rounded-md cursor-pointer hover:scale-105 transition transform duration-300"  onClick={handleClearFaculty}>
                        <FilePlus size={13} />
                      </button>{" "}
                      <button className="bg-yellow-200 p-1 rounded-md cursor-pointer hover:scale-105 transition transform duration-300">
                        <FileSearch size={13} />
                      </button>
                    </span>
                    {/* large screens */}
                    <span className="hidden sm:flex text-black-200 font-medium space-x-8 lg:space-x-12">
                      <button className="bg-blue-200 p-2 px-4 rounded-md cursor-pointer hover:scale-105 transition transform duration-300"  onClick={handleClearFaculty}>
                        Request Clearance
                      </button>{" "}
                      <button className="bg-yellow-200 p-2 px-4 rounded-md cursor-pointer hover:scale-105 transition transform duration-300">
                        View Clearance
                      </button>
                    </span>
                  </li>
                  <li className="flex items-center justify-between ">
                    <span className="font-bold sm:text-lg sm:font-medium">
                      Head of Alumni Relations
                    </span>{" "}
                    <span className="sm:hidden text-black-200 font-medium space-x-4">
                      <button className="bg-blue-200 p-1 rounded-md cursor-pointer hover:scale-105 transition transform duration-300"  onClick={handleClearAlumni}>
                        <FilePlus size={13} />
                      </button>{" "}
                      <button className="bg-yellow-200 p-1 rounded-md cursor-pointer hover:scale-105 transition transform duration-300">
                        <FileSearch size={13} />
                      </button>
                    </span>
                    {/* large screens */}
                    <span className="hidden sm:flex text-black-200 font-medium space-x-8 lg:space-x-12">
                      <button className="bg-blue-200 p-2 px-4 rounded-md cursor-pointer hover:scale-105 transition transform duration-300" onClick={handleClearAlumni}>
                        Request Clearance
                      </button>{" "}
                      <button className="bg-yellow-200 p-2 px-4 rounded-md cursor-pointer hover:scale-105 transition transform duration-300">
                        View Clearance
                      </button>
                    </span>
                  </li>
                  <li className="flex items-center justify-between ">
                    <span className="font-bold sm:text-lg sm:font-medium">
                      Head of Departmens
                    </span>{" "}
                    <span className="sm:hidden text-black-200 font-medium space-x-4">
                      <button className="bg-blue-200 p-1 rounded-md cursor-pointer hover:scale-105 transition transform duration-300" onClick={handleClearHod}>
                        <FilePlus size={13} />
                      </button>{" "}
                      <button className="bg-yellow-200 p-1 rounded-md cursor-pointer hover:scale-105 transition transform duration-300">
                        <FileSearch size={13} />
                      </button>
                    </span>
                    {/* large screens */}
                    <span className="hidden sm:flex text-black-200 font-medium space-x-8 lg:space-x-12">
                      <button className="bg-blue-200 p-2 px-4  rounded-md cursor-pointer hover:scale-105 transition transform duration-300" onClick={handleClearHod}>
                        Request Clearance
                      </button>{" "}
                      <button className="bg-yellow-200 p-2 px-4 rounded-md cursor-pointer hover:scale-105 transition transform duration-300">
                        View Clearance
                      </button>
                    </span>
                  </li>
                  <li className="flex items-center justify-between ">
                    <span className="font-bold sm:text-lg sm:font-medium">
                      Dean of Student Affairs
                    </span>{" "}
                    <span className="sm:hidden text-black-200 font-medium space-x-4">
                      <button className="bg-blue-200 p-1 rounded-md cursor-pointer hover:scale-105 transition transform duration-300" onClick={handleClearDean}>
                        <FilePlus size={13} />
                      </button>{" "}
                      <button className="bg-yellow-200 p-1 rounded-md cursor-pointer hover:scale-105 transition transform duration-300">
                        <FileSearch size={13} />
                      </button>
                    </span>
                    {/* large screens */}
                    <span className="hidden sm:flex text-black-200 font-medium space-x-8 lg:space-x-12">
                      <button className="bg-blue-200 p-2 px-4 rounded-md cursor-pointer hover:scale-105 transition transform duration-300" onClick={handleClearDean}>
                        Request Clearance
                      </button>{" "}
                      <button className="bg-yellow-200 p-2 px-4 rounded-md cursor-pointer hover:scale-105 transition transform duration-300">
                        View Clearance
                      </button>
                    </span>
                  </li>
                </ul>
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

export default page;
