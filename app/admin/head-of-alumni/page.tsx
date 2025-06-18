import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <>
           <div className='sm:px-12 flex flex-col sm:flex-row items-center justify-between'>
        
         
              <div className="flex sm:space-x-2 items-center justify-center mb-4 sm:mb-12">
                
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
        
            <div className="cursor-pointer profile-container text-gray-400 sm:flex mt-2  items-center  mb-4 sm:mb-12">
                        <Image
                          src="/user male.png"
                          height={736}
                          width={736}
                          alt="user profile"
                          className="w-22 ms-8 sm:ms-0 sm:w-12 bg-gray-300 p-2 rounded-[50%]"
                        />
                        <div className="ml-2">
          
                        <h3 className="font-semibold text-lg sm:text-sm ">
                          Fafali Zokah
                        </h3>
                        <p className="text-[10px] sm:text-[8px]">4231230038@live.gctu.edu.gh</p>
                        </div>
                      </div>
        
              </div>
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-xl sm:text-2xltext-gray-700 font-semibold mb-6 text-gray-800">
        Head of Alumni Clearance
      </h1>

      <div className="space-y-6">
        {/* Sample Student Card */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-sm text-gray-700">Ama Mensah</h3>
              <p className="text-xs text-gray-500">UG202100123</p>
              <p className="text-xs text-gray-500">BSc Computer Science</p>
            </div>
            <span className="px-3 py-1 rounded-full font-semibold text-xs bg-yellow-100 text-yellow-700">
              Pending
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-2 text-sm">
            <button className="bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white px-3 py-1 rounded-full font-semibold text-xs transition">
              View
            </button>
            <button className="bg-green-100 text-green-700 hover:bg-green-600 hover:text-white px-3 py-1 rounded-full font-semibold text-xs transition">
              Clear
            </button>
          </div>
        </div>

        {/* Another Sample Student Card */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-sm text-gray-700">Kwame Asare</h3>
              <p className="text-xs text-gray-500">UG202100456</p>
              <p className="text-xs text-gray-500">BA Psychology</p>
            </div>
            <span className="px-3 py-1 rounded-full font-semibold text-xs bg-green-100 text-green-700">
              Cleared
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-2 text-sm">
            <button className="bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white px-3 py-1 rounded-full font-semibold text-xs transition">
              View
            </button>
            <button className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-xs opacity-50 cursor-not-allowed">
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default page
