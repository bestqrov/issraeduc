'use client';

import { useState, useEffect } from 'react';
import {
    User,
    Phone,
    Mail,
    Calendar,
    Users,
    BookOpen,
    Clock,
    MapPin,
    Search,
    ChevronRight,
    CheckCircle2,
    AlertCircle,
    Info,
    LayoutDashboard,
    Bell,
    Settings,
    ArrowRight,
    MessageCircle
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { teachersService } from '@/lib/services/teachers';
import type { Teacher } from '@/types';

export default function TeacherPortalPage() {
    const params = useParams();
    const [teacher, setTeacher] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'overview' | 'groups' | 'schedule'>('overview');

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const data = await teachersService.getByLink(params.link as string);
                setTeacher(data);
            } catch (err) {
                console.error('Failed to fetch teacher data:', err);
                setError('Lien invalide ou accès refusé');
            } finally {
                setIsLoading(false);
            }
        };

        if (params.link) {
            fetchTeacherData();
        }
    }, [params.link]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !teacher) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 max-w-md w-full text-center space-y-4">
                    <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
                        <User size={40} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">Accès Non Autorisé</h1>
                    <p className="text-slate-500 dark:text-slate-400">{error || 'Ce lien d’accès n’est pas valide.'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Nav Header */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 p-4 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/30">
                            A
                        </div>
                        <span className="font-black text-xl text-slate-900 dark:text-white tracking-tight hidden sm:block">ArwaEduc</span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 font-bold text-sm text-slate-500 dark:text-slate-400">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        >
                            Aperçu
                        </button>
                        <button
                            onClick={() => setActiveTab('groups')}
                            className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'groups' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        >
                            Groupes
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-xl hover:text-indigo-600 transition-colors">
                            <Bell size={20} />
                        </button>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {teacher.name.charAt(0)}
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header Profile */}
                <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] dark:opacity-[0.05]">
                        <BookOpen size={240} />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="w-32 h-32 rounded-3xl bg-indigo-600 p-1 shadow-2xl shadow-indigo-500/20">
                            <div className="w-full h-full rounded-[22px] bg-white dark:bg-slate-900 flex items-center justify-center text-5xl font-black text-indigo-600">
                                {teacher.name.charAt(0)}
                            </div>
                        </div>

                        <div className="text-center md:text-left space-y-3 flex-1">
                            <div className="flex flex-col md:flex-row items-center gap-4">
                                <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                                    Prof. {teacher.name}
                                </h1>
                                <span className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-800">
                                    Enseignant
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-500 dark:text-slate-400 text-sm font-medium">
                                <div className="flex items-center gap-2">
                                    <Phone size={16} className="text-indigo-500" />
                                    <span>{teacher.phone || 'N/A'}</span>
                                </div>
                                <div className="hidden md:block w-1 h-1 bg-slate-300 rounded-full"></div>
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-indigo-500" />
                                    <span>{teacher.email || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                                {teacher.specialties?.map((spec: string) => (
                                    <span key={spec} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold">
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all">
                                <MessageCircle size={18} />
                                Chat École
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Tabs */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Stats Card */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl">
                                <h3 className="font-black text-xl mb-8 flex items-center gap-3">
                                    <LayoutDashboard size={24} className="text-indigo-200" />
                                    Aperçu Activité
                                </h3>
                                <div className="space-y-6">
                                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                                        <p className="text-xs text-indigo-100/70 font-black uppercase tracking-widest mb-1">Groupes Assignés</p>
                                        <p className="text-4xl font-black">{teacher.groups?.length || 0}</p>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                                        <p className="text-xs text-indigo-100/70 font-black uppercase tracking-widest mb-1">Total Élèves</p>
                                        <p className="text-4xl font-black">
                                            {teacher.groups?.reduce((acc: number, g: any) => acc + (g.students?.length || 0), 0) || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-800">
                                <h3 className="font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                    <Clock size={20} className="text-indigo-500" />
                                    Prochain Cours
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <p className="text-xs font-black text-indigo-600 mb-1">AUJOURD'HUI</p>
                                        <p className="font-bold text-slate-900 dark:text-white">Mathématiques Lycée</p>
                                        <p className="text-sm text-slate-500">14:30 - 16:30 | Salle 4</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Groups List Mini */}
                        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-800 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-black text-xl text-slate-900 dark:text-white flex items-center gap-3">
                                    <Users size={24} className="text-indigo-600" />
                                    Mes Groupes
                                </h3>
                                <button onClick={() => setActiveTab('groups')} className="text-sm font-bold text-indigo-600 flex items-center gap-1 hover:underline">
                                    Tout voir <ChevronRight size={16} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {teacher.groups?.map((group: any) => (
                                    <div key={group.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center font-bold">
                                                {group.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 dark:text-white">{group.name}</p>
                                                <p className="text-xs text-slate-500 font-medium">{group.level} | {group.students?.length || 0} Élèves</p>
                                            </div>
                                        </div>
                                        <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-indigo-600 group-hover:bg-white dark:group-hover:bg-slate-700 transition-all shadow-sm">
                                            <ArrowRight size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'groups' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {teacher.groups?.map((group: any) => (
                                <div key={group.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-100 dark:border-slate-800 space-y-6 hover:shadow-2xl transition-all border-b-4 border-b-indigo-600">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-black text-slate-900 dark:text-white">{group.name}</h3>
                                            <span className="inline-block px-2.5 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-black rounded-lg uppercase tracking-widest border border-indigo-100 dark:border-indigo-800">
                                                {group.level}
                                            </span>
                                        </div>
                                        <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-600">
                                            <Users size={24} />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Élèves Inscrits</p>
                                        <div className="flex -space-x-3 overflow-hidden ml-1">
                                            {group.students?.slice(0, 5).map((s: any) => (
                                                <div key={s.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                                                    {s.name.charAt(0)}
                                                </div>
                                            ))}
                                            {group.students?.length > 5 && (
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 ring-2 ring-white dark:ring-slate-900 text-[10px] font-bold text-slate-500">
                                                    +{group.students.length - 5}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <button className="py-2.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 transition-all">
                                            Présences
                                        </button>
                                        <button className="py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-black shadow-lg transition-all">
                                            Group Chat
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* School Contact Footer */}
                <div className="p-8 rounded-[40px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
                    <div className="flex items-center gap-6 relative z-10 text-center md:text-left flex-col md:flex-row">
                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-2xl flex items-center justify-center">
                            <Info size={32} />
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-slate-900 dark:text-white">Administration Scolaire</h4>
                            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm">Si vous souhaitez modifier votre planning ou signaler une absence, veuillez contacter le secrétariat.</p>
                        </div>
                    </div>
                    <button className="px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-black font-black rounded-[20px] shadow-xl hover:scale-105 transition-all active:scale-95 relative z-10 w-full md:w-auto">
                        Appeler Secrétariat
                    </button>
                </div>
            </main>
        </div>
    );
}
