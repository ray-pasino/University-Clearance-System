"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle, XCircle, LogOut } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const router = useRouter();
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const [adminData, setAdminData] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logging out ...", {
      position: "bottom-right",
      autoClose: 3000,
    });
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/");

    const fetchAdminData = async () => {
      try {
        const res = await axios.get("/api/admin/admindata", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminData(res.data);
      } catch (err) {
        console.error("Failed to fetch admin data", err);
      }
    };

    const fetchClearanceRequests = async () => {
      try {
        const res = await axios.get("/api/admin/viewclearancerequests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data.data);
      } catch (err) {
        console.error("Error fetching clearance requests:", err);
      }
    };

    fetchAdminData();
    fetchClearanceRequests();
  }, [router]);

  const handleAction = async (
    requestId: string,
    decision: "Approved" | "Rejected"
  ) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("No token found");

    const endpoint =
      decision === "Approved"
        ? "/api/admin/acceptclearancerequest"
        : "/api/admin/rejectclearancerequests";

    try {
      const res = await axios.post(
        endpoint,
        {
          requestId,
          department: "Head of Departments",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message, {
        position: "bottom-right",
        autoClose: 3000,
      });

      setRequests((prev) =>
        prev.map((req) =>
          req._id === requestId
            ? {
                ...req,
                departments: req.departments.map((dept: any) =>
                  dept.name === "Head of Departments"
                    ? { ...dept, status: decision }
                    : dept
                ),
              }
            : req
        )
      );
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.error || "Something went wrong. Try again.";
      toast.error(errMsg, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="">
      <div className="flex-col">
        <div className="sm:px-12 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex sm:space-x-2 items-center justify-center mb-4 sm:mb-12">
            {/* GCTU logo */}
            <Image
              src="/logo.png"
              alt="GCTU Logo"
              width={500}
              height={500}
              className="w-12"
            />
            {/* heading text */}
            <h1 className="font-semibold md:text-md">GCTU Clearance System</h1>
          </div>

          <div
            className="cursor-pointer profile-container text-gray-400 sm:flex mt-2 items-center mb-4 sm:mb-12"
            onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
          >
            <Image
              src="/user male.png"
              height={736}
              width={736}
              alt="user profile"
              className="w-22 ms-8 sm:ms-0 sm:w-12 bg-gray-300 p-2 rounded-[50%]"
            />
            <div className="ml-2">
              <h3 className="font-semibold text-lg sm:text-sm ">
                {adminData?.name || "Loading..."}
              </h3>
              <p className="text-[10px] sm:text-[8px]">
                {" "}
                {adminData?.email || ""}
              </p>
            </div>
          </div>
        </div>
        {showLogoutDropdown && (
          <div className="absolute right-8 mt-[-42px] w-40 bg-red-200 hover:bg-red-100 rounded-md shadow-lg z-10">
            <button
              className="cursor-pointer flex items-center block w-full text-left px-4 py-2 text-sm text-red-400"
              onClick={handleLogout}
            >
              <LogOut size={12} className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>

      <h2 className="pl-12 sm:mb-4 md:text-lg text-gray-700 font-semibold">
        HOD Clearance Requests
      </h2>

      <div className="mx-10 p-4 py-6 sm:py-10 mb-6 bg-white text-gray-400 mt-6 rounded-lg text-[10px] sm:text-[13px] shadow-md">
        {(() => {
          const hodRequests = requests.filter((req) =>
            req.departments.some(
              (dept: any) => dept.name === "Head of Departments"
            )
          );

          if (hodRequests.length === 0) {
            return (
              <p className="text-gray-500 mt-4">No requests at this time.</p>
            );
          }

          return hodRequests.map((req) => {
            const hodRequests = req.departments.find(
              (dept: any) => dept.name === "Library"
            );
            return (
              <div key={req._id} className="mb-10">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                  <div>
                    <h3 className="text-[12px] sm:text-[14px] font-bold text-gray-700">
                      {req.studentId?.name || "Unknown Student"}
                    </h3>
                    <p className="text-[10px] sm:text-[12px] text-gray-500">
                      Clearance ID: {req.studentId?._id || "N/A"}
                    </p>
                    <p className="text-[10px] sm:text-[12px] text-gray-500">
                      Requested On:{" "}
                      {new Date(req.requestedAt).toLocaleDateString("en-GB")}
                    </p>
                  </div>

                  <span
                    className={`inline-block px-3 py-1 rounded-full font-semibold text-xs ${
                      hodRequests?.status === "Requested"
                        ? "bg-blue-100 text-blue-700"
                        : hodRequests?.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : hodRequests?.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {hodRequests?.status}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <button
                    onClick={() => handleAction(req._id, "Approved")}
                    className="cursor-pointer bg-green-100 text-green-700 hover:bg-green-600 hover:text-white inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium"
                  >
                    <CheckCircle size={14} />
                    Accept Request
                  </button>

                  <button
                    onClick={() => handleAction(req._id, "Rejected")}
                    className="cursor-pointer bg-red-100 text-red-600 hover:bg-red-600 hover:text-white inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium"
                  >
                    <XCircle size={14} />
                    Cancel Request
                  </button>
                </div>
              </div>
            );
          });
        })()}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Page;
