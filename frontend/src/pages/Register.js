import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../utils/api';
import { getGoogleAuthorizationUrl } from '../utils/oauth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logoIcon from '../assets/uniflow-icon.svg';

const OAUTH_ERRORS = {
    oauth2: 'Google sign-up failed. Please try again or register with email.',
    access_denied: 'You cancelled the Google sign-in.',
    invalid_client: 'Google OAuth is not configured on this server. Contact the administrator.',
};

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const errorParam = params.get('error');
        if (errorParam) {
            setError(OAUTH_ERRORS[errorParam] || 'Authentication failed. Please try again.');
            window.history.replaceState({}, '', '/register');
        }
    }, [location.search]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (user.password !== user.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const { confirmPassword, ...registrationData } = user;
            registrationData.role = 'USER';
            await api.post('/auth/register', registrationData);
            alert('Registration Successful! Please login.');
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-bg-soft">
            <Navbar />
            <main className="flex-1 flex items-center justify-center py-12 px-5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-60 z-0 bg-sky-50"></div>

                <div className="card animate-up glass w-full max-w-[440px] p-8 z-[1] shadow-2xl">
                    <div className="text-center mb-8">
                        <img src={logoIcon} alt="UniFlow Logo" className="w-[64px] h-auto mx-auto mb-6" />
                        <h2 className="text-2xl font-extrabold mb-1 tracking-tight text-slate-900">Join UniFlow</h2>
                        <p className="text-text-muted text-sm">Global learning community</p>
                    </div>

                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label className="block text-[10px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="input-field !py-2.5 !px-3.5 !text-sm"
                                placeholder="Your Name"
                                value={user.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-[10px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="input-field !py-2.5 !px-3.5 !text-sm"
                                placeholder="name@university.edu"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="input-field !py-2.5 !px-3.5 !text-sm"
                                    placeholder="********"
                                    value={user.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Confirm</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="input-field !py-2.5 !px-3.5 !text-sm"
                                    placeholder="********"
                                    value={user.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-xs text-error font-medium mb-4 p-3 bg-error/5 border border-error/10 rounded-lg">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-full !py-3 !text-sm mt-1"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : 'Register'}
                        </button>
                    </form>

                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-slate-200"></div>
                        <span className="px-3 text-[10px] text-slate-400 font-bold uppercase">OR JOIN WITH</span>
                        <div className="flex-1 h-px bg-slate-200"></div>
                    </div>

                    <a
                        href={getGoogleAuthorizationUrl()}
                        className="btn btn-outline w-full !py-2.5 !text-sm bg-white hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Continue with Google
                    </a>

                    <div className="text-center mt-8 text-slate-500 text-sm">
                        Member already? <Link to="/login" className="text-primary font-bold no-underline ml-1">Log in</Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Register;
