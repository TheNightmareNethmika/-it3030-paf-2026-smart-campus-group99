import React, { useState, useEffect, useCallback, useMemo } from 'react';
import api from '../utils/api';
import AdminLayout from '../components/AdminLayout';

const ROLES = ['USER', 'TECHNICIAN', 'ADMIN'];

const roleMeta = {
    ADMIN:      { label: 'Admin',      bg: 'bg-indigo-100', text: 'text-indigo-700',  dot: 'bg-indigo-500'  },
    TECHNICIAN: { label: 'Technician', bg: 'bg-amber-100',  text: 'text-amber-700',   dot: 'bg-amber-500'   },
    USER:       { label: 'User',       bg: 'bg-slate-100',  text: 'text-slate-600',   dot: 'bg-slate-400'   },
};

const RoleBadge = ({ role }) => {
    const m = roleMeta[role] || roleMeta.USER;
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${m.bg} ${m.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`}></span>
            {m.label}
        </span>
    );
};

const avatarColor = (str = '') => {
    const colors = [
        'bg-indigo-100 text-indigo-600',
        'bg-violet-100 text-violet-600',
        'bg-amber-100 text-amber-600',
        'bg-emerald-100 text-emerald-600',
        'bg-rose-100 text-rose-600',
        'bg-sky-100 text-sky-600',
    ];
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
};

const EMPTY_FORM = { name: '', email: '', phone: '', password: '', role: 'USER' };

const AdminUserManagement = () => {
    const [users, setUsers]         = useState([]);
    const [loading, setLoading]     = useState(true);
    const [error, setError]         = useState('');
    const [success, setSuccess]     = useState('');
    const [search, setSearch]       = useState('');
    const [roleFilter, setRoleFilter] = useState('ALL');
    const [editingRole, setEditingRole] = useState(null);
    const [savingRole, setSavingRole]   = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    // Add User modal
    const [showAddModal, setShowAddModal]   = useState(false);
    const [addForm, setAddForm]             = useState(EMPTY_FORM);
    const [addErrors, setAddErrors]         = useState({});
    const [addLoading, setAddLoading]       = useState(false);
    const [showPassword, setShowPassword]   = useState(false);

    const currentEmail = localStorage.getItem('email');

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const { data } = await api.get('/admin/users');
            setUsers(data);
        } catch {
            setError('Failed to fetch users. Access might be restricted.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    useEffect(() => {
        if (success) {
            const t = setTimeout(() => setSuccess(''), 4000);
            return () => clearTimeout(t);
        }
    }, [success]);

    const stats = useMemo(() => ({
        total:      users.length,
        admins:     users.filter(u => u.role === 'ADMIN').length,
        techs:      users.filter(u => u.role === 'TECHNICIAN').length,
        regular:    users.filter(u => u.role === 'USER').length,
    }), [users]);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return users.filter(u => {
            const matchRole = roleFilter === 'ALL' || u.role === roleFilter;
            const matchSearch = !q || (u.name || '').toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
            return matchRole && matchSearch;
        });
    }, [users, search, roleFilter]);

    const handleRoleSave = async (userId, newRole) => {
        setSavingRole(userId);
        try {
            await api.put(`/admin/users/${userId}/role`, { role: newRole });
            setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
            setSuccess('User role updated successfully.');
        } catch {
            setError('Failed to update role.');
        } finally {
            setSavingRole(null);
            setEditingRole(null);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/admin/users/${id}`);
            setUsers(prev => prev.filter(u => u.id !== id));
            setSuccess('User account removed successfully.');
        } catch {
            setError('Failed to remove user account.');
        } finally {
            setConfirmDelete(null);
        }
    };

    const validateAddForm = () => {
        const errs = {};
        if (!addForm.name.trim())               errs.name     = 'Full name is required.';
        if (!addForm.email.trim())              errs.email    = 'Email address is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addForm.email)) errs.email = 'Enter a valid email address.';
        if (addForm.phone && !/^\+?[\d\s\-()]{7,15}$/.test(addForm.phone)) errs.phone = 'Enter a valid phone number.';
        if (!addForm.password)                  errs.password = 'Password is required.';
        else if (addForm.password.length < 6)  errs.password = 'Password must be at least 6 characters.';
        return errs;
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        const errs = validateAddForm();
        if (Object.keys(errs).length) { setAddErrors(errs); return; }
        setAddLoading(true);
        setAddErrors({});
        try {
            const { data } = await api.post('/admin/users', {
                name:     addForm.name.trim(),
                email:    addForm.email.trim().toLowerCase(),
                phone:    addForm.phone.trim() || null,
                password: addForm.password,
                role:     addForm.role,
            });
            setUsers(prev => [...prev, data]);
            setSuccess(`User "${data.name || data.email}" has been registered successfully.`);
            setShowAddModal(false);
            setAddForm(EMPTY_FORM);
            setShowPassword(false);
        } catch (err) {
            const msg = err.response?.data?.error || 'Failed to create user. Please try again.';
            setAddErrors({ submit: msg });
        } finally {
            setAddLoading(false);
        }
    };

    const closeAddModal = () => {
        setShowAddModal(false);
        setAddForm(EMPTY_FORM);
        setAddErrors({});
        setShowPassword(false);
    };

    return (
        <AdminLayout>
            <div className="animate-up space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                            Admin Access
                        </span>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">User Management</h1>
                        <p className="mt-1 text-sm text-slate-500 font-medium">View, search, and manage all platform members and their access roles.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchUsers}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 shadow-sm transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh
                        </button>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                            </svg>
                            Add User
                        </button>
                    </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Members', value: stats.total,   accent: 'from-indigo-500 to-violet-500', surface: 'bg-indigo-50 text-indigo-600',  icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
                        { label: 'Admins',        value: stats.admins,  accent: 'from-violet-500 to-purple-500', surface: 'bg-violet-50 text-violet-600',  icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                        { label: 'Technicians',   value: stats.techs,   accent: 'from-amber-500 to-orange-500', surface: 'bg-amber-50 text-amber-600',    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
                        { label: 'Regular Users', value: stats.regular, accent: 'from-emerald-500 to-teal-500', surface: 'bg-emerald-50 text-emerald-600', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                    ].map((s) => (
                        <div key={s.label} className="bg-white border border-slate-100 rounded-[1.5rem] p-5 shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.surface}`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d={s.icon} />
                                    </svg>
                                </div>
                                <div className={`h-2 w-16 rounded-full bg-gradient-to-r ${s.accent} opacity-70`}></div>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{s.label}</p>
                            <p className="text-3xl font-black text-slate-900">{loading ? '—' : s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Alerts */}
                {success && (
                    <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700 rounded-xl shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                            <span className="font-bold text-sm">{success}</span>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-700 rounded-xl shadow-sm flex justify-between items-center">
                        <span className="font-bold text-sm">{error}</span>
                        <button onClick={() => setError('')} className="font-black text-lg opacity-50 hover:opacity-100 ml-4">&times;</button>
                    </div>
                )}

                {/* Search + Filter toolbar */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search by name or email…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm"
                        />
                        {search && (
                            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {['ALL', ...ROLES].map(r => (
                            <button
                                key={r}
                                onClick={() => setRoleFilter(r)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${
                                    roleFilter === r
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700'
                                }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white border border-slate-100 rounded-[2rem] shadow-[0_12px_35px_rgba(15,23,42,0.05)] overflow-hidden">
                    {/* Table header count */}
                    <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                            {loading ? 'Loading…' : `Showing ${filtered.length} of ${users.length} members`}
                        </p>
                        {search || roleFilter !== 'ALL' ? (
                            <button
                                onClick={() => { setSearch(''); setRoleFilter('ALL'); }}
                                className="text-xs font-bold text-indigo-500 hover:text-indigo-700 transition-colors"
                            >
                                Clear filters
                            </button>
                        ) : null}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Member</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Role</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="3" className="px-8 py-20 text-center">
                                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mb-4"></div>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Syncing members…</p>
                                        </td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" className="px-8 py-20 text-center">
                                            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <p className="text-sm font-bold text-slate-500">No members match your filters.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((user) => {
                                        const isSelf   = user.email === currentEmail;
                                        const initials = (user.name?.[0] || user.email[0]).toUpperCase();
                                        const avColor  = avatarColor(user.email);
                                        const isEditing = editingRole === user.id;
                                        const isSaving  = savingRole === user.id;

                                        return (
                                            <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors group">
                                                {/* Member */}
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border border-white ring-1 ring-slate-100 ${avColor}`}>
                                                            {initials}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-900 leading-none mb-1">
                                                                {user.name || 'Anonymous User'}
                                                                {isSelf && <span className="ml-2 text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-50 px-1.5 py-0.5 rounded-full">You</span>}
                                                            </p>
                                                            <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Role */}
                                                <td className="px-8 py-5">
                                                    {isEditing ? (
                                                        <div className="flex items-center gap-2">
                                                            <select
                                                                defaultValue={user.role}
                                                                disabled={isSaving}
                                                                onChange={e => handleRoleSave(user.id, e.target.value)}
                                                                className="text-xs font-bold border border-indigo-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white text-slate-700"
                                                                autoFocus
                                                            >
                                                                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                                                            </select>
                                                            {isSaving && (
                                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"></div>
                                                            )}
                                                            <button
                                                                onClick={() => setEditingRole(null)}
                                                                className="text-slate-400 hover:text-slate-600"
                                                                disabled={isSaving}
                                                            >
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <RoleBadge role={user.role} />
                                                            {!isSelf && (
                                                                <button
                                                                    onClick={() => setEditingRole(user.id)}
                                                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                                                                    title="Change role"
                                                                >
                                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                    </svg>
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-8 py-5 text-right">
                                                    {isSelf ? (
                                                        <span className="text-[11px] text-slate-400 font-bold">Current session</span>
                                                    ) : (
                                                        <button
                                                            onClick={() => setConfirmDelete(user)}
                                                            className="px-4 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100"
                                                        >
                                                            Remove Access
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add User modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeAddModal}></div>
                    <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden">

                        {/* Modal header */}
                        <div className="px-8 pt-8 pb-6 border-b border-slate-100 flex items-start justify-between">
                            <div>
                                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-black text-slate-900">Add New User</h3>
                                <p className="text-sm text-slate-500 font-medium mt-1">Register a new member to the platform.</p>
                            </div>
                            <button onClick={closeAddModal} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors mt-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleAddUser} noValidate>
                            <div className="px-8 py-6 space-y-5 max-h-[60vh] overflow-y-auto">

                                {/* Submit-level error */}
                                {addErrors.submit && (
                                    <div className="p-3.5 bg-rose-50 border-l-4 border-rose-500 text-rose-700 rounded-xl text-sm font-semibold">
                                        {addErrors.submit}
                                    </div>
                                )}

                                {/* Full Name */}
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                                        Full Name <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={addForm.name}
                                        onChange={e => { setAddForm(f => ({ ...f, name: e.target.value })); setAddErrors(e2 => ({ ...e2, name: '' })); }}
                                        placeholder="e.g. John Smith"
                                        className={`w-full px-4 py-3 border rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 transition-shadow ${addErrors.name ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-indigo-200'}`}
                                    />
                                    {addErrors.name && <p className="mt-1.5 text-xs text-rose-500 font-semibold">{addErrors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                                        Email Address <span className="text-rose-400">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={addForm.email}
                                        onChange={e => { setAddForm(f => ({ ...f, email: e.target.value })); setAddErrors(e2 => ({ ...e2, email: '' })); }}
                                        placeholder="e.g. john@university.edu"
                                        className={`w-full px-4 py-3 border rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 transition-shadow ${addErrors.email ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-indigo-200'}`}
                                    />
                                    {addErrors.email && <p className="mt-1.5 text-xs text-rose-500 font-semibold">{addErrors.email}</p>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                                        Phone Number <span className="text-slate-400 font-bold normal-case tracking-normal">(optional)</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={addForm.phone}
                                        onChange={e => { setAddForm(f => ({ ...f, phone: e.target.value })); setAddErrors(e2 => ({ ...e2, phone: '' })); }}
                                        placeholder="e.g. +1 555 123 4567"
                                        className={`w-full px-4 py-3 border rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 transition-shadow ${addErrors.phone ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-indigo-200'}`}
                                    />
                                    {addErrors.phone && <p className="mt-1.5 text-xs text-rose-500 font-semibold">{addErrors.phone}</p>}
                                </div>

                                {/* Role */}
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                                        Role <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {ROLES.map(r => {
                                            const m = roleMeta[r];
                                            const selected = addForm.role === r;
                                            return (
                                                <button
                                                    key={r}
                                                    type="button"
                                                    onClick={() => setAddForm(f => ({ ...f, role: r }))}
                                                    className={`flex flex-col items-center gap-1.5 px-3 py-3.5 rounded-xl border-2 transition-all text-xs font-black uppercase tracking-widest ${
                                                        selected
                                                            ? `${m.bg} ${m.text} border-current`
                                                            : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600'
                                                    }`}
                                                >
                                                    <span className={`w-2.5 h-2.5 rounded-full ${selected ? m.dot : 'bg-slate-300'}`}></span>
                                                    {m.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                                        Password <span className="text-rose-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={addForm.password}
                                            onChange={e => { setAddForm(f => ({ ...f, password: e.target.value })); setAddErrors(e2 => ({ ...e2, password: '' })); }}
                                            placeholder="Min. 6 characters"
                                            className={`w-full px-4 py-3 pr-11 border rounded-xl text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 transition-shadow ${addErrors.password ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-indigo-200'}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(v => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            {showPassword ? (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                            )}
                                        </button>
                                    </div>
                                    {addErrors.password && <p className="mt-1.5 text-xs text-rose-500 font-semibold">{addErrors.password}</p>}
                                </div>

                            </div>

                            {/* Footer actions */}
                            <div className="px-8 py-6 bg-slate-50/60 border-t border-slate-100 flex gap-3">
                                <button
                                    type="button"
                                    onClick={closeAddModal}
                                    disabled={addLoading}
                                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-white transition-colors disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={addLoading}
                                    className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-sm transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                                >
                                    {addLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Registering…
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                                            Register User
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete confirmation modal */}
            {confirmDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setConfirmDelete(null)}></div>
                    <div className="relative bg-white rounded-[2rem] shadow-2xl p-8 max-w-sm w-full">
                        <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                            <svg className="w-7 h-7 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 text-center mb-2">Remove User Access?</h3>
                        <p className="text-sm text-slate-500 text-center mb-1 font-medium">
                            You're about to remove <span className="font-bold text-slate-700">{confirmDelete.name || confirmDelete.email}</span> from the platform.
                        </p>
                        <p className="text-xs text-rose-400 font-bold text-center mb-8">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(confirmDelete.id)}
                                className="flex-1 px-4 py-3 rounded-xl bg-rose-500 text-white text-sm font-bold hover:bg-rose-600 transition-colors shadow-sm"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminUserManagement;
