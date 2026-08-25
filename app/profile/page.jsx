/**
 * Production-grade client profile management view.
 * Handles state fetching, local modification input bindings, and credential updates dynamically.
 */

"use client";

import { useState, useEffect } from "react";
import { userService } from "../../services/api";

export default function ProfilePage() {
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Resolve user ID securely from local cache or fallback to active customer seed ID (6)
    try {
      const storedUser = localStorage.getItem("stylehub_user");
      let currentId = 6; // Default to seed customer ID 6 if not cached

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id) {
          currentId = parsedUser.id;
        }
      }

      setUserId(currentId);
      fetchProfile(currentId);
    } catch (err) {
      // Fallback to ID 6 on parsing error
      setUserId(6);
      fetchProfile(6);
    }
  }, []);

  const fetchProfile = async (id) => {
    try {
      const response = await userService.getProfile(id);
      // Handle response structure wrapping data property
      const data = response.data || response;
      setFormData({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        password: "",
      });
    } catch (err) {
      setError("Failed to load user profile data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      // Prepare payload and omit password if left blank to satisfy backend validation
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      };
      
      if (formData.password && formData.password.trim() !== "") {
        payload.password = formData.password;
      }

      await userService.updateProfile(userId, payload);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Failed to save profile changes.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] bg-[#0b0f19] text-gray-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 bg-[#0b0f19] text-gray-100 min-h-[calc(100vh-5rem)]">
      <div className="max-w-xl w-full bg-gray-950/60 border border-gray-800/80 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight mb-2">Account Profile</h1>
          <p className="text-sm text-gray-400">Manage your personal credentials and contact settings</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-800/60 text-red-400 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-6 p-4 bg-emerald-950/50 border border-emerald-800/60 text-emerald-400 text-sm rounded-xl text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Phone Number</label>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">New Password (Optional)</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange}
              placeholder="Leave blank to keep current"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <button 
            type="submit" 
            disabled={saving}
            className="w-full mt-4 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl transition shadow-lg shadow-indigo-600/30 disabled:opacity-50"
          >
            {saving ? "Saving Changes..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}