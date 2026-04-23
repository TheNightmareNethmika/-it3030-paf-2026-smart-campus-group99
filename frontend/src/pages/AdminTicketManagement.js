import React from 'react';
import AdminLayout from '../components/AdminLayout';

const ticketColumns = [
    { title: 'New Tickets', value: '08', tone: 'bg-amber-50 text-amber-600 border-amber-100' },
    { title: 'In Review', value: '11', tone: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
    { title: 'Resolved', value: '19', tone: 'bg-emerald-50 text-emerald-600 border-emerald-100' }
];

const AdminTicketManagement = () => {
    return (
        <AdminLayout>
            <div className="animate-up">
                <div className="mb-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">Admin Module</p>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-3">Ticket Management</h1>
                    <p className="text-sm font-medium text-slate-500 max-w-2xl">
                        Monitor active service tickets, track progress, and maintain timely operational follow-up.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {ticketColumns.map((card) => (
                        <div key={card.title} className="bg-white border border-slate-100 rounded-[1.75rem] p-6 shadow-[0_12px_35px_rgba(15,23,42,0.05)]">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">{card.title}</p>
                            <div className="flex items-center justify-between">
                                <h2 className="text-4xl font-black text-slate-900">{card.value}</h2>
                                <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${card.tone}`}>
                                    Live
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white border border-slate-100 rounded-[2rem] shadow-[0_12px_35px_rgba(15,23,42,0.05)] overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Queue</p>
                            <h3 className="text-lg font-black text-slate-900">Current operational priorities</h3>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full">Attention</span>
                    </div>
                    <div className="p-8 grid gap-4">
                        {[
                            ['Lab access card issue', 'Assigned to support desk', 'High'],
                            ['Projector maintenance request', 'Waiting for technician update', 'Medium'],
                            ['Room conflict escalation', 'Pending admin review', 'High']
                        ].map(([title, status, priority]) => (
                            <div key={title} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-[1.5rem] border border-slate-100 bg-slate-50/60 px-5 py-5">
                                <div>
                                    <h4 className="text-sm font-black text-slate-900 mb-1">{title}</h4>
                                    <p className="text-xs font-medium text-slate-500">{status}</p>
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${
                                    priority === 'High' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
                                }`}>
                                    {priority} Priority
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminTicketManagement;
