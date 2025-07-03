"use client";
import React, { useState } from "react";
import Image from "next/image";
import { EyeClosed } from "lucide-react";
import Link from "next/link";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [seeAdminPassword, setSeeAdminPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePasswordVisibility = () => {
    setSeeAdminPassword(!seeAdminPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/student", {
        email,
        password,
      });

      const data = response.data;

      // Store token and student data
      localStorage.setItem("token", data.token);
      localStorage.setItem("student", JSON.stringify(data.student));

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
        router.push("/student-profile");
      }, 2000);
    } catch (err: any) {
      setLoading(false);
      const errorMessage = err.response && err.response.data?.error
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
    <div className="min-h-screen flex flex-col">
      <Link href="/" className="text-center py-4">
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

      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <h3 className="mb-8 font-semibold text-2xl md:text-4xl text-center">
          Student Sign In
        </h3>

        <Image
          src="/signin.svg"
          alt="sign in illustration"
          width={500}
          height={500}
          className="w-full max-w-md"
        />

        <form
          onSubmit={handleLogin}
          className="mt-8 w-full max-w-md flex flex-col gap-6"
        >
          <input
            className="w-full px-4 py-2 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              className="w-full px-4 py-2 border-2 border-blue-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              type={seeAdminPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={handlePasswordVisibility}
            >
              <EyeClosed
                size={18}
                className={seeAdminPassword ? "text-gray-500" : "text-black"}
              />
            </button>
            <p className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer mt-2 text-right">
              Forgot password?
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Signing in...
              </>
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
