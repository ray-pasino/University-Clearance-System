"use client";
import React, { useState } from "react";
import Image from "next/image";
import { EyeClosed, Loader2, ToggleLeft, ToggleRight } from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handlePasswordVisibility = () => {
    setSeePassword(!seePassword);
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isToggled ? "/api/auth/superadmin" : "/api/auth/admin";

    try {
      const response = await axios.post(endpoint, {
        email,
        password,
      });

      const data = response.data;
      console.log("here is the department",data.admin)

      // Store token and admin data
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.admin)); // You might rename this to `adminData`

      // Show success notification
      toast.success("Login successful!", {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });

      // Redirect after giving user time to read the message
      setTimeout(() => {
        if (isToggled) {
          // Super admin
          router.push("/admin/dashboard");
        } else {
          // Regular admin, redirect based on department
          const department = data.admin?.department?.toLowerCase() || "";

          if (department === "finance") {
            router.push("/admin/finance");
          } else if (department === "library") {
            router.push("/admin/library");
          } else if (department === "faculty") {
            router.push("/admin/faculty");
          } else if (department === "head of alumni relations") {
            router.push("/admin/head-of-alumni");
          } else if (department === "head of departments") {
            router.push("/admin/hod");
          } else if (department === "dean of student affairs") {
            router.push("/admin/dean-of-student-affairs");
          } else {
            // fallback in case department is unknown
            toast.error("Unknown department. Please contact admin.");
          }
        }
      }, 2000);
    } catch (err: any) {
      setLoading(false);
      const errorMessage =
        err.response && err.response.data?.error
          ? err.response.data.error
          : "Something went wrong. Please try again.";

      // Show error notification
      toast.error(errorMessage, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <Link href="/">
        <div className="flex sm:space-x-2 items-center justify-center">
          <Image
            src="/logo.png"
            alt="GCTU Logo"
            width={500}
            height={500}
            className="w-12"
          />
          <h1 className="font-semibold md:text-md">GCTU Clearance System</h1>
        </div>
      </Link>

      <div className="flex flex-col items-center justify-center">
        <h3 className="my-8 font-semibold text-2xl md:text-4xl">
          Administrator Sign In
        </h3>

        <Image
          src="/signin.svg"
          alt="admin in svg"
          width={500}
          height={500}
          className="w-screen sm:h-72"
        />

        <form
          onSubmit={handleLogin}
          className="mt-6 mb-10 flex flex-col space-y-6 items-center justify-center"
        >
          {/* Admin email input */}
          <input
            type="email"
            placeholder="Staff Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="outline-none w-58 sm:w-78 md:w-82 lg:w-86 text-center border-1 border-blue-600 rounded-md px-6 py-2"
          />

          {/* Admin password input */}
          <div>
            <span className="w-58 sm:w-78 md:w-82 lg:w-86 flex justify-center items-center border-1 border-blue-600 rounded-md">
              <input
                type={seePassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="outline-none w-[90%] text-center px-6 py-2"
              />
              <EyeClosed
                size={16}
                className={`${
                  seePassword ? "text-gray-400" : "text-black-800"
                } cursor-pointer`}
                onClick={handlePasswordVisibility}
              />
            </span>
            <p className="text-sm text-blue-600 cursor-pointer">
              forgot password?
            </p>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Toggle Switch */}
          <div className="flex items-center mt-[-10px]">
            <span
              className={`cursor-pointer w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 transition duration-300 ${
                isToggled ? "bg-green-500" : ""
              }`}
              onClick={handleToggle}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
                  isToggled ? "translate-x-6" : ""
                }`}
              ></div>
            </span>
            <span className="ml-2 text-sm">
              {isToggled ? "Sign in as super admin" : "Sign in as super admin?"}
            </span>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer bg-blue-800 text-white w-58 sm:w-78 md:w-82 lg:w-86 rounded-lg px-6 py-2 transition transform duration-300 hover:scale-105 flex justify-center items-center space-x-2"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>

      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
    </div>
  );
};

export default Page;
