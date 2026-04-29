import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AdminSidebar from '../components/AdminSidebar';
import TechnicianSidebar from '../components/TechnicianSidebar';
import ResourceFilters from '../components/catalogue/ResourceFilters';

const statusBadge = (status) => {
  switch (status) {
    case 'PENDING':
      return 'bg-amber-50 text-amber-700 border-amber-100';
    case 'APPROVED':
      return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    case 'REJECTED':
      return 'bg-rose-50 text-rose-700 border-rose-100';
    default:
      return 'bg-slate-50 text-slate-500 border-slate-100';
  }
};

const UserResourceCatalogue = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [resources, setResources] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookError, setBookError] = useState('');
  const [saving, setSaving] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    minCapacity: '',
    location: '',
    status: 'WORKING',
  });
  const [modal, setModal] = useState(null);
  const [formDate, setFormDate] = useState('');
  const [formStart, setFormStart] = useState('09:00');
  const [formEnd, setFormEnd] = useState('10:00');
  const [formPurpose, setFormPurpose] = useState('');

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      const { type, minCapacity, location, status } = filters;
      const response = await api.get('/api/resources', {
        params: { type, minCapacity, location, status },
      });
      setResources(response.data);
    } catch (err) {
      setError('Unable to load catalogue. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchMyBookings = useCallback(async () => {
    try {
      const { data } = await api.get('/api/bookings/mine');
      setBookings(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  useEffect(() => {
    fetchMyBookings();
  }, [fetchMyBookings]);

  useEffect(() => {
    const h = searchParams.get('highlight');
    if (!h) return;
    const t = setTimeout(() => {
      const el = document.getElementById(`booking-${h}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 400);
    return () => clearTimeout(t);
  }, [searchParams, bookings]);

  const getStatusStyles = (status) => {
    switch (status) {
      case 'WORKING':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'OUT_OF_SERVICE':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      default:
        return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  const role = localStorage.getItem('role') || 'USER';

  const openBookModal = (resource) => {
    setBookError('');
    setModal(resource);
    const t = new Date();
    setFormDate(t.toISOString().slice(0, 10));
    setFormStart('09:00');
    setFormEnd('10:00');
    setFormPurpose('');
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    if (!modal) return;
    setSaving(true);
    setBookError('');
    try {
      const startAt = `${formDate}T${formStart.length === 5 ? `${formStart}:00` : formStart}`;
      const endAt = `${formDate}T${formEnd.length === 5 ? `${formEnd}:00` : formEnd}`;
      await api.post('/api/bookings', {
        resourceId: modal.id,
        startAt,
        endAt,
        purpose: formPurpose || undefined,
      });
      setModal(null);
      await fetchMyBookings();
    } catch (err) {
      const m = err.response?.data?.message || err.response?.data?.error;
      setBookError(
        typeof m === 'string' ? m : 'Could not create booking. Check times and try again.',
      );
    } finally {
      setSaving(false);
    }
  };

  const renderSidebar = () => {
    switch (role) {
      case 'ADMIN':
        return <AdminSidebar />;
      case 'TECHNICIAN':
        return <TechnicianSidebar />;
      default:
        return <Sidebar />;
    }
  };

  const highlight = searchParams.get('highlight');
  const highlightRef = (id) =>
    String(highlight) === String(id) ? 'ring-2 ring-indigo-500 ring-offset-2' : '';

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans relative overflow-hidden">
      <Navbar />

      <div className="flex flex-1">
        {renderSidebar()}

        <main
          className={`flex-1 ${
            role === 'USER' ? 'lg:ml-64' : 'lg:ml-72'
          } p-6 md:p-8 transition-all duration-300`}
        >
          <div className="max-w-6xl mx-auto">
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">
                  Book resources
                </h1>
                <p className="text-slate-400 font-medium italic">
                  Campus facilities and equipment managed by your admin team.
                </p>
              </div>
              <div className="bg-white p-2 border border-slate-200/60 rounded-2xl shadow-sm flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">
                  Available:
                </span>
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-xl text-xs font-black">
                  {resources.length}
                </span>
              </div>
            </header>

            {bookings.length > 0 && (
              <section className="mb-12">
                <h2 className="text-sm font-black text-slate-800 mb-4 uppercase tracking-widest">
                  My booking requests
                </h2>
                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      id={`booking-${b.id}`}
                      className={`rounded-2xl border p-4 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${highlightRef(
                        b.id,
                      )}`}
                    >
                      <div>
                        <p className="text-xs font-black text-slate-900">
                          {b.resourceName}
                          <span className="text-slate-400 font-bold ml-2">
                            {b.location}
                          </span>
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {b.startAt && b.endAt
                            ? `${new Date(b.startAt).toLocaleString()} → ${new Date(
                                b.endAt,
                              ).toLocaleString()}`
                            : ''}
                        </p>
                        {b.purpose && (
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2">{b.purpose}</p>
                        )}
                        {b.status === 'REJECTED' && b.adminNote && (
                          <p className="text-xs text-rose-600 mt-1">Note: {b.adminNote}</p>
                        )}
                      </div>
                      <span
                        className={`self-start sm:self-center text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${statusBadge(
                          b.status,
                        )}`}
                      >
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
                {highlight && (
                  <button
                    type="button"
                    onClick={() => setSearchParams({})}
                    className="text-xs font-bold text-slate-500 mt-2 hover:underline"
                  >
                    Clear highlight
                  </button>
                )}
              </section>
            )}

            <div className="mb-10 animate-fade-in">
              <ResourceFilters filters={filters} setFilters={setFilters} />
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-600 p-6 rounded-3xl text-center mb-10 font-bold">
                {error}
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600" />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  Loading catalogue…
                </p>
              </div>
            ) : resources.length === 0 ? (
              <div className="bg-white p-20 rounded-[2.5rem] border border-slate-100 text-center shadow-sm">
                <h3 className="text-xl font-black text-slate-800 mb-2">No resources found</h3>
                <p className="text-slate-400 text-sm">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="group bg-white rounded-[2.5rem] border border-slate-100 p-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-indigo-100 overflow-hidden relative"
                  >
                    <div className="bg-slate-50 rounded-[2.1rem] p-6 mb-4 relative overflow-hidden">
                      <span className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest border border-slate-100">
                        {resource.type.replace('_', ' ')}
                      </span>
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 group-hover:rotate-3 transition duration-500">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-black text-slate-800 leading-tight mb-2 group-hover:text-indigo-600 transition">
                        {resource.name}
                      </h3>
                      <p className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-tighter">
                        {resource.location}
                      </p>
                      {resource.availableStartTime && resource.availableEndTime && (
                        <p className="text-[10px] text-slate-500 mt-2">
                          Hours: {resource.availableStartTime} – {resource.availableEndTime}
                        </p>
                      )}
                    </div>
                    <div className="px-6 pb-6">
                      <div className="flex items-center justify-between mb-6 pt-2">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-slate-300 uppercase">
                            Capacity
                          </span>
                          <span className="text-sm font-black text-slate-700">
                            {resource.capacity ?? '—'}
                          </span>
                        </div>
                        <div
                          className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-b-4 ${getStatusStyles(
                            resource.status,
                          )}`}
                        >
                          {resource.status}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => openBookModal(resource)}
                        disabled={resource.status !== 'WORKING'}
                        className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 hover:bg-slate-900 transition-all transform active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {resource.status === 'WORKING' ? 'Book now' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-center text-xs text-slate-400">
              Need help? <Link to="/m3" className="text-primary font-bold">Open Help desk</Link>
            </p>
          </div>
        </main>
      </div>

      {modal && (
        <div className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-100 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal
            aria-labelledby="book-modal-title"
          >
            <h2 id="book-modal-title" className="text-lg font-black text-slate-900 mb-1">
              Book {modal.name}
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              {modal.location} · same-day slot within {modal.availableStartTime} –{' '}
              {modal.availableEndTime}
            </p>
            <form onSubmit={submitBooking} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                    Start
                  </label>
                  <input
                    type="time"
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    value={formStart}
                    onChange={(e) => setFormStart(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                    End
                  </label>
                  <input
                    type="time"
                    required
                    className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                    value={formEnd}
                    onChange={(e) => setFormEnd(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase block mb-1">
                  Purpose (optional)
                </label>
                <textarea
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm min-h-[80px]"
                  placeholder="What will you use this space for?"
                  value={formPurpose}
                  onChange={(e) => setFormPurpose(e.target.value)}
                  maxLength={2000}
                />
              </div>
              {bookError && (
                <div className="text-xs text-rose-600 font-bold bg-rose-50 p-3 rounded-xl">
                  {bookError}
                </div>
              )}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-3 rounded-xl bg-indigo-600 text-white text-sm font-black disabled:opacity-50"
                >
                  {saving ? 'Sending…' : 'Submit request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserResourceCatalogue;
