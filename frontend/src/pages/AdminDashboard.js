import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import AdminLayout from '../components/AdminLayout';

const summaryCards = [
    {
        label: 'Total Resources',
        value: '128',
        detail: 'Across labs, halls, and equipment',
        icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
        accent: 'from-indigo-500 to-violet-500',
        surface: 'bg-indigo-50 text-indigo-600'
    },
    {
        label: 'Active Tickets',
        value: '24',
        detail: 'Open incidents currently in progress',
        icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h3l2 3 2-3h3a2 2 0 002-2V7a2 2 0 00-2-2H9z',
        accent: 'from-amber-500 to-orange-500',
        surface: 'bg-amber-50 text-amber-600'
    },
    {
        label: 'Bookings Today',
        value: '41',
        detail: 'Confirmed campus bookings in the last 24h',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        accent: 'from-emerald-500 to-teal-500',
        surface: 'bg-emerald-50 text-emerald-600'
    }
];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [userCount, setUserCount] = useState(null);

    useEffect(() => {
        api.get('/admin/users')
            .then(({ data }) => setUserCount(data.length))
            .catch(() => setUserCount('—'));
    }, []);

    return (
        <AdminLayout>
            <div className="relative overflow-hidden animate-up">
                <div className="absolute top-[-18%] right-[-8%] w-[440px] h-[440px] bg-indigo-100/60 rounded-full blur-[110px] pointer-events-none"></div>
                <div className="absolute bottom-[-20%] left-[-8%] w-[360px] h-[360px] bg-sky-100/60 rounded-full blur-[100px] pointer-events-none"></div>

                <section className="relative bg-white/85 backdrop-blur-sm border border-slate-100 rounded-[2rem] p-8 md:p-10 shadow-[0_18px_50px_rgba(15,23,42,0.06)] mb-10 overflow-hidden">
                    <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-indigo-50/80 to-transparent pointer-events-none"></div>
                    <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                                Admin Access
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3">Admin Dashboard</h1>
                            <p className="text-sm md:text-base text-slate-500 font-medium max-w-2xl">
                                Oversee campus resources, monitor ticket flow, and keep daily booking activity running smoothly from one place.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 min-w-[150px]">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Live Status</p>
                                <p className="text-sm font-bold text-slate-900">All systems healthy</p>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 min-w-[150px]">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Focus</p>
                                <p className="text-sm font-bold text-slate-900">Operations overview</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                    {summaryCards.map((card) => (
                        <div key={card.label} className="bg-white border border-slate-100 rounded-[1.75rem] p-6 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                            <div className="flex items-start justify-between mb-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.surface}`}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d={card.icon} />
                                    </svg>
                                </div>
                                <div className={`h-2.5 w-24 rounded-full bg-gradient-to-r ${card.accent} opacity-80`}></div>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">{card.label}</p>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2">{card.value}</h2>
                            <p className="text-sm font-medium text-slate-500">{card.detail}</p>
                        </div>
                    ))}
                </section>

                <section className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-[0_12px_35px_rgba(15,23,42,0.05)] overflow-hidden">
                        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-1">Overview</p>
                                <h3 className="text-lg font-black text-slate-900">Admin workspace modules</h3>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">Ready</span>
                        </div>
                        <div className="p-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { title: 'Resource Management', text: 'Manage physical spaces, equipment, and campus inventory records.', path: '/admin/resources' },
                                { title: 'Ticket Management',   text: 'Track service issues, escalations, and operational response status.', path: '/admin/tickets' },
                                { title: 'Booking Management',  text: 'Review demand, monitor daily bookings, and maintain availability.', path: '/admin/bookings' },
                                { title: 'User Management',     text: 'Manage member accounts, assign roles, and control platform access.', path: '/admin/users', highlight: true },
                            ].map((module) => (
                                <button
                                    key={module.title}
                                    onClick={() => navigate(module.path)}
                                    className={`rounded-[1.5rem] border p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                                        module.highlight
                                            ? 'border-indigo-200 bg-indigo-50/60 hover:bg-indigo-50'
                                            : 'border-slate-100 bg-slate-50/60 hover:bg-slate-100/60'
                                    }`}
                                >
                                    <h4 className={`text-sm font-black mb-2 ${module.highlight ? 'text-indigo-800' : 'text-slate-900'}`}>{module.title}</h4>
                                    <p className="text-xs leading-relaxed text-slate-500 font-medium">{module.text}</p>
                                    {module.highlight && (
                                        <p className="mt-3 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                                            {userCount !== null ? `${userCount} members` : '—'}
                                        </p>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2rem] p-8 shadow-[0_18px_45px_rgba(15,23,42,0.18)]">
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-200/80 mb-2">Today</p>
                        <h3 className="text-2xl font-black text-white tracking-tight mb-6">Operations snapshot</h3>
                        <div className="space-y-4">
                            {[
                                ['Morning booking peak', '09:00 AM'],
                                ['Pending approvals', '08 items'],
                                ['Escalated tickets', '03 cases'],
                                ['Resource sync health', 'Stable']
                            ].map(([label, value]) => (
                                <div key={label} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-4">
                                    <span className="text-sm font-semibold text-white/75">{label}</span>
                                    <span className="text-[11px] font-black uppercase tracking-widest text-white">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
