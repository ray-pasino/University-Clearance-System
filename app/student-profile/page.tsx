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
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                  href="student-profile/view_clearance"
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
            <Link href="/student-profile/settings">
              <li className="text-[#6A788F] cursor-pointer flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 hover:px-2 rounded-[12px]">
                <ShieldCheck size={22} />
                <span className="hidden group-hover:inline">Settings</span>
              </li>
            </Link>
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
                {studentData?.clearaneStatus === "Accepted" ? (
                  <button
                    onClick={handleOpenModal}
                    className="cursor-pointer text-md bg-blue-800 text-white rounded-lg px-6 py-2 sm:py-3 transition duration-300 hover:scale-105"
                  >
                    View Certificate
                  </button>
                ) : (
                  <Link href="student-profile/clearance">
                    <button className="cursor-pointer text-md bg-blue-800 text-white rounded-lg px-6 py-2 sm:py-3 transition duration-300 hover:scale-105">
                      Request Clearance
                    </button>
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {/* Modal for Viewing Certificate */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.85)] z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div
            className=" bg-gradient-to-br from-blue-50 to-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden border border-blue-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Certificate Header */}
            <div className="bg-blue-300 text-white p-2 text-center cert-header">
              <div className="flex justify-center items-center">
                <Image
                  src="/logo.png"
                  alt="GCTU Logo"
                  width={500}
                  height={500}
                  className="w-8 mx-2 md:w-24 mt-2 cert-logo"
                />

              </div>
              <h1 className="text-2xl font-bold text-white tracking-wider">
                OFFICIAL CLEARANCE CERTIFICATE
              </h1>
              <p className="text-black-50 text-sm mt-1">
                Issued under the authority of GCTU
              </p>
            </div>

            {/* Certificate Body */}
            <div className="px-8 py-2">
              <div className="flex justify-between border-b border-blue-100 pb-2">
                <span className="font-mono text-blue-700">
                  No: GC-{new Date().getFullYear()}-
                  {Math.floor(1000 + Math.random() * 9000)}
                </span>
                <span className="text-gray-600">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="mt-2">
                <p className="text-lg leading-relaxed">
                  This is to certify that{" "}
                  <strong className="font-semibold text-blue-800">
                    {studentData?.name}
                  </strong>
                  , having fulfilled all academic and financial obligations, is
                  hereby granted complete clearance from the Ghana Communication
                  Technology University.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8 text-sm">
                  <div>
                    <p className="text-gray-500">Index Number</p>
                    <p className="font-medium">{studentData?.indexNumber}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Programme</p>
                    <p className="font-medium">{studentData?.programme}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Completion Date</p>
                    <p className="font-medium">
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Clearance Status</p>
                    <p className="font-medium text-green-600">FULLY CLEARED</p>
                  </div>
                </div>

                {/* Signatures Section */}
                <div className="mt-12 pt-6 border-t border-blue-100">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                    <div className="signature-box">
                      <img
                        src="https://placehold.co/160x70/e5e7eb/374151?text=Registrar+Signature&font=oswald"
                        alt="Handwritten signature of Registrar in blue ink with stylized flourish"
                        className="h-14 mx-auto"
                      />
                      <img
                        src="/registrarsignature.png"
                        alt="Handwritten signature of Registrar in blue ink with stylized flourish"
                        className="h-14 mx-auto"
                      />
                      <p className="mt-2 text-xs text-gray-500">Registrar</p>
                    </div>

                    <div className="signature-box">
                      <img
                        src="https://placehold.co/160x70/e5e7eb/374151?text=Finance+Signature&font=oswald"
                        alt="Handwritten signature of Head of Finance in black ink"
                        className="h-14 mx-auto"
                      />
                      <img
                        src="/headoffinancesignature.png"
                        alt="Handwritten signature of Registrar in blue ink with stylized flourish"
                        className="h-14 mx-auto"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Head of Finance
                      </p>
                    </div>

                    <div className="signature-box">
                      <img
                        src="https://placehold.co/160x70/e5e7eb/374151?text=HOD+Signature&font=oswald"
                        alt="Handwritten signature of Department Head with distinctive underline"
                        className="h-14 mx-auto"
                      />
                      <img
                        src="/hodsignature.png"
                        alt="Handwritten signature of Registrar in blue ink with stylized flourish"
                        className="h-14 mx-auto"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Head of Department
                      </p>
                    </div>

                    <div className="signature-box">
                      <img
                        src="https://placehold.co/160x70/e5e7eb/374151?text=Dean+Signature&font=oswald"
                        alt="Stylized signature of Dean with executive flourish"
                        className="h-14 mx-auto"
                      />
                        <img
                        src="/deanofstudentssignature.png"
                        alt="Handwritten signature of Registrar in blue ink with stylized flourish"
                        className="h-14 mx-auto"
                      />
                      <p className="mt-2 text-xs text-gray-500">
                        Dean of Students
                      </p>
                    </div>
                  </div>
                </div>

                {/* Security Features */}
                <div className="mt-8 text-xs text-gray-400 flex justify-between items-center">
                  <span>
                    Security Verification: GC-
                    {Math.random().toString(36).substring(2, 10).toUpperCase()}
                  </span>
                  <span>
                    <img
                      src="https://placehold.co/80x30/1e40af/white?text=OFFICIAL&font=roboto"
                      alt="QR code for digital verification"
                      className="h-6 inline ml-2"
                    />
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons bg-blue-50 p-4 flex justify-end space-x-3 border-t border-blue-100">
              <button
                onClick={handleCloseModal}
                className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                <i className="mr-1">↓</i> Download PDF
              </button>
              <button
                onClick={() => {
                  // Implement print functionality
                  window.print();
                }}
                className="px-5 py-2 bg-white border border-blue-600 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-50 transition-colors"
              >
                <i className="mr-1">🖶</i> Print
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Page;
