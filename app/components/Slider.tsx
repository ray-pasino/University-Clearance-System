import React from "react";
import Image from "next/image";
import {
  X,
  FilePlus,
  FileSearch,
  FileX,
  ShieldCheck,
  LogOut,
} from "lucide-react";




interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Slider = ({ open, setOpen }: Props) => {
    
  return (
    <>
      <div className={`gradient fixed z-10 w-screen h-full bg-[#00000090] top-0 left-0 right-0 transition-transform duration-300 ease-in-out ${!open ? 'hidden' : ''}`}  onClick={() => setOpen(false)}></div>
      <div className={`h-screen bg-white w-[60%] sm:w-[40%] md:w-[30%] lg:w-[20%] 2xl:w-[17%] fixed z-20 top-0 left-0 transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div
          className={`slider-container mx-2 h-full flex flex-col top-0 left-0 overflow-hidden`}
        >
          {/* slider head  */}
          <div className="flex justify-center items-center border-b-1 mx-2 border-gray-200">
            {/* logo */}
            <Image
              src="/logo.png"
              alt="GCTU Logo"
              width={500}
              height={500}
              className="w-14 cursor-pointer mt-4 mb-4"
            />
            
          </div>

          {/* slider body  */}
          <div className="mt-4 ml-2 flex-1">
            {/* title */}
            <h4 className="text-sm text-blue-800 font-semibold mt-4">MENU</h4>

            <ul className="mt-8 space-y-10 text-[12px] font-semibold">
              <li className="text-[#6A788F] cursor-pointer flex items-center space-x-4">
                <FilePlus size={18} />
                <span className="font-semibold">Request Clearance</span>
              </li>
              <li className="text-[#6A788F] cursor-pointer flex items-center space-x-4">
                <FileSearch size={18} />
                <span className="font-semibold">View Clearance</span>
              </li>
              <li className="text-[#6A788F] cursor-pointer flex items-center space-x-4">
                <FileX size={18} />
                <span className="font-semibold">Cancel Clearance</span>
              </li>
            </ul>
          </div>
          {/* slider body */}

          {/* account settings */}
          <ul className="ml-2 mx-2 mb-6 border-t-1 border-gray-200 space-y-6 text-[12px] font-semibold">
            {/* title */}
            <h4 className="mt-6 text-sm text-blue-800 mb-8">SETTINGS</h4>
            {/* title */}

            <li className="text-[#6A788F] cursor-pointer flex items-center space-x-4">
              <ShieldCheck size={18} />
              <span className="font-semibold">Change Password</span>
            </li>
            <li className="text-red-400 cursor-pointer flex items-center space-x-4">
              <LogOut size={18} />
              <span className="font-semibold">Logout</span>
            </li>
          </ul>
          {/* account settings */}
        </div>
      </div>
    </>
  );
};

export default Slider;
