"use client";
import React, { useState, useEffect } from "react";
import DashNavbar from "@/app/components/DashNavbar";
import Slider from "@/app/components/Slider";
import Image from "next/image";
import { FilePlus, FileSearch, FileX, ShieldCheck, LogOut, Loader2 } from "lucide-react"; // Import Loader
import Link from "next/link";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const page = () => {
  // state for slider
  const [openSlider, setOpenSlider] = useState<boolean>(false);
  const [studentData, setStudentData] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    country: "",
    programme: "",
    category: "",
    intakeYear: "",
    gradYear: "",
  });
  const [loading, setLoading] = useState<boolean>(false); // Loading state

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const response = await axios.post("/api/student/alumni", formData);
      toast.success(response.data.message);
      // Optionally reset the form or redirect
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  return (
    <>
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
              <li
                className="text-red-400 cursor-pointer flex items-center space-x-2 hover:bg-red-200 py-2 hover:px-2 rounded-[12px] transition-all duration-00 ease-in-out"
                onClick={() => {
                  localStorage.removeItem("token");
                  router.push("/");
                }}
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
                <p className="text-[10px] md:texl">
                  {studentData?.email}
                </p>
              </div>

              <div className="md:mx-20 p-4 py-6 sm:py-10 mb-6 info2 bg-[#ffffff]  text-gray-400 mt-6 rounded-lg text-[10px] sm:text-[13px] shadow-md">
                <h2>Head of Alumni Clearance</h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <h3 className="text-lg font-semibold text-gray-700">
                    Undergraduate / Graduate Alumni Registration
                  </h3>

                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-1 font-medium text-gray-600"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="dob"
                        className="block mb-1 font-medium text-gray-600"
                      >
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="gender"
                        className="block mb-1 font-medium text-gray-600"
                      >
                        Gender
                      </label>
                      <input
                        type="text"
                        id="gender"
                        placeholder="Male"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-1 font-medium text-gray-600"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="johndoe@email.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="block mb-1 font-medium text-gray-600"
                      >
                        Country of Residence
                      </label>
                      <input
                        type="text"
                        id="country"
                        placeholder="Ghana"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="programme"
                        className="block mb-1 font-medium text-gray-600"
                      >
                        Programme of Study{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="programme"
                        placeholder="BSc. Computer Science"
                        required
                        value={formData.programme}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="category"
                        className="block mb-1 font-medium text-gray-600"
                      >
                        Programme Category
                      </label>
                      <input
                        type="text"
                        id="category"
                        placeholder="Undergraduate"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="intakeYear"
                        className="block mb-1 font-medium text-gray-600"
                      >
                        Year/Month of Intake{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="month"
                        id="intakeYear"
                        placeholder="07-2022"
                        required
                        value={formData.intakeYear}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="gradYear"
                        className="block mb-1 font-medium text-gray-600"
                      >
                        Year/Month of Graduation{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="month"
                        id="gradYear"
                        placeholder="08-2025"
                        required
                        value={formData.gradYear}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full cursor-pointer md:w-auto bg-blue-800 text-white font-semibold px-6 py-2 rounded-md transition transform duration-300 hover:scale-105"
                      disabled={loading} // Disable button while loading
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : "Submit Registration"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <ToastContainer position="bottom-right" /> {/* Positioning toast notifications */}
          </div>

          {/* wrap-right */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default page;
