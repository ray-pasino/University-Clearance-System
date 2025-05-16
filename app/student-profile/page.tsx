"use client";
import React, { useState } from "react";
import DashNavbar from "../components/DashNavbar";
import Slider from "../components/Slider";
import Image from "next/image";
import { Smile, UserRound } from "lucide-react";

const page = () => {
  // state for slider
  const [openSlider, setOpenSlider] = useState<boolean>(false);

  return (
    <div>
      <DashNavbar openSlider={openSlider} setOpenSlider={setOpenSlider} />
      <Slider open={openSlider} setOpen={setOpenSlider} />

      <div className="main mx-6 mt-16">
        {/* student info section */}
        <div className="info-container flex flex-col lg:flex-row lg:space-x-6">
          <div className="profile-container  text-gray-400 flex flex-col items-center justify-center mt-10">
            <Image
              src="/user male.png"
              height={736}
              width={736}
              alt="user profile"
              className="w-22 bg-gray-300 p-3 rounded-[50%]"
            />
            <h3 className="font-semibold text-lg">Kwame Ewudzie</h3>
            <p className="text-[10px]">4231230038@live.gctu.edu.gh</p>
          </div>

          <div className="p-4 py-6 lg:h-[55vh]  lg:flex-1 mb-6 info2 bg-[#ffffff]  text-gray-400 mt-6 rounded-lg text-[10px] shadow-md">
            <ul className="space-y-6">
              <li className="flex items-end justify-between ">
                <span className="font-bold">Faculty:</span>{" "}
                <span className="text-black-200 font-medium float-end  text-right">
                  Faculty Of Computing And Information Systems
                </span>
              </li>
              <li className="flex items-end justify-between ">
                <span className="font-bold">Department:</span>{" "}
                <span className=" text-black-200 font-medium float-end ">
                  Computer Science
                </span>
              </li>
              <li className="flex items-end justify-between ">
                <span className="font-bold">Programme:</span>{" "}
                <span className=" text-black-200 font-medium float-end ">
                  BSc. Computer Science
                </span>
              </li>
              <li className="flex items-end justify-between ">
                <span className="font-bold">Level:</span>{" "}
                <span className=" text-black-200 font-medium float-end ">
                  400
                </span>
              </li>
              <li className="flex items-end justify-between ">
                <span className="font-bold">Session:</span>{" "}
                <span className=" text-black-200 font-medium float-end ">
                  Morning
                </span>
              </li>
              <li className="flex items-end justify-between ">
                <span className="font-bold">Index Number:</span>{" "}
                <span className=" text-black-200 font-medium float-end ">
                  4231230038
                </span>
              </li>
              <li className="flex items-end justify-between ">
                <span className="font-bold">Campus:</span>{" "}
                <span className=" text-black-200 font-medium float-end ">
                  Accra
                </span>
              </li>
              <li className="flex items-end justify-between ">
                <span className="font-bold">Mobile Number:</span>{" "}
                <span className=" text-black-200 font-medium float-end ">
                  0242049602
                </span>
              </li>
              <li className="flex items-end justify-between ">
                <span className="font-bold">Cohort:</span>{" "}
                <span className=" text-black-200 font-medium float-end ">
                  2021/2022
                </span>
              </li>
              <li className="flex items-end justify-between ">
                <span className="font-bold">Clearance Status:</span>{" "}
                <span className="text-gray-300 font-medium float-end ">
                  Not Requested
                </span>
              </li>
                  <button className="cursor-pointer text-md bg-blue-800 text-white rounded-lg px-6 py-2 transition transform duration-300 hover:scale-105">
              Request Clearance
            </button>
            </ul>

        
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
