'use client';

import { useState, useEffect } from 'react';
import {
    User,
    Phone,
    Mail,
    MapPin,
    CreditCard,
    Calendar,
    ArrowLeft,
    Users,
    GraduationCap,
    ExternalLink,
    Plus,
    MessageCircle
} from 'lucide-react';
import { getParentById, Parent } from '@/lib/services/parents';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { usePathname } from 'next/navigation';

export default function ParentProfilePage({ params }: { params: { id: string } }) {
    const [parent, setParent] = useState<Parent | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const fetchParent = async () => {
            try {
                const data = await getParentById(params.id);
                setParent(data);
            } catch (error) {
                console.error('Failed to fetch parent:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchParent();
    }, [params.id]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!parent) {
        return (
            <div className="flex flex-col h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 text-slate-500">
                <p className="text-xl font-bold">Parent non trouvé</p>
                <button onClick={() => router.push('/parent')} className="mt-4 text-blue-600 hover:underline flex items-center gap-2">
                    <ArrowLeft size={20} /> Retour à la liste
                </button>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Sidebar currentPath={pathname} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-y-auto pt-16">
                    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Navigation */}
                        <button
                            onClick={() => router.push('/parent')}
                            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            Retour au répertoire
                        </button>

                        {/* Profile Header Card */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <User size={200} />
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-1 shadow-2xl shadow-blue-500/20">
                                    <div className="w-full h-full rounded-[20px] bg-white dark:bg-slate-900 flex items-center justify-center text-5xl font-black text-blue-600">
                                        {parent.name.charAt(0).toUpperCase()}
                                    </div>
                                </div>

                                <div className="text-center md:text-left space-y-2">
                                    <div className="flex flex-col md:flex-row items-center gap-4">
                                        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
                                            {parent.name}
                                        </h1>
                                        <span className="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800">
                                            Profil Parent
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <Phone size={16} className="text-blue-500" />
                                            <span className="font-semibold">{parent.phone}</span>
                                        </div>
                                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full hidden md:block"></div>
                                        <div className="flex items-center gap-2">
                                            <Mail size={16} className="text-blue-500" />
                                            <span>{parent.email || 'Aucun email'}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
                                        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
                                            <MessageCircle size={18} />
                                            WhatsApp
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-white rounded-xl text-sm font-bold transition-all">
                                            Modifier le profil
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Detailed Info */}
                            <div className="lg:col-span-1 space-y-6">
                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                                    <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                                        <CreditCard size={20} className="text-blue-600" />
                                        Informations Détallées
                                    </h2>
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-400">
                                                <MapPin size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Adresse</p>
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{parent.address || 'Non spécifiée'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-400">
                                                <CreditCard size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">CIN</p>
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{parent.cin || 'Non spécifié'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-400">
                                                <Calendar size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Inscrit le</p>
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{new Date(parent.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="font-bold">Aperçu Famille</h3>
                                        <Users size={20} className="text-indigo-200" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                                            <p className="text-xs text-indigo-100/70 mb-1">Enfants</p>
                                            <p className="text-2xl font-black">{parent.students?.length || 0}</p>
                                        </div>
                                        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
                                            <p className="text-xs text-indigo-100/70 mb-1">Factures</p>
                                            <p className="text-2xl font-black">0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Linked Children */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                            <GraduationCap size={20} className="text-blue-600" />
                                            Enfants à Charge
                                        </h2>
                                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 text-slate-500 rounded-lg text-xs font-bold">
                                            {parent.students?.length || 0} Élèves
                                        </span>
                                    </div>

                                    {parent.students && parent.students.length > 0 ? (
                                        <div className="space-y-4">
                                            {parent.students.map((student) => (
                                                <div
                                                    key={student.id}
                                                    className="group flex flex-col md:flex-row items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 hover:border-blue-500/20 transition-all cursor-pointer"
                                                    onClick={() => router.push(`/admin/students`)}
                                                >
                                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                                        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg">
                                                            {student.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-800 dark:text-white text-base">
                                                                {student.name} {student.surname}
                                                            </p>
                                                            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                                                                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 rounded font-medium">{student.schoolLevel}</span>
                                                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                                <span>Inscrit le {new Date(student.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-4 md:mt-0 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-100 dark:border-slate-700">
                                                        <div className="flex flex-col items-end">
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                                            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                                                Actif
                                                            </span>
                                                        </div>
                                                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                            <ExternalLink size={18} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-12 text-center text-slate-400 bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                                            <p>Aucun enfant lié à ce parent</p>
                                            <button
                                                onClick={() => router.push('/admin/students')}
                                                className="mt-4 text-blue-600 hover:underline text-sm font-bold flex items-center justify-center gap-2 mx-auto"
                                            >
                                                <Plus size={16} /> Ajouter un élève
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 rounded-3xl bg-blue-600 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-500/20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-black text-white mb-2 italic">Avertissement de paiement</h3>
                                        <p className="text-blue-100 text-sm max-w-md">Envoyer un rappel de paiement automatique par SMS ou WhatsApp à ce parent.</p>
                                    </div>
                                    <button className="relative z-10 px-6 py-3 bg-white text-blue-600 font-black rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-sm active:scale-95">
                                        S&apos;envoyer un rappel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
