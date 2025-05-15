"use client";
import React, { useState } from "react";
import DashNavbar from "../components/DashNavbar";
import Slider from "../components/Slider";
import { Smile, UserRound } from "lucide-react";

const page = () => {
  // state for slider
  const [openSlider, setOpenSlider] = useState<boolean>(false);

  return (
    <div>
      <DashNavbar openSlider={openSlider} setOpenSlider={setOpenSlider} />
      <Slider open={openSlider} setOpen={setOpenSlider} />

      <div className="main mx-6 mt-16">
        <h2 className="text-blue-800 mt-2 font-semibold flex text-xl items-center space-x-2 lg:mb-4">
          <Smile className="lg:hidden"/>
          <Smile size={42} className="hidden lg:flex"/>
          <span className="lg:text-4xl">Welcome, Kwame</span>
        </h2>

        {/* student info section */}
        <div className="info-container flex flex-col lg:flex-row lg:space-x-6">

          <div className="info lg:h-[30vh] flex flex-col border-2 border-gray-400 mt-6 rounded-md shadow-lg">
            <div className="identity border-b-1 border-gray-400">
              <div className="head text-center p-2">Kwame Ewudzie</div>
            </div>
            <div className="picture flex justify-center p-6">
              <UserRound size={120} />
            </div>
          </div>

          <div className="p-4 lg:h-[55vh] lg:flex-1 mb-6 info2 border-2 border-gray-400 mt-6 rounded-md shadow-lg">
            <ul className="space-y-4">
                <li className="flex items-end justify-between "><span className="font-semibold">Faculty:</span> <span className="text-black-200 font-medium float-end text-[13px] text-right">FACULTY OF COMPUTING AND INFORMATION SYSTEMS</span></li>
                <li className="flex items-end justify-between "><span className="font-semibold">Department:</span> <span className=" text-black-200 font-medium float-end text-[13px]">COMPUTER SCIENCE</span></li>
                <li className="flex items-end justify-between "><span className="font-semibold">Programme:</span> <span className=" text-black-200 font-medium float-end text-[13px]">BSc. COMPUTER SCIENCE</span></li>
                <li className="flex items-end justify-between "><span className="font-semibold">Level:</span> <span className=" text-black-200 font-medium float-end text-[13px]">400</span></li>
                <li className="flex items-end justify-between "><span className="font-semibold">Session:</span> <span className=" text-black-200 font-medium float-end text-[13px]">Morning</span></li>
                <li className="flex items-end justify-between "><span className="font-semibold">Index Number:</span> <span className=" text-black-200 font-medium float-end text-[13px]">4231230038</span></li>
                <li className="flex items-end justify-between "><span className="font-semibold">Campus:</span> <span className=" text-black-200 font-medium float-end text-[13px]">Accra</span></li>
                <li className="flex items-end justify-between "><span className="font-semibold">Mobile Number:</span> <span className=" text-black-200 font-medium float-end text-[13px]">0242049602</span></li>
                <li className="flex items-end justify-between "><span className="font-semibold">Cohort:</span> <span className=" text-black-200 font-medium float-end text-[13px]">2021/2022</span></li>
                <li className="flex items-end justify-between "><span className="font-semibold">Clearance Status:</span> <span className="text-gray-500 font-medium float-end text-[13px]">Not Requested</span></li>
            </ul>
          </div>

        </div>



      </div>
    </div>
  );
};

export default page;
