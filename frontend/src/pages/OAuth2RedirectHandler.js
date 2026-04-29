import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoIcon from '../assets/uniflow-icon.svg';

const STEPS = [
    'Verifying Google identity…',
    'Loading your profile…',
    'Setting up your session…',
    'Redirecting you in…',
];

const OAuth2RedirectHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [stepIndex, setStepIndex] = useState(0);
    const [error, setError]         = useState('');

    // Cycle through loading steps for a polished feel
    useEffect(() => {
        const interval = setInterval(() => {
            setStepIndex(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const role  = params.get('role');
        const name  = params.get('name');
        const email = params.get('email');

        if (!token) {
            setError('Authentication failed — no token was returned by the server. Please try signing in again.');
            return;
        }

        // Small intentional delay so the loading animation is visible
        const timer = setTimeout(() => {
            localStorage.setItem('token', token);
            localStorage.setItem('role',  role  || '');
            localStorage.setItem('name',  name  || '');
            localStorage.setItem('email', email || '');

            if (role === 'ADMIN') {
                navigate('/admin', { replace: true });
            } else {
                navigate('/user-dashboard', { replace: true });
            }
        }, 1800);

        return () => clearTimeout(timer);
    }, [location, navigate]);

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="bg-white rounded-[2rem] shadow-xl p-10 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-black text-slate-900 mb-3">Sign-in Failed</h2>
                    <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">{error}</p>
                    <button
                        onClick={() => navigate('/login', { replace: true })}
                        className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors text-sm"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/40 to-sky-50/60 flex items-center justify-center p-6">

            {/* Decorative blobs */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-100/60 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-sky-100/60 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative bg-white/80 backdrop-blur-sm rounded-[2.5rem] shadow-[0_24px_64px_rgba(15,23,42,0.10)] border border-white p-12 max-w-sm w-full flex flex-col items-center text-center">

                {/* Logo */}
                <img src={logoIcon} alt="UniFlow" className="w-14 h-auto mb-8" />

                {/* Google icon + spinning ring */}
                <div className="relative w-20 h-20 mb-8">
                    {/* Outer spinning ring */}
                    <svg className="absolute inset-0 w-full h-full animate-spin" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="34" fill="none" stroke="#e0e7ff" strokeWidth="6" />
                        <circle
                            cx="40" cy="40" r="34"
                            fill="none" stroke="url(#grad)" strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray="80 134"
                        />
                        <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#6366f1" />
                                <stop offset="100%" stopColor="#38bdf8" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Google logo in centre */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-11 h-11 bg-white rounded-full shadow-md flex items-center justify-center">
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Signing you in</h2>
                <p className="text-sm text-slate-500 font-medium mb-8">Completing your Google authentication</p>

                {/* Step progress */}
                <div className="w-full space-y-2.5">
                    {STEPS.map((step, i) => (
                        <div
                            key={step}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-500 ${
                                i <= stepIndex
                                    ? 'bg-indigo-50 text-indigo-700'
                                    : 'bg-slate-50 text-slate-400'
                            }`}
                        >
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                i < stepIndex  ? 'bg-indigo-500'  :
                                i === stepIndex ? 'bg-indigo-200 ring-2 ring-indigo-400 ring-offset-1' :
                                'bg-slate-200'
                            }`}>
                                {i < stepIndex ? (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span className={`w-2 h-2 rounded-full ${i === stepIndex ? 'bg-indigo-500 animate-pulse' : 'bg-slate-400'}`}></span>
                                )}
                            </div>
                            <span className="text-xs font-bold">{step}</span>
                        </div>
                    ))}
                </div>

                <p className="mt-8 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                    Secured by UniFlow · Google OAuth 2.0
                </p>
            </div>
        </div>
    );
};

export default OAuth2RedirectHandler;
