import React from 'react';

const AdminSidebar = () => {
  const menuItems = [
    { label: 'Resource Management', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { label: 'Ticket Management', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h3l2 3 2-3h3a2 2 0 002-2V7a2 2 0 00-2-2H9z' },
    { label: 'Booking Management', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ];

  const handlePlaceholderClick = (label) => {
    console.log(`${label} is currently disabled.`);
  };

  return (
    <aside className="fixed left-0 top-[72px] bottom-0 w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col z-[50]">
      <div className="flex-1 py-10 px-6 space-y-4 overflow-y-auto">
        <div className="px-4 mb-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Admin Workspace</p>
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Control Hub</h2>
        </div>
        {menuItems.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handlePlaceholderClick(item.label)}
            className="flex w-full items-center gap-4 px-5 py-3.5 rounded-2xl font-bold transition-all duration-200 group text-[#64748B] hover:bg-[#E0E7FF] hover:text-[#0F172A] hover:translate-x-1"
          >
            <svg className="w-5 h-5 transition-colors duration-200 text-slate-400 group-hover:text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d={item.icon} />
            </svg>
            <span className="text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </div>
      
      {/* Sidebar Footer */}
      <div className="p-8">
        <div className="bg-slate-50 border border-slate-100 p-5 rounded-3xl">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 text-center">Operations</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-600">Security</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Live</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-600">Bookings</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">Tracked</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
