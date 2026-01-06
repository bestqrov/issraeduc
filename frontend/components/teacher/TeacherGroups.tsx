'use client';

import { TeacherData } from '@/lib/mockData';
import { Users, Info, ChevronRight, UserCircle } from 'lucide-react';

interface TeacherGroupsProps {
    teacher: TeacherData;
    onViewChange: (view: string) => void;
}

export default function TeacherGroups({ teacher, onViewChange }: TeacherGroupsProps) {
    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom du Groupe</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Niveau Scolaire</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Effectif</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Prochain Cours</th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {teacher.groups.map((group) => (
                            <tr key={group.id} className="hover:bg-blue-50/30 transition-colors group cursor-pointer">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs">
                                            {group.name.split(' ')[0][0]}{group.name.split(' ').pop()?.[0]}
                                        </div>
                                        <span className="font-bold text-slate-700">{group.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-sm font-medium text-slate-500">{group.level}</td>
                                <td className="px-6 py-5 text-center">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs border border-blue-100">
                                        <Users className="w-3 h-3" />
                                        {group.studentCount}
                                    </span>
                                </td>
                                <td className="px-6 py-5">
                                    <span className="text-sm font-bold text-slate-600">{group.nextClass}</span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <button className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-slate-400 hover:text-orange-500">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Tip card */}
            <div className="bg-blue-600 rounded-2xl p-6 text-white flex items-center gap-6 shadow-xl shadow-blue-600/20">
                <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                    <Info className="w-8 h-8" />
                </div>
                <div>
                    <h4 className="text-lg font-bold">Gestion des Absences</h4>
                    <p className="text-blue-100 text-sm mt-1 max-w-xl">
                        Cliquez sur un groupe pour accéder à la liste d'appel. Les absences saisies ici seront immédiatement visibles par l'administration et les parents.
                    </p>
                </div>
                <button
                    onClick={() => onViewChange('absences')}
                    className="ml-auto bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform whitespace-nowrap"
                >
                    Accéder à l'appel
                </button>
            </div>
        </div>
    );
}
