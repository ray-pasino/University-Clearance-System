'use client'
import Image from "next/image";
import Link from "next/link";
import {useState, useRef, useEffect} from "react";
import Footer from "./components/Footer";
import { ChevronDown } from 'lucide-react';


export default function Home() {
    const [expand, setExpand] = useState<boolean>(false);
    const infoRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (expand && infoRef.current) {
            infoRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [expand]);


  return (
    <div className=" flex flex-col items-center">
      <div className="flex sm:space-x-2 items-center justify-center">
        {/* GCTU logo */}
        <Image
          src="/logo.png"
          alt="GCTU Logo"
          width={500}
          height={500}
          className="w-12"
        />

        {/* heading text  */}
        <h1 className="font-semibold md:text-md">GCTU Clearance System</h1>
      </div>

      {/* illustration */}

      <Image
        src="/home-illustration.svg"
        width={8000}
        height={8000}
        alt="home illustration"
        className=" w-screen md:h-80 xl:h-86 h-60 mt-10"
      />

      {/* welcome text  */}
      <p className="my-10 sm:my-12 text-center italic font-thin text-sm sm:text-md">
        Student Clearance faster, reliable, and secure !
      </p>

      {/* sign in options */}

      <div className="mb-6 flex flex-col items-center space-y-8  justify-center">
        <Link href="/student-signin" className="text-center">
          <button className="font-sans cursor-pointer student bg-blue-800  px-20 py-4 sm:px-24 md:px-40 md:py-4  text-white rounded-md text-center transition duration-300 transform hover:scale-105 hover:shadow-sm">
            Student Sign In
          </button>
        </Link>

        <Link href="/admin-signin" className="text-center">
          <button className="cursor-pointer admin bg-blue-800  px-20 py-4 sm:px-24 md:px-40 md:py-4  text-white rounded-md text-center transition duration-300 transform hover:scale-105 hover:shadow-sm">
            Admin Sign In
          </button>
        </Link>
      </div>

        <div className="firt-timers-info text-center mb-4">

        <h2 className="flex items-center mb-2 justify-center">Is this your first time here ? <ChevronDown size={13} className={`ms-[3px] transition-transform ease-in-out duration-300 cursor-pointer ${expand ? 'rotate-180' : ''}`} onClick={ ()=> setExpand(!expand)}/> </h2>
            <div ref={infoRef} className={`text-left bg-[#F9F7CC] opacity-80 overflow-hidden transition-transform ease-in-out duration-300 ${expand ? 'max-h-100 p-8 mx-42' : 'max-h-0 p-0 mx-0'} `}>For students, log in using your <strong>GCTU Index Number</strong> as your Username / <strong>GCTU STUDENT EMAIL</strong>, and <span className="text-red-500">HopJogRun985!</span> as the default password.
                <hr className="my-6"/>
                F faculty and staff, log in using your <strong>GCTU Username</strong>(i.e. your GCTU Email Address without the @gctu.edu.gh) / <strong>GCTU Official Email</strong>, and <span className="text-red-500">HopJogRun986!</span> as the default password.
                All first time users are required to change the default password to their own for personal security and privacy. If you don't know your login credentials, or you encounter any difficulty logging in, kindly contact the 0340009000, for assistance.
            </div>
        </div>


      <Footer/>
    </div>
  );
}
