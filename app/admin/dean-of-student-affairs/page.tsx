"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, LogOut, FileText, CheckSquare } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define interfaces for the department counts
interface DepartmentCount {
  count: number;
  department: string;
}

interface ApprovedDepartmentCount {
  approvedCount: number;
  department: string;
}

const Page = () => {
  const router = useRouter();
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const [adminData, setAdminData] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [dosaData, setDosaData] = useState({ total: 0, approved: 0 });
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

    const fetchDosaData = async () => {
      try {
        const [totalRes, approvedRes] = await Promise.all([
          axios.get("/api/admin/countdepartmetclearancerequest", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/api/admin/countdepartmentsaccepted", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const totalDosa = totalRes.data.departmentCounts.find(
          (dept: DepartmentCount) => dept.department === "Dean of Student Affairs"
        )?.count || 0;

        const approvedDosa = approvedRes.data.approvedDepartmentCounts.find(
          (dept: ApprovedDepartmentCount) => dept.department === "Dean of Student Affairs"
        )?.approvedCount || 0;

        setDosaData({ total: totalDosa, approved: approvedDosa });
      } catch (err) {
        console.error("Error fetching Dean of Students data:", err);
      }
    };

    fetchAdminData();
    fetchClearanceRequests();
    fetchDosaData();
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
          department: "Dean of Student Affairs", // Ensure this matches the department in your data
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
                  dept.name === "Dean of Student Affairs" ? { ...dept, status: decision } : dept
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

      {/* Dean of Students Department Stats */}
      <h2 className="text-lg font-semibold text-gray-700 mx-10 p-4 py-2">
        Dean of Students Department Statistics
      </h2>
      <div className="mx-10 p-4 py-6 sm:py-10 mb-6 text-gray-400 flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8 items-center">
        <div className="p-4 sm:p-8 w-full flex flex-col items-center bg-white border-t-4 border-t-red-300 rounded-2xl shadow-md transition-transform transform hover:scale-105">
          <div className="flex items-center mb-2">
            <FileText className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-red-500">{dosaData.total}</h3>
          <p className="text-sm text-gray-500">Total Requests</p>
        </div>
        <div className="p-4 sm:p-8 w-full flex flex-col items-center bg-white border-t-4 border-t-blue-300 rounded-2xl shadow-md transition-transform transform hover:scale-105">
          <div className="flex items-center mb-2">
            <CheckSquare className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-blue-500">{dosaData.approved}</h3>
          <p className="text-sm text-gray-500">Approved Requests</p>
        </div>
      </div>

      {/* Requests Section */}
      <h2 className="pl-12 sm:mb-4 md:text-lg text-gray-700 font-semibold">
        Dean of Students Clearance Requests
      </h2>

      <div className="mx-10 p-4 py-6 sm:py-10 mb-6 bg-white text-gray-400 mt-6 rounded-lg text-[10px] sm:text-[13px] shadow-md">
        {requests.length === 0 ? (
          <p className="text-gray-500 mt-4">No requests at this time.</p>
        ) : (
          requests
            .filter((req) =>
              req.departments.some((dept: any) => dept.name === "Dean of Student Affairs")
            )
            .map((req) => {
              const dosaDept = req.departments.find(
                (dept: any) => dept.name === "Dean of Student Affairs"
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
                        dosaDept?.status === "Requested"
                          ? "bg-blue-100 text-blue-700"
                          : dosaDept?.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : dosaDept?.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {dosaDept?.status}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-3">
                    <button
                      onClick={() => setShowModal(true)}
                      className="cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200 inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium"
                    >
                      View Faculty History
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
              Faculty History
            </h3>

            <table className="min-w-full divide-y divide-gray-200 rounded-md overflow-hidden text-sm text-left mt-10">
              <thead className="bg-gray-100 text-gray-500 uppercase tracking-wider">
                <tr className="text-[9px] sm:text-[12px]">
                  <th className="p-2">Book Title</th>
                  <th className="p-2">Date Borrowed</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Example Data */}
                <tr className="bg-gray-50">
                  <td colSpan={3} className="py-3 px-2 font-bold text-indigo-400">
                    Academic Year 2021 / 2022
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-[12px]">Introduction to Algorithms</td>
                  <td className="py-3 px-2 text-[12px]">12 Jan 2022</td>
                  <td className="py-3 px-2 text-[12px] text-green-600 font-semibold">Returned</td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="py-3 px-2 font-bold text-indigo-400">
                    Academic Year 2022 / 2023
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-[12px]">Computer Networks</td>
                  <td className="py-3 px-2 text-[12px]">10 Feb 2023</td>
                  <td className="py-3 px-2 text-[12px] text-green-600 font-semibold">Returned</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-[12px]">Artificial Intelligence</td>
                  <td className="py-3 px-2 text-[12px]">25 Mar 2023</td>
                  <td className="py-3 px-2 text-[12px] text-red-500 font-semibold">Not Returned</td>
                </tr>
                <tr className="bg-gray-50">
                  <td colSpan={3} className="py-3 px-2 font-bold text-indigo-400">
                    Academic Year 2023 / 2024
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-[12px]">Data Science for Beginners</td>
                  <td className="py-3 px-2 text-[12px]">18 Jan 2024</td>
                  <td className="py-3 px-2 text-[12px] text-green-600 font-semibold">Returned</td>
                </tr>
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
