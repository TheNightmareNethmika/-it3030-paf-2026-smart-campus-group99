import React from 'react';
import AdminLayout from '../components/AdminLayout';

const AdminBookingManagement = () => {
    return (
        <AdminLayout>
            <div className="animate-up">
                <div className="mb-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">Admin Module</p>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-3">Booking Management</h1>
                    <p className="text-sm font-medium text-slate-500 max-w-2xl">
                        Review booking demand, monitor usage windows, and coordinate availability across shared campus resources.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-8">
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-[0_12px_35px_rgba(15,23,42,0.05)] overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-100">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Today</p>
                            <h3 className="text-lg font-black text-slate-900">Booking stream overview</h3>
                        </div>
                        <div className="p-8 space-y-4">
                            {[
                                ['Lecture Hall A', '09:00 AM - 11:00 AM', 'Confirmed'],
                                ['Innovation Lab 2', '12:30 PM - 03:00 PM', 'Pending'],
                                ['Media Studio', '04:00 PM - 06:00 PM', 'Confirmed']
                            ].map(([resource, slot, status]) => (
                                <div key={resource} className="rounded-[1.5rem] border border-slate-100 bg-slate-50/60 px-5 py-5 flex items-center justify-between gap-4">
                                    <div>
                                        <h4 className="text-sm font-black text-slate-900 mb-1">{resource}</h4>
                                        <p className="text-xs font-medium text-slate-500">{slot}</p>
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                                        status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                    }`}>
                                        {status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2rem] p-8 shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-2">Capacity</p>
                        <h3 className="text-2xl font-black text-white tracking-tight mb-6">Daily booking pulse</h3>
                        <div className="space-y-4">
                            {[
                                ['Bookings approved', '31'],
                                ['Pending confirmations', '07'],
                                ['Peak hour occupancy', '82%'],
                                ['Conflict alerts', '02']
                            ].map(([label, value]) => (
                                <div key={label} className="flex items-center justify-between px-4 py-4 rounded-2xl bg-white/5 border border-white/10">
                                    <span className="text-sm font-semibold text-white/75">{label}</span>
                                    <span className="text-[11px] font-black uppercase tracking-widest text-white">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminBookingManagement;
