"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LogOut, Users, Search } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Alumni {
  _id: string;
  name: string;
  email: string;
  gradYear: string;
  programme: string;
}

const Page = () => {
  const router = useRouter();
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const [adminData, setAdminData] = useState<any>(null);
  const [alumniList, setAlumniList] = useState<Alumni[]>([]);
  const [alumniCount, setAlumniCount] = useState<number>(0);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterProgram, setFilterProgram] = useState("");

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

    const fetchAlumni = async () => {
      try {
        const [listRes, countRes] = await Promise.all([
          axios.get("/api/admin/viewalumni", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("/api/admin/countalumni", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setAlumniList(listRes.data || []);
        setAlumniCount(countRes.data.count || 0);
      } catch (err) {
        console.error("Error fetching alumni:", err);
      }
    };

    fetchAdminData();
    fetchAlumni();
  }, [router]);

  // Apply filters
  const filteredAlumni = alumniList.filter((alumni) => {
    return (
      alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterYear ? alumni.gradYear === filterYear : true) &&
      (filterProgram ? alumni.programme === filterProgram : true)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 text-gray-800">
      {/* Header */}
      <div className="sm:px-12 flex flex-col sm:flex-row items-center justify-between p-6 border-b border-white/20 backdrop-blur-md bg-white/40 shadow-md">
        <div className="flex sm:space-x-2 items-center justify-center mb-4 sm:mb-0">
          <Image
            src="/logo.png"
            alt="GCTU Logo"
            width={500}
            height={500}
            className="w-12"
          />
          <h1 className="font-semibold text-lg text-gray-700">GCTU Alumni Dashboard</h1>
        </div>

        <div
          className="cursor-pointer profile-container text-gray-700 sm:flex mt-2 items-center"
          onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
        >
          <Image
            src="/user male.png"
            height={736}
            width={736}
            alt="user profile"
            className="w-10 h-10 bg-gray-200 p-2 rounded-full"
          />
          <div className="ml-2">
            <h3 className="font-semibold text-sm">
              {adminData?.name || "Loading..."}
            </h3>
            <p className="text-[10px] text-gray-500">{adminData?.email || ""}</p>
          </div>
        </div>
        {showLogoutDropdown && (
          <div className="absolute right-8 mt-12 w-40 bg-red-500/90 hover:bg-red-400/90 rounded-md shadow-lg z-10 backdrop-blur-md">
            <button
              className="cursor-pointer flex items-center block w-full text-left px-4 py-2 text-sm text-white"
              onClick={handleLogout}
            >
              <LogOut size={14} className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mx-10 my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:scale-105 transition-transform flex flex-col items-center justify-center">
          <Users className="w-10 h-10 text-indigo-500 mb-3" />
          <h3 className="text-3xl font-bold text-indigo-600">{alumniCount}</h3>
          <p className="text-gray-600 text-sm">Total Alumni</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="mx-10 mb-6 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 bg-white/70 backdrop-blur-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 rounded-lg border border-gray-300 bg-white/70 backdrop-blur-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
        >
          <option value="">All Years</option>
          {[...new Set(alumniList.map((a) => a.gradYear))].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          className="px-3 py-2 rounded-lg border border-gray-300 bg-white/70 backdrop-blur-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={filterProgram}
          onChange={(e) => setFilterProgram(e.target.value)}
        >
          <option value="">All Programs</option>
          {[...new Set(alumniList.map((a) => a.programme))].map((prog) => (
            <option key={prog} value={prog}>
              {prog}
            </option>
          ))}
        </select>
      </div>

      {/* Alumni List */}
      <div className="mx-10 p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-lg border border-white/20">
        <h2 className="text-lg font-semibold text-indigo-600 mb-6">Alumni Records</h2>
        {filteredAlumni.length === 0 ? (
          <p className="text-gray-500">No alumni records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead>
                <tr className="text-left text-gray-600 border-b border-gray-300">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Graduation Year</th>
                  <th className="p-3">Program</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlumni.map((alumni) => (
                  <tr
                    key={alumni._id}
                    className="hover:bg-white/60 transition-colors border-b border-gray-200"
                  >
                    <td className="p-3 font-medium text-gray-800">{alumni.name}</td>
                    <td className="p-3">{alumni.email}</td>
                    <td className="p-3">{alumni.gradYear}</td>
                    <td className="p-3">{alumni.programme}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Page;
