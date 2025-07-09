"use client";
import React, { useEffect, useState } from "react";
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
  const [showModal, setShowModal] = useState(false);

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
          department: "Finance", // Ensure this matches the department in your data
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

      // Update the local state to reflect the changes
      setRequests((prev) =>
        prev.map((req) =>
          req._id === requestId
            ? {
                ...req,
                departments: req.departments.map((dept: any) =>
                  dept.name === "Finance" ? { ...dept, status: decision } : dept
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
    <div>
      {/* Header */}
      <div className="sm:px-12 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex sm:space-x-2 items-center justify-center mb-4 sm:mb-12">
          <Image
            src="/logo.png"
            alt="GCTU Logo"
            width={500}
            height={500}
            className="w-12"
          />
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
            className="w-22 ms-8 sm:ms-0 sm:w-12 bg-gray-300 p-2 rounded-full"
          />
          <div className="ml-2">
            <h3 className="font-semibold text-lg sm:text-sm">
              {adminData?.name || "Loading..."}
            </h3>
            <p className="text-[10px] sm:text-[8px]">
              {adminData?.email || ""}
            </p>
          </div>
        </div>
        {showLogoutDropdown && (
          <div className="absolute right-8 mt-12 w-40 bg-red-200 hover:bg-red-100 rounded-md shadow-lg z-10">
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

      {/* Requests Section */}
      <h2 className="pl-12 sm:mb-4 md:text-lg text-gray-700 font-semibold">
        Finance Clearance Requests
      </h2>

      <div className="mx-10 p-4 py-6 sm:py-10 mb-6 bg-white text-gray-400 mt-6 rounded-lg text-[10px] sm:text-[13px] shadow-md">
        {requests.length === 0 ? (
          <p className="text-gray-500 mt-4">No requests at this time.</p>
        ) : (
          requests
            .filter((req) =>
              req.departments.some((dept: any) => dept.name === "Finance")
            )
            .map((req) => {
              const financeDept = req.departments.find(
                (dept: any) => dept.name === "Finance"
              );
              return (
                <div key={req._id} className="mb-10">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                    <div>
                      <h3 className="text-[12px] sm:text-[14px] font-bold text-gray-700">
                        {req.studentId?.name || "Unknown Student"}
                      </h3>
                      <p className="text-[10px] sm:text-[12px] text-gray-500">
                        Email: {req.studentId?.email || "N/A"}
                      </p>
                      <p className="text-[10px] sm:text-[12px] text-gray-500">
                        Requested On:{" "}
                        {new Date(req.requestedAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    <span
                      className={`inline-block px-3 py-1 rounded-full font-semibold text-xs ${
                        financeDept?.status === "Requested"
                          ? "bg-blue-100 text-blue-700"
                          : financeDept?.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : financeDept?.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {financeDept?.status}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-3">
                    <button
                      onClick={() => setShowModal(true)}
                      className="cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200 inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium"
                    >
                      View Finance History
                    </button>

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
            })
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-40 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-md shadow-lg p-6 w-[90%] max-w-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Finance History
            </h3>
            <table className="min-w-full divide-y divide-gray-200 rounded-md overflow-hidden text-sm text-left">
              <thead className="bg-gray-100 text-gray-500 uppercase tracking-wider">
                <tr className="text-[12px]">
                  <th className="p-2">Fees</th>
                  <th className="p-2">Paid</th>
                  <th className="p-2">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {["2021 / 2022", "2022 / 2023", "2023 / 2024"].map((year) => (
                  <React.Fragment key={year}>
                    <tr className="bg-gray-50">
                      <td
                        colSpan={3}
                        className="py-3 px-2 font-bold text-indigo-400"
                      >
                        Academic Year {year}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 text-[12px]">GH₵ 5,830</td>
                      <td className="py-3 px-2 text-[12px]">GH₵ 5,830</td>
                      <td className="py-3 px-2 text-[12px]">GH₵ 0.00</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <div className="mt-6 text-right">
              <button
                onClick={() => setShowModal(false)}
                className="cursor-pointer bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-full text-xs font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Page;
