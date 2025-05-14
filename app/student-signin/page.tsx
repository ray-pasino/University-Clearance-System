"use client"
import React,{useState} from "react";
import Image from "next/image";
import { EyeClosed } from 'lucide-react';
import Link from "next/link";

const page = () => {

    // state for password visibility 
    const [seeAdminPassword, setSeeAdminPassword] = useState<boolean>(false)
    
    // function to handle password visibility
    const handlePasswordVisibility = ()=> {
        setSeeAdminPassword(!seeAdminPassword)
    }
  return (
    <div>
     
     <Link href="/">
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
     </Link>

      {/* main section */}
      <div className="flex flex-col items-center justify-center">
        <h3 className="my-8 font-semibold text-2xl md:text-4xl">
          Student Sign In
        </h3>

        <Image
           src="/signin.svg"
          alt="sign in svg"
          width={500}
          height={500}
          className="w-screen sm:h-72"
        />

        {/* sign in form */}

        <form className="mt-6 mb-10 flex flex-col space-y-6 items-center justify-center"> 
            {/* input for index number */}
            <input className="outline-none w-58 sm:w-78 md:w-82 lg:w-86 text-center border-1 border-blue-600 rounded-md px-6 py-2" type="text" placeholder="Student ID"/>

            {/* input for password */}
            <div>
            <span className="w-58 sm:w-78 md:w-82 lg:w-86 flex justify-center items-center border-1 border-blue-600 rounded-md">
            <input className="outline-none w-[90%] text-center  px-6 py-2" type={`${seeAdminPassword ? 'text' : 'password'}`} placeholder="password"/>
            <EyeClosed size={16}  className={`${ seeAdminPassword ? 'text-gray-400' : 'text-black-800'} cursor-pointer`} onClick={handlePasswordVisibility}/>
            </span>
            <p className="text-sm text-blue-600 cursor-pointer">forgot password?</p>
            </div>
            

            {/* sign in button */}
            <button className="cursor-pointer bg-blue-800 text-white w-58 sm:w-78 md:w-82 lg:w-86 rounded-lg px-6 py-2 transition transform duration-300 hover:scale-105">Sign In</button>
        </form> 

      </div>
    </div>  
  );
};

export default page;
