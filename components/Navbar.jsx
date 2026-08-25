/**
 * Production-ready Navigation bar component with dynamic auth state, username tracking, admin, and staff role checks.
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [userName, setUserName] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const userStr = localStorage.getItem("stylehub_user");
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          setUserName(userObj.fullName || userObj.username || "Account");
          
          // التحقق من الصلاحيات بدقة
          if (userObj.role === "SUPER_ADMIN") {
            setIsAdmin(true);
            setIsStaff(false);
          } else if (userObj.role === "STAFF") {
            setIsAdmin(false);
            setIsStaff(true);
          } else {
            setIsAdmin(false);
            setIsStaff(false);
          }
        } catch (e) {
          setUserName("Account");
          setIsAdmin(false);
          setIsStaff(false);
        }
      } else {
        const token = localStorage.getItem("stylehub_token");
        setUserName(token ? "Account" : null);
        setIsAdmin(false);
        setIsStaff(false);
      }
    };

    checkAuth();

    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("stylehub_token");
    localStorage.removeItem("stylehub_user");
    setUserName(null);
    setIsAdmin(false);
    setIsStaff(false);
    window.dispatchEvent(new Event("authChange"));
    router.push("/login");
  };

  return (
    <header className="border-b border-gray-800/60 bg-[#0b0f19]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-wider text-indigo-400 flex items-center gap-2">
          <span className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-lg shadow-lg shadow-indigo-600/50">S</span>
          Style<span className="text-white">Hub</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-300">
          <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
          <Link href="/booking" className="hover:text-indigo-400 transition-colors">Book Appointment</Link>
          {userName && (
            <>
              <Link href="/client" className="hover:text-indigo-400 transition-colors">My Appointments</Link>
              <Link href="/profile" className="hover:text-indigo-400 transition-colors">Profile</Link>
            </>
          )}

          {/* يظهر رابط لوحة تحكم الأدمن حصرياً لمستخدمي SUPER_ADMIN */}
          {isAdmin && (
            <Link href="/admin" className="text-indigo-400 hover:text-indigo-300 transition-colors font-bold px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 rounded-lg">
              Admin Dashboard
            </Link>
          )}

          {/* يظهر رابط لوحة تحكم الطاقم حصرياً لمستخدمي STAFF */}
          {isStaff && (
            <Link href="/staff" className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold px-3 py-1 bg-emerald-600/20 border border-emerald-500/30 rounded-lg">
              Staff Portal
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {userName ? (
            <div className="flex items-center space-x-4">
              <Link 
                href="/profile" 
                className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition px-3 py-2 bg-indigo-950/40 border border-indigo-800/50 rounded-xl flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                {userName}
              </Link>
              <button 
                onClick={handleLogout}
                className="text-sm font-semibold bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 px-4 py-2 rounded-xl transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold text-gray-300 hover:text-white transition px-4 py-2.5">
                Login
              </Link>
              <Link href="/signup" className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-5 py-2.5 rounded-xl transition shadow-lg shadow-emerald-600/30">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}