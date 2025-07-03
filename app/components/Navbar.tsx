import React from "react";
import Image from "next/image";


const Navbar = () => {
  return (
  
      <div className="flex">
        <Image
          src="/logo.png"
          alt="GCTU Logo"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
  );
};

export default Navbar;
