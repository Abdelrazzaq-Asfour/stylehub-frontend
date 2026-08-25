/**
 * Production-ready booking appointment view with strict STAFF-only filtering.
 */

"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { serviceApi, appointmentApi, userService } from "../../services/api";

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedServiceId = searchParams.get("serviceId");

  const [services, setServices] = useState([]);
  const [staffList, setStaffList] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    staffId: "",
    serviceId: preselectedServiceId || "",
    appointmentDate: "",
    startTime: "10:00",
    notes: "",
  });

  useEffect(() => {
    const loadBookingData = async () => {
      try {
        const [servicesData, usersData] = await Promise.all([
          serviceApi.getAllServices(),
          userService.getAllUsers()
        ]);

        const activeServices = (servicesData || []).filter(s => s.available);
        setServices(activeServices);

        // تصفية المستخدمين لجلب موظفي الـ STAFF فقط وتجنب العملاء أو الأدمن العامين
        const staffMembers = (usersData || []).filter(u => u.role === "STAFF");
        setStaffList(staffMembers);

        setFormData(prev => ({
          ...prev,
          serviceId: preselectedServiceId || (activeServices.length > 0 ? activeServices[0].id : ""),
          staffId: staffMembers.length > 0 ? staffMembers[0].id : ""
        }));
      } catch (err) {
        setError("Failed to load available booking resources.");
      } finally {
        setLoading(false);
      }
    };
    loadBookingData();
  }, [preselectedServiceId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      let currentClientId = 6;
      const storedUser = localStorage.getItem("stylehub_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.id) {
          currentClientId = parsed.id;
        }
      }

      let formattedTime = formData.startTime;
      if (formattedTime.length === 5) {
        formattedTime = `${formattedTime}:00`;
      }

      const payload = {
        clientId: Number(currentClientId),
        staffId: Number(formData.staffId),
        serviceId: Number(formData.serviceId),
        appointmentDate: formData.appointmentDate,
        startTime: formattedTime,
        notes: formData.notes,
      };

      await appointmentApi.createAppointment(payload);
      setSuccess("Appointment booked successfully!");
      setTimeout(() => router.push("/client"), 1500);
    } catch (err) {
      setError(err.message || "Failed to book appointment slot. Ensure date is in the future.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b0f19] text-gray-400">
        Loading booking portal...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 py-12 px-4 flex flex-col justify-center">
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tight mb-2 text-white">Book an Appointment</h1>
          <p className="text-sm text-gray-400">Select your preferences and confirm your salon time slot</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-800/60 text-red-400 text-sm rounded-2xl text-center shadow-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-emerald-950/50 border border-emerald-800/60 text-emerald-400 text-sm rounded-2xl text-center shadow-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gray-950/70 border border-gray-800/80 p-8 rounded-3xl backdrop-blur-xl shadow-2xl space-y-6">
          
          {/* Select Service */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Select Service</label>
            <select 
              name="serviceId" 
              value={formData.serviceId} 
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (${s.price} - {s.durationMinutes} mins)
                </option>
              ))}
            </select>
          </div>

          {/* Assigned Staff Specialist (Filtered to STAFF role only) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Assigned Staff Specialist</label>
            <select 
              name="staffId" 
              value={formData.staffId} 
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3.5 text-sm text-gray-100 focus:outline-none focus:border-indigo-500 transition cursor-pointer"
            >
              {staffList.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.fullName || staff.username}
                </option>
              ))}
            </select>
          </div>

          {/* Date and Time Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Appointment Date</label>
              <input 
                type="date" 
                name="appointmentDate" 
                required 
                min={new Date().toISOString().split('T')[0]}
                value={formData.appointmentDate} 
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Start Time</label>
              <input 
                type="time" 
                name="startTime" 
                required 
                value={formData.startTime} 
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Special Requirements / Notes</label>
            <textarea 
              name="notes" 
              rows="3"
              value={formData.notes} 
              onChange={handleChange}
              placeholder="Add any specific requests or remarks..."
              className="w-full bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3 text-sm text-gray-100 focus:outline-none focus:border-indigo-500 transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={submitting}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black rounded-2xl transition shadow-lg shadow-indigo-600/40 disabled:opacity-50 cursor-pointer text-base tracking-wide"
          >
            {submitting ? "Processing Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-[#0b0f19] text-gray-400">Loading booking page...</div>}>
      <BookingForm />
    </Suspense>
  );
}