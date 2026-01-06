'use client';

import { TeacherData } from '@/lib/mockData';
import { Users, CheckCircle2, XCircle, Clock, Search } from 'lucide-react';

interface TeacherAbsencesProps {
    teacher: TeacherData;
}

export default function TeacherAbsences({ teacher }: TeacherAbsencesProps) {
    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {/* Header info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Gestion des Présences</h3>
                    <p className="text-slate-500 text-sm mt-1">Sélectionnez un groupe pour faire l'appel aujourd'hui.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Rechercher un groupe..."
                        className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all w-64"
                    />
                </div>
            </div>

            {/* Groups Grid for Absence Linking */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teacher.groups.map((group) => (
                    <div key={group.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-orange-500/50 transition-all group cursor-pointer overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Users className="w-16 h-16" />
                        </div>

                        <h4 className="font-bold text-slate-800 text-lg mb-1">{group.name}</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{group.level}</p>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                        E{i}
                                    </div>
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                                    +{group.studentCount - 4}
                                </div>
                            </div>
                            <span className="text-xs font-medium text-slate-500">étudiants</span>
                        </div>

                        <button className="w-full py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-orange-500 hover:text-white transition-all shadow-sm">
                            Faire l'appel
                        </button>
                    </div>
                ))}
            </div>

            {/* Logic Info Placeholder as per "no logic" rule */}
            <div className="p-8 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                    <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                    <h4 className="font-bold text-blue-900">Module en attente</h4>
                    <p className="text-blue-700 text-sm mt-1 max-w-2xl">
                        Le système de saisie des absences est en cours de configuration. Pour l'instant, vous pouvez visualiser vos groupes. La synchronisation avec le registre central sera activée lors de la prochaine mise à jour.
                    </p>
                </div>
            </div>
        </div>
    );
}
