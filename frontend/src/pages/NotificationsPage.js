import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AdminSidebar from '../components/AdminSidebar';
import TechnicianSidebar from '../components/TechnicianSidebar';
import Footer from '../components/Footer';
import api from '../utils/api';

const NotificationsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const role = localStorage.getItem('role') || 'USER';

  const load = useCallback(async () => {
    setError(null);
    try {
      const { data } = await api.get('/api/notifications');
      setItems(data || []);
    } catch (e) {
      const msg = e?.response?.data?.message;
      if (
        e?.response?.status === 500 &&
        typeof msg === 'string' &&
        msg.includes('No static resource') &&
        msg.includes('api/notifications')
      ) {
        setError(
          'The backend is not serving the notifications API yet. Stop the Spring Boot process and start it again (e.g. mvnw spring-boot:run), then refresh this page.'
        );
      } else {
        setError('Could not load notifications.');
      }
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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

  const markRead = async (id) => {
    try {
      await api.patch(`/api/notifications/${id}/read`);
      setItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const markAllRead = async () => {
    try {
      await api.post('/api/notifications/read-all');
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans selection:bg-indigo-100 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-100/20 rounded-full blur-[100px] pointer-events-none" />

      <Navbar />

      <div className="flex flex-1 relative z-10">
        {renderSidebar()}

        <main
          className={`flex-1 ${
            role === 'USER' ? 'lg:ml-64' : 'lg:ml-72'
          } p-6 md:p-8 transition-all duration-300`}
        >
          <div className="max-w-3xl mx-auto w-full">
            <header className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-[0.2em] rounded-md mb-2 border border-indigo-100">
                  In-app
                </span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Notifications</h1>
                <p className="text-sm text-slate-500 mt-1">
                  Help desk updates: status changes and new comments.
                </p>
              </div>
              {items.some((n) => !n.read) && (
                <button
                  type="button"
                  onClick={markAllRead}
                  className="self-start sm:self-center text-xs font-bold text-primary hover:text-indigo-700 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm"
                >
                  Mark all as read
                </button>
              )}
            </header>

            {loading && (
              <p className="text-sm text-slate-500">Loading…</p>
            )}
            {error && <p className="text-sm text-rose-600">{error}</p>}

            {!loading && !error && items.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 p-10 text-center text-slate-500 text-sm">
                You have no notifications yet.
              </div>
            )}

            <ul className="space-y-3">
              {items.map((n) => (
                <li
                  key={n.id}
                  className={`rounded-2xl border p-4 transition-colors ${
                    n.read
                      ? 'bg-white border-slate-100'
                      : 'bg-indigo-50/50 border-indigo-100'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {n.bookingId != null
                          ? 'Booking'
                          : n.type === 'ISSUE_COMMENT'
                            ? 'Comment'
                            : 'Status'}
                        {n.issueId != null && (
                          <>
                            {' '}
                            ·
                            <Link
                              to={`/m3/issues/${n.issueId}`}
                              className="text-primary ml-1 hover:underline"
                            >
                              Issue #{n.issueId}
                            </Link>
                          </>
                        )}
                        {n.bookingId != null && (
                          <>
                            {' '}
                            ·
                            <Link
                              to={`/book?highlight=${n.bookingId}`}
                              className="text-primary ml-1 hover:underline"
                            >
                              Booking #{n.bookingId}
                            </Link>
                          </>
                        )}
                      </p>
                      <h2 className="text-sm font-black text-slate-900 mt-1">{n.title}</h2>
                      <p className="text-sm text-slate-600 mt-1 break-words">{n.message}</p>
                      <p className="text-[10px] text-slate-400 mt-2">
                        {n.createdAt
                          ? new Date(n.createdAt).toLocaleString()
                          : ''}
                      </p>
                    </div>
                    {!n.read && (
                      <button
                        type="button"
                        onClick={() => markRead(n.id)}
                        className="shrink-0 text-xs font-bold text-slate-600 hover:text-primary bg-white border border-slate-200 rounded-lg px-3 py-1.5"
                      >
                        Mark read
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default NotificationsPage;
