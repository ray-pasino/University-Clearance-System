import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
      <div className="mb-12 flex flex-col items-center space-y-8  justify-center">
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
    </div>
  );
}
