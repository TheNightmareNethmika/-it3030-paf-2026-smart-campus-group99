import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, CalendarDays, HelpCircle, Search, Settings } from 'lucide-react';
import logoIcon from '../assets/uniflow-icon.svg';
import api from '../utils/api';

const NotificationMenu = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const rootRef = useRef(null);

  const fetchUnread = useCallback(async () => {
    try {
      const { data } = await api.get('/api/notifications/unread-count');
      setUnread(data.unreadCount ?? 0);
    } catch {
      // ignore: user may be offline; avoid breaking the bar
    }
  }, []);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/notifications');
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUnread();
    const id = setInterval(fetchUnread, 60000);
    return () => clearInterval(id);
  }, [fetchUnread]);

  useEffect(() => {
    if (open) {
      fetchList();
      fetchUnread();
    }
  }, [open, fetchList, fetchUnread]);

  useEffect(() => {
    const onDoc = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const onMarkRead = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.patch(`/api/notifications/${id}/read`);
      setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
      setUnread((u) => Math.max(0, u - 1));
    } catch {
      // ignore
    }
  };

  const onMarkAll = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.post('/api/notifications/read-all');
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnread(0);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative z-[1001]" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-all group"
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell size={20} className="group-hover:text-primary transition-colors" />
        {unread > 0 && (
          <span
            className="absolute top-1.5 right-1.5 min-w-[1.125rem] h-[1.125rem] px-1 flex items-center justify-center text-[9px] font-black text-white bg-rose-500 rounded-full border-2 border-white"
            aria-hidden
          >
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-[min(100vw-2rem,20rem)] max-h-[min(24rem,70vh)] overflow-hidden flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/80">
            <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Notifications</span>
            {items.some((n) => !n.read) && (
              <button
                type="button"
                onClick={onMarkAll}
                className="text-[10px] font-bold text-primary hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>
          <div className="overflow-y-auto flex-1 p-2">
            {loading && (
              <p className="text-xs text-slate-400 px-2 py-4 text-center">Loading…</p>
            )}
            {!loading && items.length === 0 && (
              <p className="text-xs text-slate-500 px-2 py-6 text-center">No notifications yet.</p>
            )}
            <ul className="space-y-1">
              {items.slice(0, 8).map((n) => (
                <li key={n.id}>
                  <div
                    className={`rounded-xl px-3 py-2.5 text-left ${
                      n.read ? 'bg-white' : 'bg-indigo-50/60'
                    }`}
                  >
                    <p className="text-[10px] font-bold text-slate-500 uppercase">
                      {n.bookingId != null
                        ? 'Booking'
                        : n.type === 'ISSUE_COMMENT'
                          ? 'Comment'
                          : 'Status'}
                    </p>
                    <p className="text-xs font-bold text-slate-900 line-clamp-1">{n.title}</p>
                    <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">{n.message}</p>
                    <div className="flex items-center justify-between gap-2 mt-2">
                      {n.issueId != null && (
                        <Link
                          to={`/m3/issues/${n.issueId}`}
                          className="text-[10px] font-bold text-primary hover:underline"
                          onClick={() => setOpen(false)}
                        >
                          Open issue
                        </Link>
                      )}
                      {n.bookingId != null && (
                        <Link
                          to={`/book?highlight=${n.bookingId}`}
                          className="text-[10px] font-bold text-primary hover:underline"
                          onClick={() => setOpen(false)}
                        >
                          View booking
                        </Link>
                      )}
                      {!n.read && (
                        <button
                          type="button"
                          onClick={(e) => onMarkRead(e, n.id)}
                          className="ml-auto text-[10px] font-bold text-slate-600 hover:text-primary"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-slate-100 px-3 py-2 bg-slate-50/50">
            <Link
              to="/notifications"
              className="block text-center text-[11px] font-bold text-primary py-1.5 hover:underline"
              onClick={() => setOpen(false)}
            >
              View all
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const helpActive = location.pathname === '/m3' || location.pathname.startsWith('/m3/');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="sticky top-0 z-[1000] bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <nav className="container mx-auto px-4 md:px-8 flex justify-between items-center py-2.5">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <div className="bg-primary/5 p-2 rounded-xl group-hover:bg-primary/10 transition-colors">
              <img src={logoIcon} alt="UniFlow Logo" className="w-[32px] md:w-[36px] h-auto" />
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-800">UniFlow</span>
          </Link>
          
          {token && (
            <div className="hidden lg:flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200/50 w-80">
              <Search size={16} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Search resources, tasks..." 
                className="bg-transparent border-none outline-none text-xs font-semibold text-slate-600 w-full placeholder:text-slate-400"
              />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 md:gap-6">
          {!token ? (
            <div className="flex items-center gap-2 md:gap-3">
              <Link
                to="/book"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold no-underline text-slate-600 border border-slate-200/80 hover:border-primary/30 hover:text-primary hover:bg-slate-50"
              >
                <CalendarDays size={16} className="shrink-0" aria-hidden />
                Book now
              </Link>
              <Link
                to="/m3"
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold no-underline transition-colors ${
                  helpActive
                    ? 'text-primary bg-primary/10'
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                }`}
              >
                <HelpCircle size={16} className="shrink-0" aria-hidden />
                Help desk
              </Link>
              <Link to="/login" className="px-5 py-2 text-xs font-bold text-slate-600 hover:text-primary transition-colors no-underline">Login</Link>
              <Link to="/register" className="bg-primary text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 hover:bg-primary-dark transition-all no-underline">Get Started</Link>
            </div>
          ) : (
            <div className="flex items-center gap-2 md:gap-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold no-underline shrink-0 text-white bg-primary border border-primary hover:bg-indigo-700 shadow-sm shadow-indigo-100"
              >
                <CalendarDays size={16} className="shrink-0" aria-hidden />
                <span className="hidden sm:inline">Book now</span>
                <span className="sm:hidden">Book</span>
              </Link>
              <Link
                to="/m3"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold no-underline transition-colors shrink-0 ${
                  helpActive
                    ? 'text-primary bg-primary/10 border border-primary/20'
                    : 'text-slate-600 hover:text-primary border border-slate-200/80 hover:border-primary/30 hover:bg-slate-50'
                }`}
              >
                <HelpCircle size={16} className="shrink-0" aria-hidden />
                <span className="sm:hidden">Help</span>
                <span className="hidden sm:inline">Help desk</span>
              </Link>
              <div className="flex items-center gap-1">
                <NotificationMenu />
                <button type="button" className="hidden sm:block p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-all group">
                  <Settings size={20} className="group-hover:text-primary transition-colors" />
                </button>
              </div>

              <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>

              <div className="flex items-center gap-3 pl-2">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[11px] font-bold text-slate-800 leading-none mb-1">Authenticated</span>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/5 px-2 py-0.5 rounded-md">{role}</span>
                </div>
                
                <div className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-lg shadow-indigo-100 uppercase">
                  {role ? role[0] : 'U'}
                </div>

                <button 
                  onClick={handleLogout} 
                  className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl text-[11px] font-bold hover:bg-rose-600 hover:text-white transition-all ml-2"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
