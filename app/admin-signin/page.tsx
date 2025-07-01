"use client";
import React, { useState } from "react";
import Image from "next/image";
import { EyeClosed, Loader2 } from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import axios from "axios";

const Page = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handlePasswordVisibility = () => {
    setSeePassword(!seePassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/admin", {
        email,
        password,
      });

      const data = response.data;

      // Store token and admin data
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.student)); // You might rename this to `adminData`

      // Redirect to admin dashboard
      router.push("/admin/dashboard"); // Adjust path as needed
    } catch (err: any) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link href="/">
        <div className="flex sm:space-x-2 items-center justify-center">
          <Image src="/logo.png" alt="GCTU Logo" width={500} height={500} className="w-12" />
          <h1 className="font-semibold md:text-md">GCTU Clearance System</h1>
        </div>
      </Link>

      <div className="flex flex-col items-center justify-center">
        <h3 className="my-8 font-semibold text-2xl md:text-4xl">Administrator Sign In</h3>

        <Image src="/signin.svg" alt="admin in svg" width={500} height={500} className="w-screen sm:h-72" />

        <form onSubmit={handleLogin} className="mt-6 mb-10 flex flex-col space-y-6 items-center justify-center">
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
                className={`${seePassword ? "text-gray-400" : "text-black-800"} cursor-pointer`}
                onClick={handlePasswordVisibility}
              />
            </span>
            <p className="text-sm text-blue-600 cursor-pointer">forgot password?</p>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer bg-blue-800 text-white w-58 sm:w-78 md:w-82 lg:w-86 rounded-lg px-6 py-2 transition transform duration-300 hover:scale-105 flex justify-center items-center space-x-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
