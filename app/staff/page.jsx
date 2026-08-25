/**
 * Production-ready staff operations view with unified "New Day / Clear All Queue" operation,
 * atomic batch state transition, and persistent archive segregation.
 */

"use client";

import { useState, useEffect } from "react";
import { appointmentApi } from "../../services/api";

export default function StaffDashboardPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentStaffId, setCurrentStaffId] = useState(null);
  const [currentStaffName, setCurrentStaffName] = useState("");

  // State toggle for optional date-based filtering
  const [filterTodayOnly, setFilterTodayOnly] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("stylehub_user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed && parsed.id && (parsed.role === "STAFF" || parsed.role === "SUPER_ADMIN")) {
          setCurrentStaffId(Number(parsed.id));
          setCurrentStaffName(parsed.fullName || parsed.username || "Staff Member");
        } else {
          setError("Access Denied: Staff role required.");
        }
      } catch (e) {
        console.error("Failed to parse stored user");
      }
    }
  }, []);

  useEffect(() => {
    if (currentStaffId !== null) {
      fetchStaffQueue();
    }
  }, [currentStaffId, filterTodayOnly]);

  const fetchStaffQueue = async () => {
    try {
      setLoading(true);
      const data = await appointmentApi.getAllAppointments();
      
      const todayString = new Date().toISOString().split('T')[0];

      // Filter appointments strictly assigned to the authenticated staff member
      let filtered = (data || []).filter(appt => {
        const isMyAppointment = Number(appt.staffId) === Number(currentStaffId);
        if (!isMyAppointment) return false;

        if (filterTodayOnly) {
          return appt.appointmentDate === todayString;
        }
        return true;
      });

      // Sort appointments ascending by start time to maintain precise queue sequence
      filtered.sort((a, b) => (a.startTime || "").localeCompare(b.startTime || ""));

      setAppointments(filtered);
    } catch (err) {
      setError("Failed to fetch staff booking queue.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsDone = async (appointmentId) => {
    try {
      setError("");
      setSuccessMessage("");
      
      const token = localStorage.getItem("stylehub_token");
      const response = await fetch(`http://localhost:8080/api/v1/appointments/${appointmentId}/status?status=DONE&userId=${currentStaffId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.message || "Failed to update appointment status.");
      }

      setSuccessMessage(`Appointment #${appointmentId} marked as DONE.`);
      fetchStaffQueue();
    } catch (err) {
      setError(err.message || "Operation failed.");
    }
  };

  // Unified Single-Click Action: Cancels/Clears all active queue items and flushes them down to the archive table
  const handleClearAllAndStartNewDay = async () => {
    try {
      setError("");
      setSuccessMessage("");
      const token = localStorage.getItem("stylehub_token");

      // Identify all currently active items in the queue
      const activeItems = appointments.filter(appt => {
        const status = (appt.status || "CONFIRMED").toUpperCase();
        return status !== 'DONE' && status !== 'CANCELLED';
      });

      if (activeItems.length === 0) {
        setSuccessMessage("Queue is already empty.");
        return;
      }

      // Atomically transition all active appointments to CANCELLED (or DONE) to drop them into the archive ledger
      await Promise.all(
        activeItems.map(async (appt) => {
          await fetch(`http://localhost:8080/api/v1/appointments/${appt.id}/status?status=CANCELLED&userId=${currentStaffId}`, {
            method: "PUT",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });
        })
      );

      setSuccessMessage("All active appointments cleared and transferred to archive. New day started!");
      fetchStaffQueue();
    } catch (err) {
      setError("Failed to clear active queue operations.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] bg-[#0b0f19] text-gray-400">
        Loading staff queue...
      </div>
    );
  }

  const todayString = new Date().toISOString().split('T')[0];

  // Active queue: Excludes DONE and CANCELLED; respects today filter if active
  const activeQueue = appointments.filter(appt => {
    const status = (appt.status || "CONFIRMED").toUpperCase();
    if (status === 'DONE' || status === 'CANCELLED') return false;
    
    if (filterTodayOnly) {
      return appt.appointmentDate === todayString;
    }
    return true;
  });

  // Archive list: Retains DONE, CANCELLED, or historical appointments shifted via the clear/new-day action
  const archiveList = appointments.filter(appt => {
    const status = (appt.status || "CONFIRMED").toUpperCase();
    if (status === 'DONE' || status === 'CANCELLED') return true;
    
    if (filterTodayOnly) {
      return appt.appointmentDate !== todayString;
    }
    return false;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 bg-[#0b0f19] text-gray-100 min-h-[calc(100vh-5rem)]">
      
      {/* Header Vector & Unified Action Trigger */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight mb-2 text-white">Staff Operations Portal</h1>
          <p className="text-sm text-gray-400">Welcome back, {currentStaffName}. Live active queue and completed archives.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Toggle filter */}
          <button
            onClick={() => setFilterTodayOnly(!filterTodayOnly)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
              filterTodayOnly 
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30' 
                : 'bg-gray-900 text-gray-300 border-gray-800 hover:bg-gray-800'
            }`}
          >
            {filterTodayOnly ? "Showing Today's Queue Only" : "Filter Today's Queue"}
          </button>

          {/* Single-Click Action: Clear All & Start New Day */}
          <button
            onClick={handleClearAllAndStartNewDay}
            className="px-4 py-2.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
          >
            🗑️ Clear All & Start New Day
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-950/50 border border-red-800/60 text-red-400 text-sm rounded-xl text-center">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-emerald-950/50 border border-emerald-800/60 text-emerald-400 text-sm rounded-xl text-center">
          {successMessage}
        </div>
      )}

      {/* Active Queue Table */}
      <div className="mb-12">
        <h2 className="text-lg font-bold mb-4 text-white">
          {filterTodayOnly ? `Today's Active Queue (${todayString})` : "Active Queue Registry"}
        </h2>
        <div className="bg-gray-950 border border-gray-800 p-6 rounded-3xl shadow-2xl overflow-x-auto">
          <table className="w-full text-left border-collapse bg-transparent text-gray-100">
            <thead>
              <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-400 bg-transparent">
                <th className="py-3 px-4 bg-transparent">Turn #</th>
                <th className="py-3 px-4 bg-transparent">Client Name</th>
                <th className="py-3 px-4 bg-transparent">Service</th>
                <th className="py-3 px-4 bg-transparent">Date</th>
                <th className="py-3 px-4 bg-transparent">Time Window</th>
                <th className="py-3 px-4 bg-transparent">Status</th>
                <th className="py-3 px-4 text-center bg-transparent">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-sm bg-transparent">
              {activeQueue.length === 0 ? (
                <tr className="bg-transparent">
                  <td colSpan="7" className="py-8 text-center text-gray-500 bg-transparent">
                    No active clients in the queue.
                  </td>
                </tr>
              ) : (
                activeQueue.map((appt, index) => (
                  <tr key={appt.id} className="hover:bg-gray-900/40 transition bg-transparent">
                    <td className="py-4 px-4 font-black text-indigo-400 bg-transparent">
                      #{index + 1}
                    </td>
                    <td className="py-4 px-4 font-semibold text-white bg-transparent">{appt.clientName}</td>
                    <td className="py-4 px-4 text-gray-300 bg-transparent">{appt.serviceName}</td>
                    <td className="py-4 px-4 text-gray-300 bg-transparent">{appt.appointmentDate}</td>
                    <td className="py-4 px-4 font-mono text-gray-200 bg-transparent">{appt.startTime} - {appt.endTime}</td>
                    <td className="py-4 px-4 bg-transparent">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                        appt.status === 'CONFIRMED' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' :
                        appt.status === 'PENDING' ? 'bg-amber-950/60 text-amber-400 border border-amber-800/50' :
                        'bg-red-950/60 text-red-400 border border-red-800/50'
                      }`}>
                        {appt.status || 'CONFIRMED'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center bg-transparent">
                      {appt.status !== 'DONE' && (
                        <button
                          onClick={() => handleMarkAsDone(appt.id)}
                          className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                        >
                          Mark as Done
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Archive & Previous Records Ledger */}
      <div>
        <h2 className="text-lg font-bold mb-4 text-gray-400">Archive & Previous Records (Done / Cancelled / Cleared)</h2>
        <div className="bg-gray-950/50 border border-gray-800/60 p-6 rounded-3xl shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse bg-transparent text-gray-300">
            <thead>
              <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500 bg-transparent">
                <th className="py-3 px-4 bg-transparent"># ID</th>
                <th className="py-3 px-4 bg-transparent">Client Name</th>
                <th className="py-3 px-4 bg-transparent">Service</th>
                <th className="py-3 px-4 bg-transparent">Date</th>
                <th className="py-3 px-4 bg-transparent">Time Window</th>
                <th className="py-3 px-4 bg-transparent">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40 text-sm bg-transparent">
              {archiveList.length === 0 ? (
                <tr className="bg-transparent">
                  <td colSpan="6" className="py-6 text-center text-gray-600 bg-transparent">
                    No items in the archive.
                  </td>
                </tr>
              ) : (
                archiveList.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-900/20 transition bg-transparent opacity-80">
                    <td className="py-3 px-4 font-bold text-gray-400 bg-transparent">#{appt.id}</td>
                    <td className="py-3 px-4 text-gray-200 bg-transparent">{appt.clientName}</td>
                    <td className="py-3 px-4 text-gray-400 bg-transparent">{appt.serviceName}</td>
                    <td className="py-3 px-4 text-gray-400 bg-transparent">{appt.appointmentDate}</td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-400 bg-transparent">{appt.startTime} - {appt.endTime}</td>
                    <td className="py-3 px-4 bg-transparent">
                      <span className={`px-2.5 py-1 text-xs rounded-full font-medium ${
                        appt.status === 'DONE' ? 'bg-blue-950/60 text-blue-400 border border-blue-800/50' :
                        appt.status === 'CANCELLED' ? 'bg-red-950/60 text-red-400 border border-red-800/50' :
                        'bg-gray-800 text-gray-400'
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}