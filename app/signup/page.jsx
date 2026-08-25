/**
 * Production-grade registration client view.
 * Handles onboarding input states, backend payload synchronization, and redirect pipelines.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "../../services/api";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", formData);
      router.push("/login");
    } catch (err) {
      setError(err.message || "Registration failed. Verify input payloads.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 bg-[#0b0f19] text-gray-100 min-h-[calc(100vh-5rem)]">
      <div className="max-w-md w-full bg-gray-950/60 border border-gray-800/80 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight mb-2">Create Account</h1>
          <p className="text-sm text-gray-400">Join StyleHub to manage your appointments seamlessly</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-800/60 text-red-400 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Username</label>
            <input 
              type="text" 
              name="username" 
              required 
              value={formData.username} 
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-emerald-500 transition"
              placeholder="e.g. john_doe"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              required 
              value={formData.fullName} 
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-emerald-500 transition"
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Email Address</label>
            <input 
              type="email" 
              name="email" 
              required 
              value={formData.email} 
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-emerald-500 transition"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Phone Number (E.164)</label>
            <input 
              type="text" 
              name="phone" 
              required 
              value={formData.phone} 
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-emerald-500 transition"
              placeholder="+12345678901"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              value={formData.password} 
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-emerald-500 transition"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl transition shadow-lg shadow-emerald-600/30 disabled:opacity-50 transform hover:-translate-y-0.5"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}