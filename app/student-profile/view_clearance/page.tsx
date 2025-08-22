"use client";
import React, { useState, useEffect } from "react";
import DashNavbar from "@/app/components/DashNavbar";
import Slider from "@/app/components/Slider";
import Image from "next/image";
import { FilePlus, FileSearch, FileX, ShieldCheck, LogOut, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  const [openSlider, setOpenSlider] = useState<boolean>(false);
  const [studentData, setStudentData] = useState<any>(null);
  const [clearanceStatus, setClearanceStatus] = useState<any>({});
  const router = useRouter();

  // Function to fetch clearance status
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
      const statusMap: { [key: string]: string } = {};

      data.departments.forEach((department: { name: string; status: string }) => {
        statusMap[department.name] = department.status;
      });

      setClearanceStatus(statusMap);
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
    fetchStatus(); // Fetch clearance status when the component mounts
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

  // Function to generate department slug for URLs
  const getDepartmentSlug = (department: string) => {
    return department.toLowerCase().replace(/ /g, '-');
  };

  return (
    <>
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
                    href="/student-profile/view_clearance"
                    className="text-[#6A788F] cursor-pointer flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 hover:px-2 rounded-[12px]"
                  >
                    <FileSearch size={22} />
                    <span className="hidden group-hover:inline">View Clearance</span>
                  </Link>
                </li>
                <li className="text-[#6A788F] cursor-pointer flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 hover:px-2 rounded-[12px]">
                  <Link
                    href="/student-profile/clearance"
                    className="text-[#6A788F] cursor-pointer flex items-center space-x-2 hover:bg-[#f2f8fc] py-2 hover:px-2 rounded-[12px]"
                  >
                    <FileX size={22} />
                    <span className="hidden group-hover:inline">Cancel Clearance</span>
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
            <div className="header flex items-center justify-center">
              <h1 className="mt-6 text-gray-600 text-center font-semibold text-lg lg:text-xl">
                GCTU Clearance System
              </h1>
            </div>

            {/* Student Info Section */}
            <div className="info-container flex flex-col sm:mx-10 mt-12">
              <div className="md:mx-20 p-4 py-6 mb-6 bg-white text-gray-400 mt-6 rounded-lg text-[10px] sm:text-[13px] shadow-md">
                <ul className="space-y-6">
                  {["Finance", "Library", "Faculty", "Head of Alumni Relations", "Head of Departments", "Dean of Student Affairs"].map((dept) => {
                    const status = clearanceStatus[dept];
                    const isApproved = status === "Approved";
                    const isPending = status === "Pending";
                    
                    return (
                      <li key={dept} className="flex justify-between items-center">
                        <span className="font-bold">{dept}</span>
                        <div className="flex items-center space-x-2">
                          {isApproved && (
                            <CheckCircle className="text-green-500" size={20} />
                          )}
                          {isPending && (
                            <Clock className="text-yellow-500" size={20} />
                          )}
                          <Link href={`/student-profile/clearance/${getDepartmentSlug(dept)}`}>
                            <button className="bg-yellow-200 p-2 px-4 rounded-md cursor-pointer hover:scale-105 transition transform duration-300">
                              View Clearance
                            </button>
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default page;

