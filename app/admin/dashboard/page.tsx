"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, EyeClosed, Loader2, Trash2 } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Types for the department and clearance request
interface Department {
  _id: string;
  name: string;
  status: string;
  updatedAt: Date;
}

interface ClearanceRequest {
  _id: string;
  studentId: {
    _id: string;
    name: string;
    department: string;
  };
  departments: Department[];
  overallStatus: string;
  requestedAt: Date;
  updatedAt: Date;
}

const Page = () => {
  const router = useRouter();
  const [showLogoutDropdown, setShowLogoutDropdown] = useState<boolean>(false);
  const [adminData, setAdminData] = useState<any>(null);
  const [adminCount, setAdminCount] = useState<number>(0);
  const [superAdminCount, setSuperAdminCount] = useState<number>(0);
  const [studentCount, setStudentCount] = useState(0);
  const [alumniCount, setAlumniCount] = useState(0);
  const [clearedCount, setClearedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [studentLoading, setStudentLoading] = useState<boolean>(false);
  const [clearanceRequests, setClearanceRequests] = useState<
    ClearanceRequest[]
  >([]); // State for clearance requests
  const [showModal, setShowModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState<boolean>(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
    department: "",
    superAdminPrivilege: false,
    password: "",
  });

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    faculty: "",
    department: "",
    programme: "",
    level: 100,
    session: "",
    indexNumber: 0,
    campus: "",
    mobileNumber: "",
    cohort: "",
    password: "",
  });
  const [showSuperAdminModal, setShowSuperAdminModal] =
    useState<boolean>(false);
  const [superAdmins, setSuperAdmins] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [showStudentsModal, setShowStudentsModal] = useState<boolean>(false);
  const [admins, setAdmins] = useState<any[]>([]);
  const [showAdminsModal, setShowAdminsModal] = useState<boolean>(false);
  const [alumnis, setAlumnis] = useState<any[]>([]);
  const [showAlumnisModal, setShowAlumnisModal] = useState<boolean>(false);

  const fetchAdminCounts = async () => {
    try {
      const adminsResponse = await axios.get("/api/admin/countadmins");
      setAdminCount(adminsResponse.data.count);

      const superAdminsResponse = await axios.get(
        "/api/admin/countsuperadmins"
      );
      setSuperAdminCount(superAdminsResponse.data.count);
    } catch (error) {
      console.error("Error fetching admin counts:", error);
    }
  };

  const fetchStudentCounts = async () => {
    try {
      const response = await axios.get("/api/admin/countstudents");
      setStudentCount(response.data.count);
    } catch (error) {
      console.error("Error fetching student counts:", error);
    }
  };

  const fetchAlumniCount = async () => {
    try {
      const response = await axios.get("/api/admin/countalumni");
      setAlumniCount(response.data.count);
    } catch (error) {
      console.error("Error fetching alumni count:", error);
    }
  };

  const fetchSuperAdmins = async () => {
    try {
      const response = await axios.get("/api/admin/listsuperadmins");
      setSuperAdmins(response.data.data);
    } catch (error) {
      console.error("Error fetching super admins:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/admin/liststudents");
      setStudents(response.data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await axios.get("/api/admin/listadmins");
      setAdmins(response.data.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const fetchAlumnis = async () => {
    try {
      const response = await axios.get("/api/admin/listalumni");
      setAlumnis(response.data.data);
    } catch (error) {
      console.error("Error fetching alumnis:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }

    const fetchAdminData = async () => {
      try {
        const res = await axios.get("/api/admin/admindata", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdminData(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch student data", err);
      }
    };

    const clearedStudentCounts = async () => {
      try {
        const response = await axios.get("/api/admin/countaccepted");
        setClearedCount(response.data.count);
      } catch (error) {
        console.error("Error fetching cleared student counts:", error);
      }
    };

    const pendingStudentCounts = async () => {
      try {
        const response = await axios.get("/api/admin/countpending");
        setPendingCount(response.data.count);
      } catch (error) {
        console.error("Error fetching pending cleared student counts:", error);
      }
    };

    const rejectedStudentCounts = async () => {
      try {
        const response = await axios.get("/api/admin/countrejected");
        setRejectedCount(response.data.count);
      } catch (error) {
        console.error("Error fetching declined students counts:", error);
      }
    };

    const fetchClearanceRequests = async () => {
      try {
        const response = await axios.get("/api/admin/viewclearancerequests");
        setClearanceRequests(response.data.data); // Set the clearance requests data
      } catch (error) {
        console.error("Error fetching clearance requests:", error);
      }
    };

    fetchAdminData();
    fetchAdminCounts();
    fetchStudentCounts();
    clearedStudentCounts();
    pendingStudentCounts();
    rejectedStudentCounts();
    fetchClearanceRequests();
    fetchAlumniCount();
    fetchSuperAdmins();
    fetchStudents();
    fetchAdmins();
    fetchAlumnis();
  }, []);

  const handlePasswordVisibility = () => {
    setSeePassword(!seePassword);
  };
  const handleDeleteSuperAdmin = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/admin/deletesuperadmin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Super admin deleted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      fetchSuperAdmins(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting super admin:", error);
      toast.error("Failed to delete super admin.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/admin/deleteadmin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Admin deleted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      fetchAdmins(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting admin:", error);
      toast.error("Failed to delete admin.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/admin/deletestudent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Student deleted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      fetchStudents(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const handleDeleteAlumni = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/admin/deletealumni/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Alumni deleted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      fetchAlumnis(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting alumni:", error);
      toast.error("Failed to delete alumni.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

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

  const handleAddAdmin = async () => {
    setLoading(true); // Set loading to true
    try {
      const response = await axios.post("/api/admin", newAdmin);
      toast.success("Admin added successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setShowModal(false); // Close the modal
      setNewAdmin({
        name: "",
        email: "",
        department: "",
        superAdminPrivilege: false,
        password: "",
      });
      fetchAdminCounts();
    } catch (error) {
      console.error("Error adding admin:", error);
      toast.error("Failed to add admin.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleAddStudent = async () => {
    setStudentLoading(true);
    try {
      await axios.post("/api/student", newStudent);
      toast.success("Student added successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setShowStudentModal(false);
      setNewStudent({
        name: "",
        email: "",
        faculty: "",
        department: "",
        programme: "",
        level: 100,
        session: "",
        indexNumber: 0,
        campus: "",
        mobileNumber: "",
        cohort: "",
        password: "",
      });
      fetchStudentCounts();
    } catch (error) {
      console.error("Error adding student:", error);
      toast.error("Failed to add student.");
    } finally {
      setStudentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-0 relative">
      {/* Header */}
      <div className="flex-col">
        <div className="flex flex-col sm:flex-row items-center justify-between">
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
            className="relative cursor-pointer"
            onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
          >
            <div className="profile-container text-gray-400 sm:flex mt-2 items-center mb-4 sm:mb-12">
              <Image
                src="/user male.png"
                height={736}
                width={736}
                alt="user profile"
                className="w-22 ms-8 sm:ms-0 sm:w-12 bg-gray-300 p-2 rounded-[50%]"
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
              <div className="absolute right-0 mt-[-42px] w-40 bg-red-200 hover:bg-red-100 rounded-md shadow-lg z-10">
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
        </div>
        <h2 className="hidden ms-2 sm:block mb-8 mt-[-8] text-gray-600 text-2xl">
          Super Administrator Panel
        </h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
        <div
          className="cursor-pointer bg-white p-4 rounded-2xl shadow-md hover:shadow-lg border-t-4 border-blue-500"
          onClick={() => {
            fetchStudents();
            setShowStudentsModal(true);
          }}
        >
          <h2 className="text-sm text-gray-500">Total Students</h2>
          <p className="text-2xl font-semibold text-blue-600">{studentCount}</p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-md border-t-4 border-green-500">
          <h2 className="text-sm text-gray-500">Cleared Students</h2>
          <p className="text-2xl font-semibold text-green-600">
            {clearedCount}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-md border-t-4 border-yellow-500">
          <h2 className="text-sm text-gray-500">Pending Students</h2>
          <p className="text-2xl font-semibold text-yellow-600">
            {pendingCount}
          </p>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-md border-t-4 border-red-500">
          <h2 className="text-sm text-gray-500">Rejected Students</h2>
          <p className="text-2xl font-semibold text-red-600">{rejectedCount}</p>
        </div>
        <div
          className="cursor-pointer bg-white p-4 rounded-2xl shadow-md hover:shadow-lg border-t-4 border-purple-500"
          onClick={() => {
            fetchAdmins();
            setShowAdminsModal(true);
          }}
        >
          <h2 className="text-sm text-gray-500">Total Admins</h2>
          <p className="text-2xl font-semibold text-purple-600">{adminCount}</p>
        </div>
        <div
          className="cursor-pointer bg-white p-4 rounded-2xl shadow-md hover:shadow-lg border-t-4 border-indigo-500"
          onClick={() => {
            fetchSuperAdmins(); // Fetch super admins when opening the modal
            setShowSuperAdminModal(true);
          }}
        >
          <h2 className="text-sm text-gray-500">Super Admins</h2>
          <p className="text-2xl font-semibold text-indigo-600">
            {superAdminCount}
          </p>
        </div>
        <div
          className="cursor-pointer bg-white p-4 rounded-2xl shadow-md hover:shadow-lg border-t-4 border-pink-500"
          onClick={() => {
            fetchAlumnis();
            setShowAlumnisModal(true);
          }}
        >
          <h2 className="text-sm text-gray-500">Total Alumni</h2>
          <p className="text-2xl font-semibold text-pink-600">{alumniCount}</p>
        </div>
      </div>

      {/* Table of Clearance Requests */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Recent Clearance Requests
        </h2>

        {/* Buttons for Add Admin and Add Student */}
        <div className="flex space-x-4 mb-4">
          <button
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => setShowModal(true)} // Open modal
          >
            Add Admin
          </button>
          <button
            className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={() => setShowStudentModal(true)}
          >
            Add Student
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {clearanceRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4 text-lg font-bold text-red-500"
                  >
                    No Requests
                  </td>
                </tr>
              ) : (
                clearanceRequests.map((request) =>
                  request.departments
                    .filter(
                      (department) => department.status !== "Not Requested"
                    )
                    .map((department: Department) => (
                      <tr key={department._id} className="border-b">
                        <td className="px-4 py-3">{request.studentId.name}</td>
                        <td className="px-4 py-3">{department.name}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`font-medium ${
                              department.status === "Approved"
                                ? "text-green-600"
                                : department.status === "Pending"
                                ? "text-yellow-500"
                                : "text-red-500"
                            }`}
                          >
                            {department.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {new Date(request.requestedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding Admin */}
      {showModal && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-40 flex items-center justify-center"
            onClick={() => setShowModal(false)}
          />

          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add Admin</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddAdmin();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={newAdmin.name}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, name: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  value={newAdmin.department}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, department: e.target.value })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Finance">Finance</option>
                  <option value="Library">Library</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Head of Alumni Relations">
                    Head of Alumni Relations
                  </option>
                  <option value="Head of Departments">
                    Head of Departments
                  </option>
                  <option value="Dean of Student Affairs">
                    Dean of Student Affairs
                  </option>
                </select>
              </div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newAdmin.superAdminPrivilege}
                    onChange={(e) =>
                      setNewAdmin({
                        ...newAdmin,
                        superAdminPrivilege: e.target.checked,
                      })
                    }
                    className="mr-2"
                  />
                  Super Admin Privilege
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={seePassword ? "text" : "password"}
                    value={newAdmin.password}
                    onChange={(e) =>
                      setNewAdmin({
                        ...newAdmin,
                        password: e.target.value,
                      })
                    }
                    required
                    placeholder="Password"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 pr-10"
                  />
                  <EyeClosed
                    size={20}
                    className={`absolute right-2 top-2 cursor-pointer ${
                      seePassword ? "text-gray-400" : "text-black"
                    }`}
                    onClick={handlePasswordVisibility}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Add Admin"
                )}
              </button>
            </form>
          </div>
        </>
      )}

      {/* Modal for Adding Student */}
      {showStudentModal && (
        <>
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-40 flex items-center justify-center"
            onClick={() => setShowStudentModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg p-6 shadow-lg w-[96%] sm:w-[600px] max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Add Student</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddStudent();
              }}
            >
              {[
                { label: "Name", key: "name" },
                { label: "Email", key: "email", type: "email" },
                { label: "Faculty", key: "faculty" },
                { label: "Department", key: "department" },
                { label: "Programme", key: "programme" },
                { label: "Session", key: "session" },
                { label: "Campus", key: "campus" },
                { label: "Mobile Number", key: "mobileNumber" },
                { label: "Cohort", key: "cohort" },
                {
                  label: "Password",
                  key: "password",
                  type: seePassword ? "text" : "password",
                },
              ].map(({ label, key, type = "text" }) => (
                <div className="mb-4" key={key}>
                  <label className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={(newStudent as any)[key]}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, [key]: e.target.value })
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Level
                </label>
                <input
                  type="number"
                  value={newStudent.level}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      level: parseInt(e.target.value),
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Index Number
                </label>
                <input
                  type="number"
                  value={newStudent.indexNumber}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      indexNumber: parseInt(e.target.value),
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-300 flex items-center justify-center gap-2"
              >
                {studentLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Add Student"
                )}
              </button>
            </form>
          </div>
        </>
      )}

      {/* modal for viewing super admin */}

      {showSuperAdminModal && (
        <>
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-40 flex items-center justify-center"
            onClick={() => setShowSuperAdminModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Super Admins</h2>
            <ul>
              {superAdmins.map((admin) => (
                <li
                  key={admin._id}
                  className="flex justify-between items-center mb-2"
                >
                  <div>
                    <p className="font-semibold">{admin.name}</p>
                    <p className="text-sm text-gray-500">{admin.email}</p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteSuperAdmin(admin._id)}
                  >
                    <Trash2 className="cursor-pointer" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              onClick={() => setShowSuperAdminModal(false)}
            >
              Close
            </button>
          </div>
        </>
      )}

      {/* modal for viewing students */}

      {showStudentsModal && (
        <>
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-40 flex items-center justify-center"
            onClick={() => setShowStudentsModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Students</h2>
            <ul>
              {students.map((students) => (
                <li
                  key={students._id}
                  className="flex justify-between items-center mb-2"
                >
                  <div>
                    <p className="font-semibold">{students.name}</p>
                    <p className="text-sm text-gray-500">{students.email}</p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteStudent(students._id)}
                  >
                    <Trash2 className="cursor-pointer" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              onClick={() => setShowStudentsModal(false)}
            >
              Close
            </button>
          </div>
        </>
      )}

      {/* modal for viewing admins */}

      {showAdminsModal && (
        <>
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-40 flex items-center justify-center"
            onClick={() => setShowAdminsModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Admins</h2>
            <ul>
              {admins.map((admins) => (
                <li
                  key={admins._id}
                  className="flex justify-between items-center mb-2"
                >
                  <div>
                    <p className="font-semibold">{admins.name}</p>
                    <p className="text-sm text-gray-500">{admins.email}</p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteAdmin(admins._id)}
                  >
                    <Trash2 className="cursor-pointer" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              onClick={() => setShowAdminsModal(false)}
            >
              Close
            </button>
          </div>
        </>
      )}

      {/* modal for viewing alumnis */}

      {showAlumnisModal && (
        <>
          <div
            className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-40 flex items-center justify-center"
            onClick={() => setShowAlumnisModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Alumnis</h2>
            <ul>
              {alumnis.map((alumnis) => (
                <li
                  key={alumnis._id}
                  className="flex justify-between items-center mb-2"
                >
                  <div>
                    <p className="font-semibold">{alumnis.name}</p>
                    <p className="text-sm text-gray-500">{alumnis.email}</p>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteAlumni(alumnis._id)}
                  >
                    <Trash2 className="cursor-pointer" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              onClick={() => setShowAlumnisModal(false)}
            >
              Close
            </button>
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default Page;
