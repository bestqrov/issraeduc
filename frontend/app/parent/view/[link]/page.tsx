'use client';

import { useState, useEffect } from 'react';
import {
    User,
    Phone,
    Mail,
    MapPin,
    GraduationCap,
    FileText,
    Calendar,
    CheckCircle2,
    AlertCircle,
    Info,
    LayoutDashboard
} from 'lucide-react';
import api from '@/lib/api';
import { useParams } from 'next/navigation';

export default function PublicParentView() {
    const params = useParams();
    const [parent, setParent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchParentData = async () => {
            try {
                const response = await api.get(`/parents/view/${params.link}`);
                setParent(response.data.data);
            } catch (err) {
                console.error('Failed to fetch parent data:', err);
                setError('Lien invalide ou expiré');
            } finally {
                setIsLoading(false);
            }
        };

        if (params.link) {
            fetchParentData();
        }
    }, [params.link]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !parent) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 max-w-md w-full text-center space-y-4">
                    <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
                        <AlertCircle size={40} />
                    </div>
                    <h1 className="text-2xl font-black text-slate-900">Accès Refusé</h1>
                    <p className="text-slate-500">{error || 'Ce lien n’est plus valide.'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            {/* Top Branding */}
            <div className="bg-white border-b border-slate-100 p-6 sticky top-0 z-10 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/30">
                            A
                        </div>
                        <span className="font-black text-xl text-slate-900 tracking-tight">ArwaEduc</span>
                    </div>
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                        Espace Parent
                    </span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Parent Welcome Header */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <User size={160} />
                    </div>
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-2xl relative z-10">
                        {parent.name.charAt(0)}
                    </div>
                    <div className="text-center md:text-left relative z-10 flex-1 space-y-2">
                        <h1 className="text-3xl font-black text-slate-900">Bonjour, {parent.name}</h1>
                        <p className="text-slate-500 font-medium">Suivez en temps réel la progression de vos enfants à l'école.</p>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-4">
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-100">
                                <Phone size={14} className="text-blue-500" /> {parent.phone}
                            </span>
                            {parent.email && (
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-100">
                                    <Mail size={14} className="text-blue-500" /> {parent.email}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Children List */}
                <div className="space-y-6">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                        <GraduationCap className="text-blue-600" size={24} />
                        Mes Enfants ({parent.students?.length || 0})
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {parent.students?.map((student: any) => (
                            <div key={student.id} className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 hover:shadow-xl hover:border-blue-500/20 transition-all group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-50 text-blue-600 flex items-center justify-center text-2xl font-black group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                        {student.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900">{student.name} {student.surname}</h3>
                                        <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-black rounded uppercase tracking-wider mb-1">
                                            {student.schoolLevel}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                            <Calendar size={14} /> Absences
                                        </div>
                                        <span className={`text-sm font-black ${student.attendances?.length > 3 ? 'text-red-500' : 'text-slate-900'}`}>
                                            {student.attendances?.length || 0} jours
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                            <FileText size={14} /> Inscriptions
                                        </div>
                                        <span className="text-sm font-black text-slate-900">
                                            {student.inscriptions?.length || 0} actives
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                                        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                            <CheckCircle2 size={14} /> Paiements
                                        </div>
                                        <span className="text-sm font-black text-emerald-600">
                                            À jour
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full mt-6 py-3 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-900/10">
                                    <LayoutDashboard size={18} />
                                    Voir Tableau de Bord
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Footer */}
                <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-500/30">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-black italic mb-2">Besoin d'aide ?</h3>
                            <p className="text-blue-100 text-sm opacity-90">Pour toute question concernant la scolarité de vos enfants, contactez l'administration directement via WhatsApp.</p>
                        </div>
                        <button className="px-8 py-4 bg-white text-blue-600 font-black rounded-2xl shadow-xl hover:scale-105 transition-all active:scale-95">
                            Contacter l'École
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
