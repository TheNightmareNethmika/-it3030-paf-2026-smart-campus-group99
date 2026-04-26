import React, { useCallback, useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import api from '../utils/api';

const statusStyle = (s) => {
  if (s === 'APPROVED') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  if (s === 'REJECTED') return 'bg-rose-50 text-rose-700 border-rose-100';
  return 'bg-amber-50 text-amber-700 border-amber-100';
};

const AdminBookingManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');
  const [rejectId, setRejectId] = useState(null);
  const [rejectNote, setRejectNote] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const load = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      const params = filter ? { status: filter } : {};
      const { data } = await api.get('/api/admin/bookings', { params });
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError('Could not load bookings.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    load();
  }, [load]);

  const approve = async (id) => {
    setActionLoading(true);
    try {
      await api.post(`/api/admin/bookings/${id}/approve`);
      await load();
    } catch (e) {
      const m = e.response?.data?.message;
      alert(typeof m === 'string' ? m : 'Could not approve.');
    } finally {
      setActionLoading(false);
    }
  };

  const reject = async () => {
    if (rejectId == null) return;
    setActionLoading(true);
    try {
      const payload = rejectNote.trim() ? { note: rejectNote.trim() } : {};
      await api.post(`/api/admin/bookings/${rejectId}/reject`, payload);
      setRejectId(null);
      setRejectNote('');
      await load();
    } catch (e) {
      const m = e.response?.data?.message;
      alert(typeof m === 'string' ? m : 'Could not reject.');
    } finally {
      setActionLoading(false);
    }
  };

  const pending = items.filter((b) => b.status === 'PENDING').length;

  return (
    <AdminLayout>
      <div className="animate-up">
        <div className="mb-8">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-2">
            Admin Module
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-3">Booking Management</h1>
          <p className="text-sm font-medium text-slate-500 max-w-2xl">
            Review resource booking requests. Approve or reject; users are notified automatically.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-xs font-bold text-slate-500">Filter:</span>
          {['', 'PENDING', 'APPROVED', 'REJECTED'].map((f) => (
            <button
              key={f || 'all'}
              type="button"
              onClick={() => setFilter(f)}
              className={`text-xs font-black uppercase tracking-wider px-4 py-2 rounded-xl border ${
                filter === f
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
              }`}
            >
              {f === '' ? 'All' : f}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 text-rose-700 text-sm font-bold">{error}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          <div className="bg-white border border-slate-100 rounded-[2rem] shadow-[0_12px_35px_rgba(15,23,42,0.05)] overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">
                  Requests
                </p>
                <h3 className="text-lg font-black text-slate-900">Booking queue</h3>
              </div>
              <button
                type="button"
                onClick={load}
                className="text-xs font-bold text-primary hover:underline"
              >
                Refresh
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {loading ? (
                <p className="text-sm text-slate-400 text-center py-12">Loading…</p>
              ) : items.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-12">No bookings match this filter.</p>
              ) : (
                items.map((b) => (
                  <div
                    key={b.id}
                    className="rounded-[1.5rem] border border-slate-100 bg-slate-50/60 px-5 py-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="text-sm font-black text-slate-900 mb-1">{b.resourceName}</h4>
                        <p className="text-xs text-slate-500 mb-2">{b.location}</p>
                        <p className="text-xs text-slate-600">
                          {b.startAt && b.endAt
                            ? `${new Date(b.startAt).toLocaleString()} → ${new Date(
                                b.endAt,
                              ).toLocaleString()}`
                            : ''}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          <span className="font-bold">Requester:</span> {b.requesterName} ·{' '}
                          {b.requesterEmail}
                        </p>
                        {b.purpose && (
                          <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                            <span className="font-bold">Purpose:</span> {b.purpose}
                          </p>
                        )}
                        {b.adminNote && (
                          <p className="text-xs text-rose-600 mt-2">Admin note: {b.adminNote}</p>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border shrink-0 ${statusStyle(
                          b.status,
                        )}`}
                      >
                        {b.status}
                      </span>
                    </div>
                    {b.status === 'PENDING' && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        <button
                          type="button"
                          disabled={actionLoading}
                          onClick={() => approve(b.id)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-black uppercase tracking-wider hover:bg-emerald-700 disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          disabled={actionLoading}
                          onClick={() => {
                            setRejectId(b.id);
                            setRejectNote('');
                          }}
                          className="px-4 py-2 rounded-xl border border-rose-200 text-rose-700 text-xs font-black uppercase tracking-wider hover:bg-rose-50 disabled:opacity-50"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-8 shadow-[0_18px_45px_rgba(15,23,42,0.18)] h-fit">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-2">
              Snapshot
            </p>
            <h3 className="text-2xl font-black text-white tracking-tight mb-6">Queue</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between px-4 py-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-sm font-semibold text-white/75">Pending</span>
                <span className="text-[11px] font-black uppercase tracking-widest text-amber-300">
                  {loading ? '—' : pending}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-sm font-semibold text-white/75">Listed</span>
                <span className="text-[11px] font-black uppercase tracking-widest text-white">
                  {items.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {rejectId != null && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-slate-900/50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-black text-slate-900 mb-2">Reject booking</h3>
            <p className="text-xs text-slate-500 mb-4">Optional message to the requester.</p>
            <textarea
              className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm min-h-[100px] mb-4"
              placeholder="Reason (optional)"
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setRejectId(null);
                  setRejectNote('');
                }}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={reject}
                className="flex-1 py-3 rounded-xl bg-rose-600 text-white text-sm font-black disabled:opacity-50"
              >
                {actionLoading ? '…' : 'Confirm reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminBookingManagement;
