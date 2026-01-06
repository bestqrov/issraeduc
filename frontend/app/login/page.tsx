'use client';
import React, { useState, useEffect } from 'react';
import useAuthStore from '../../store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useSchoolProfile } from '@/hooks/useSchoolProfile';
import { GraduationCap, Lock, Mail, ArrowRight, Loader2, Phone, MessageCircle, AlertCircle } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const login = useAuthStore(state => state.login);

    useEffect(() => {
        const token = (typeof window !== 'undefined') ? localStorage.getItem('accessToken') : null;
        if (token) {
            // Optional: Auto redirect if already logged in
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const res = await login(email.trim(), password);
            if (!res.success) {
                setError(res.message || 'Identifiants incorrects');
            } else {
                const user = useAuthStore.getState().user;
                if (user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') router.push('/admin');
                else if (user?.role === 'SECRETARY') router.push('/secretary');
                else router.push('/');
            }
        } catch (err) {
            setError('Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Subtle Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-50/80 rounded-full blur-[120px] opacity-60" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-50/80 rounded-full blur-[120px] opacity-60" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
            </div>

            {/* Main Compact Card */}
            <div className="w-full max-w-[380px] relative z-10 flex flex-col animate-in fade-in slide-in-from-bottom-8 duration-700">

                {/* Logo Section */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 mb-5 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                        <GraduationCap className="text-white w-7 h-7" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">ArwaEduc</h1>
                    <p className="text-sm text-slate-500 mt-1 font-medium">Plateforme de gestion scolaire</p>
                </div>

                {/* Card Container */}
                <div className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-100 p-8 relative overflow-hidden group hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-500">
                    {/* Top Gradient Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 opacity-80" />

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Error Alert */}
                        {error && (
                            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle size={16} className="shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wide">Email</label>
                            <div className="relative group">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300"
                                    placeholder="admin@ecole.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wide">Mot de passe</label>
                            <div className="relative group">
                                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 hover:shadow-xl hover:shadow-slate-900/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin text-white/70" />
                                ) : (
                                    <>
                                        Se connecter
                                        <ArrowRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer / Contact */}
                <div className="mt-10 flex flex-col items-center gap-4">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Support Technique</p>
                    <div className="flex items-center gap-3">
                        <a href="mailto:contact@arwaeduc.com" className="group p-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all shadow-sm">
                            <Mail size={18} className="group-hover:scale-110 transition-transform" />
                        </a>
                        <a href="https://wa.me/212608183886" className="group p-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-green-600 hover:border-green-200 hover:bg-green-50 transition-all shadow-sm">
                            <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                        </a>
                        <a href="tel:+212608183886" className="group p-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all shadow-sm">
                            <Phone size={18} className="group-hover:scale-110 transition-transform" />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <p className="text-center mt-8 text-[10px] text-slate-300 font-medium">
                    © 2026 ArwaEduc V2.0 System
                </p>
            </div>
        </div>
    );
}
