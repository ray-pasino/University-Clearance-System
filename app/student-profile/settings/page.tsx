"use client";
import React, { useState, useEffect } from "react";
import DashNavbar from "@/app/components/DashNavbar";
import Slider from "@/app/components/Slider";
import Image from "next/image";
import {
  FilePlus,
  FileSearch,
  FileX,
  ShieldCheck,
  LogOut,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const [studentData, setStudentData] = useState<any>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/student/changepassword",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Password changed successfully", {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Current password is incorrect",
        {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const router = useRouter();
  // fuction for clearance request

  const requestClearance = async (department: string) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to request clearance.");

    try {
      const response = await axios.post(
        "/api/student/studentclearnace",
        { department },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Axios response:", response);
      toast.success(response.data.message, {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } catch (error: any) {
      console.error("Clearance error:", error);
      if (error.response) {
        toast.error(error.response.data.error || error.response.data.message, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      } else {
        toast.error("An error occurred while requesting clearance.", {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      }
    }
  };

  //function for clearance request

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
              <button
                className="cursor-pointer bg-blue-200 p-2 font-normal px-8 text-[12px] rounded-md"
                onClick={() => {
                  requestClearance("Finance");
                  setClearFinanace(false); // Close the modal
                }}
              >
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
            <Link href="/student-profile/clearance/library">
              <button
                className="cursor-pointer bg-blue-200 p-2 font-normal px-8 text-[12px] rounded-md"
                onClick={() => {
                  requestClearance("Library");
                  setClearFinanace(false); // Close the modal
                }}
              >
                Yes
              </button>
            </Link>
            <button
              className="cursor-pointer bg-red-400 p-2 font-normal px-8 text-[12px] rounded-md"
              onClick={handleClearLibrary}
            >
              No
            </button>
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
              <button
                className="cursor-pointer bg-blue-200 p-2 font-normal px-8 text-[12px] rounded-md"
                onClick={() => {
                  requestClearance("Faculty");
                  setClearFinanace(false); // Close the modal
                }}
              >
                Yes
              </button>
            </Link>
            <button
              className="cursor-pointer bg-red-400 p-2 font-normal px-8 text-[12px] rounded-md"
              onClick={handleClearFaculty}
            >
              No
            </button>
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
              <button className="cursor-pointer bg-blue-200 p-2 font-normal px-8 text-[12px] rounded-md">
                Yes
              </button>
            </Link>
            <button
              className="cursor-pointer bg-red-400 p-2 font-normal px-8 text-[12px] rounded-md"
              onClick={handleClearAlumni}
            >
              No
            </button>
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
              <button
                className="cursor-pointer bg-blue-200 p-2 font-normal px-8 text-[12px] rounded-md"
                onClick={() => {
                  requestClearance("Head of Departments");
                  setClearFinanace(false); // Close the modal
                }}
              >
                Yes
              </button>
            </Link>
            <button
              className="cursor-pointer bg-red-400 p-2 font-normal px-8 text-[12px] rounded-md"
              onClick={handleClearHod}
            >
              No
            </button>
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
              <button
                className="cursor-pointer bg-blue-200 p-2 font-normal px-8 text-[12px] rounded-md"
                onClick={() => {
                  requestClearance("Dean of Student Affairs");
                  setClearFinanace(false); // Close the modal
                }}
              >
                Yes
              </button>
            </Link>
            <button
              className="cursor-pointer bg-red-400 p-2 font-normal px-8 text-[12px] rounded-md"
              onClick={handleClearDean}
            >
              No
            </button>
          </div>
        </div>
      </div>

      {/* confirmation modal  */}

      <div className="sm:flex">
        {/* wrap left */}
        <div className="wrap-left group h-screen hidden sm:flex w-[8%] lg:w-[6%] xl:w-[4.5%] bg-[#ffffff] rounded-[20px] hover:w-[25%] lg:hover:w-[20%] xl:hover:w-[15%] transition-all duration-300 ease-in-out">
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
                    href="/student-profile/view_clearance"
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
              <Link href="/student-profile/settings">
                <li className="text-[#6A788F] cursor-pointer flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 hover:px-2 rounded-[12px] transition-all duration-00 ease-in-out">
                  <ShieldCheck size={22} />
                  <span className="hidden group-hover:inline">Settings</span>
                </li>
              </Link>

              <li className="text-red-400 cursor-pointer flex items-center space-x-2 hover:bg-red-200 py-2 hover:px-2 rounded-[12px] transition-all duration-00 ease-in-out">
                <LogOut size={22} />
                <span
                  className="hidden group-hover:inline"
                  onClick={handleLogout}
                >
                  Logout
                </span>
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

              <div className="md:mx-20 p-4 py-6 sm:py-10 mb-6 info2 bg-[#ffffff]  text-gray-400 mt-6 rounded-lg text-[10px] sm:text-[13px] shadow-md">
                <h2 className="text-gray-700 font-bold mb-4 text-base sm:text-lg">
                  Change Password
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1 text-gray-500 text-xs sm:text-sm">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-500 text-xs sm:text-sm">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-500 text-xs sm:text-sm">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button
                    type="submit"
                    className="cursor-pointer w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
                    disabled={isLoading}
                    onClick={handleChangePassword}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </button>
                </div>
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
