/**
 * Production-ready client appointments view.
 * Fetches, displays, and allows canceling client bookings dynamically.
 */

"use client";

import { useState, useEffect } from "react";
import { appointmentApi } from "../../services/api";

export default function ClientAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  const fetchAppointments = async () => {
    try {
      let clientId = 6;
      const storedUser = localStorage.getItem("stylehub_user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.id) {
          clientId = parsed.id;
        }
      }

      const data = await appointmentApi.getClientAppointments(clientId);
      setAppointments(data || []);
    } catch (err) {
      setError("Failed to load your appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      setError("");
      setActionMessage("");
      await appointmentApi.cancelAppointment(appointmentId);
      setActionMessage("Appointment cancelled successfully.");
      fetchAppointments();
    } catch (err) {
      setError(err.message || "Failed to cancel appointment.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] bg-[#0b0f19] text-gray-400">
        Loading your appointments...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 bg-[#0b0f19] text-gray-100 min-h-[calc(100vh-5rem)]">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black tracking-tight mb-2">My Appointments</h1>
        <p className="text-sm text-gray-400">Review your scheduled treatments and manage bookings</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-950/50 border border-red-800/60 text-red-400 text-sm rounded-xl text-center">
          {error}
        </div>
      )}

      {actionMessage && (
        <div className="mb-6 p-4 bg-emerald-950/50 border border-emerald-800/60 text-emerald-400 text-sm rounded-xl text-center">
          {actionMessage}
        </div>
      )}

      {appointments.length === 0 ? (
        <div className="text-center py-16 bg-gray-950/60 border border-gray-800/80 rounded-3xl">
          <p className="text-gray-400 text-sm">No appointments found. Book your first session now!</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-gray-950/60 border border-gray-800/80 rounded-3xl backdrop-blur-xl shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800/80 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <th className="p-5">Service ID</th>
                <th className="p-5">Staff ID</th>
                <th className="p-5">Date</th>
                <th className="p-5">Time Window</th>
                <th className="p-5">Status</th>
                <th className="p-5">Notes</th>
                <th className="p-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-sm text-gray-300">
              {appointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-900/40 transition">
                  <td className="p-5 font-bold text-indigo-400">Service #{appt.serviceId}</td>
                  <td className="p-5">Staff #{appt.staffId}</td>
                  <td className="p-5">{appt.appointmentDate}</td>
                  <td className="p-5 font-mono text-xs text-indigo-300">{appt.startTime} - {appt.endTime || "N/A"}</td>
                  <td className="p-5">
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {appt.status || "CONFIRMED"}
                    </span>
                  </td>
                  <td className="p-5 text-gray-400 text-xs">{appt.notes || "None"}</td>
                  <td className="p-5 text-center">
                    <button
                      onClick={() => handleCancel(appt.id)}
                      className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 text-xs font-semibold rounded-xl transition"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}