/**
 * Production-ready public service catalog and booking entry view.
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { serviceApi } from "../services/api";

export default function ServicesCatalogPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const data = await serviceApi.getAllServices();
        setServices((data || []).filter(s => s.available));
      } catch (err) {
        console.error("Failed to load catalog.");
      } finally {
        setLoading(false);
      }
    };
    loadCatalog();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0b0f19] text-gray-400">
        Loading services catalog...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-black tracking-tight mb-4 text-white">Our Professional Services</h1>
          <p className="text-gray-400">Explore our signature salon treatments and book your targeted grooming session today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-gray-950/70 border border-gray-800/80 p-8 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col justify-between hover:border-indigo-500/50 transition">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{service.name}</h3>
                  <span className="text-emerald-400 font-black text-lg">${service.price}</span>
                </div>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{service.description || "No description provided."}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-800/60">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{service.durationMinutes} Mins Duration</span>
                <Link 
                  href={`/booking?serviceId=${service.id}`}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-indigo-600/30"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}