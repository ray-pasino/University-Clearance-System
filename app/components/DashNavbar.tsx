'use client'
import React,{useState} from "react";
import Image from "next/image";
import { AlignCenter } from "lucide-react";
import Link from "next/link";

interface Props {
    openSlider:boolean;
    setOpenSlider: (value:boolean)=> void;
}

const DashNavbar = ({openSlider, setOpenSlider}: Props) => {
    
    
    const handleOpenSlider =  ()=> {
     setOpenSlider(!openSlider)
    }
  return (
    <div className="fixed w-screen bg-white top-0">
      <div className="shadow-md">
        <div className="mx-4 flex items-center justify-between">
          {/* GCTU logo */}
          <Link href='/'>
          <Image
            src="/logo.png"
            alt="GCTU Logo"
            width={500}
            height={500}
            className="w-12 cursor-pointer"
          />
          </Link>

          
          

          {/* menu icon */}
          <AlignCenter size={32} className="cursor-pointer" onClick={handleOpenSlider}/>
        </div>
      </div>
    </div>
  );
};

export default DashNavbar;
